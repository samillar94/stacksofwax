const mysql = require('mysql');

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit:10,
    port:process.env.DB_PORT,
    multipleStatements: true
});

module.exports = connection;