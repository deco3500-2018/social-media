const express = require('express')
const bodyParser = require('body-parser');
const config = require('./config');
const mysql = require('mysql');

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
    else console.log("Connected to database");
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
    dbConnection.query(query, (err, rows, fields) => {
        console.log("query returned");
        if (err) {
            console.log(err);
        }
    });

    // add followers to database
});

//app.listen(port, () => console.log(`Blaze started on port ${port}...`))

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