const top500 = require('./top500');
const words = require('./words');

console.log("a");

let query = `INSERT INTO users VALUES ${ words.join("") }`;

console.log(query);