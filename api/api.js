require('dotenv').config();
const express = require("express");
const app = express();
const mysql = require('mysql');

const PORT = process.env.PORT || 4000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));

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

connection.getConnection((err)=>{
    if(err) return console.log(err.message);
    console.log("The API has connected to the stacksofwax database.");
});

//app.get...