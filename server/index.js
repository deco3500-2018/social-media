const express = require('express')
const bodyParser = require('body-parser');
const config = require('./config');
const mysql = require('mysql');
const spawn = require("child_process").spawn;

let igUsername;
let igPassword;

let db = mysql.createConnection({
  host     : config.db.host,
  user     : config.db.username,
  password : config.db.password,
  database : config.db.database,
  port: config.db.port,
  socketPath: config.db.socket
});

db.connect((err) => {
    if (err) console.log(err);
    else console.log("Connected to database...");
});

const app = express();
const port = 80

app.use(express.static('static'))
app.use( bodyParser.json() );

app.post('/submit-data', (req, res) => {
    console.log(req.body);
    
    // validate username
    if (!checkUsername(req.body.username)) {
        console.log('Username error');
        res.send("Username error.");
        return;
    }

    // validate question results
    let instagramScore = getScore(JSON.parse(req.body.results));
    if (isNaN(instagramScore) || instagramScore <  1 || instagramScore > 5) {
        console.log('Result error');
        console.log(instagramScore);
        res.send("Result error.");
        return;
    }
    
    res.send('Success.');
    
    // send to database
    let query = `INSERT INTO users (username, score) VALUES ('${req.body.username}', ${instagramScore})`;
    console.log(query);
    db.query(query, (err, rows, fields) => {
        console.log("query returned");
        if (err) {
            console.log(err);
        }
    });

    // add followers to database
});

app.get('/recommendations-data', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    console.log(req.query.username);

    // query the database
    let query = `
        SELECT UF.follows as 'username', AVG(U.score) as 'score'
        FROM \`user-following\` UF, \`user-following\` UF2, users U
        WHERE UF.username = '${ req.query.username }'
        AND UF2.follows = UF.follows
        AND U.username = UF2.username
        GROUP BY UF.follows
    `;
    
    let users = new Array();
    db.query(query, (err, rows, fields) => {
        // record
        users = rows.map( row => 
            ({
                username: row['username'],
                percentage: 100 - row['score'] / 5 * 100
            })
        );

            // check for ig credentials
        if (!igUsername || !igPassword) {
            console.log("Can't find Instagram credentials");
            return;
        }
        console.log(`Instagram | U: ${igUsername} P: ${igPassword}`);

        users.pop;
    
        // query python ig scraper
        Promise.all( users.map( user => {
            return new Promise((res, err) => {
                let output = "";
                let pythonProcess = spawn('python', [`python/get_user_cached.py`, "-u", `"${igUsername}"`, "-p", `"${igPassword}"`, "-settings", `${__dirname}/python/credentials.json`, "-uu", `${user.username}`]);
                pythonProcess.stdout.on('data', (data) => {
                    output += data.toString();
                });
                pythonProcess.on('close', () => {
                    let userJSON = JSON.parse(output);
                    console.log(userJSON);
                    res({
                        ...user,
                        name: userJSON.full_name,
                        profilePic: userJSON.profile_pic_url,
                        photos: userJSON.feed.items.slice(0, 6).map(item => {
                            if (item.image_versions2) {
                                return item.image_versions2.candidates[1].url
                            } else if (item.carousel_media) {
                                return item.carousel_media[0].image_versions2.candidates[1].url
                            }
                        }),
                        postsPerWeek: postsPerWeek(userJSON),
                        averageLikes: averageLikes(userJSON)
                    });
                });
            });
        })).then(users => {
            res.send(JSON.stringify({
                "users": users
            }));   
        });
        
        
    });
});

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('python/login.config')
});

function postsPerWeek(userJSON) {
    let now = Date.now() / 1000;
    let aWeek = 1000 * 60 * 60 * 24 * 7;
    let count = 0;
    
    for (item of userJSON.feed.items) {
        if (now - item.taken_at * 1000 < aWeek) {
            count++;
        }
    }

    return count;
}

function averageLikes(user) {
    return user.feed.items.map(i => i.like_count).reduce((acc, curr) => acc + curr) / user.feed.items.length;
}

lineReader.on('line', function (line) {
    if (!igUsername) {
        igUsername = line;
        return;
    }

    if (!igPassword) {
        igPassword = line;
        return;
    }
  });

app.listen(port, () => console.log(`Blaze started on port ${port}...`))

function checkUsername(username) {
    return true;
}

function getScore(array) {
    array[2] = 6 - array[2];
    array[3] = 6 - array[3];

    let sum = 0; 
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
    }

    return sum / array.length;
}