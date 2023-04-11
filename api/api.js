require('dotenv').config();
const express = require("express");
const mysql = require('mysql');

const app = express();
const API_PORT = process.env.API_PORT || 4000;

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


app.get("/vinyls", (req, res)=>{

    let allvinylsQ = `SELECT * FROM vinyl;`

    connection.query(allvinylsQ, (err, data)=>{
        if (err) throw err;
        res.json({data});
    });

});

app.post("/signup", (req, res)=>{

    let username = req.body.username;
    let passwordraw = req.body.passwordraw;

    // TODO SHA1 here

    let signupQ = `SELECT 1;`

    connection.query(signupQ, [username, passwordraw], (err, data)=>{
        if(err) {
            res.json({err}); 
            throw err;
        }

        if(data){
            let respObj = {
                id: data.insertId,
                title: username,
                message: `${username} added to database`,
            };
            res.json({respObj}); 
        }
    });

});

const server = app.listen(API_PORT, () => {
    console.log(`API started on port ${server.address().port}.`);
});