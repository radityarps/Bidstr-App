const Pool = require('pg').Pool ;

const pool = new Pool({
    host : 'localhost',
    user : 'postgres',
    password : 'sambirotos700',
    database : 'bidstr',
    port : 5432
});


module.exports = pool ;