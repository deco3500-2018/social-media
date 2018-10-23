const express = require('express')
const bodyParser = require('body-parser');
const config = require('./config');
const mysql = require('mysql');

let data = {
    "users": [
        {
            "name": "Darren Fu",
            "username": "john.mturk",
            "percentage": 86,
            "postsPerWeek": 15,
            "averageLikes": 247,
            "profilePic": "/assets/test_profile_pic.jpg",
            "photos": [
                "/assets/photo.png",
                "/assets/photo.png",
                "/assets/photo.png",
                "/assets/photo.png",
                "/assets/photo.png"
            ]
        },

        {
            "name": "Jacob Ellis",
            "username": "jellis_much",
            "percentage": 50,
            "postsPerWeek": 28,
            "averageLikes": 341,
            "profilePic": "/assets/test_profile_pic.jpg",
            "photos": [
                "/assets/photo.png",
                "/assets/photo.png",
                "/assets/photo.png",
                "/assets/photo.png",
                "/assets/photo.png"
            ]
        },

        {
            "name": "Edwin Matthews",
            "username": "matty_e6",
            "percentage": 60,
            "postsPerWeek": 4,
            "averageLikes": 111,
            "profilePic": "/assets/test_profile_pic.jpg",
            "photos": [
                "/assets/photo.png",
                "/assets/photo.png",
                "/assets/photo.png",
                "/assets/photo.png",
                "/assets/photo.png"
            ]
        },

        {
            "name": "Andrew Davies",
            "username": "ilovedeco3500",
            "percentage": 74,
            "postsPerWeek": 100,
            "averageLikes": 118,
            "profilePic": "/assets/test_profile_pic.jpg",
            "photos": [
                "/assets/photo.png",
                "/assets/photo.png",
                "/assets/photo.png",
                "/assets/photo.png",
                "/assets/photo.png"
            ]
        }
    ]
};

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
        FROM `user-following` UF, `user-following` UF2, users U
        WHERE UF.username = ${ req.query.username }
        AND UF2.follows = UF.follows
        AND U.username = UF2.username
        GROUP BY UF.follows
    `;
    
    let users = new Array();
    db.query(query, (err, rows, fields) => {
        console.log('query returned');
        users = rows.map( row => {
            {
                username: row['username']
                percentage: 100 - row['score'] / 5 * 100
            }
        });
    });
    
    res.send(JSON.stringify({
        "users": users
    }));
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