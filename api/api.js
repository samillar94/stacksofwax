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
    /// TODO ensure same password 

    let signupQ = `#Create a random code, six chars in length
            SET @salt = SUBSTRING(SHA1(RAND()), 1, 6);
            
            #Concat our salt and our plain password, then hash them.
            SET @saltedHash = SHA1(CONCAT(@salt, ?));
            
            #Get the value we should store in the database (concat of the plain text salt and the hash)
            SET @storedSaltedHash = CONCAT(@salt,@saltedHash);
            
            #Store this user in the database
            INSERT INTO user (user_id, username, password) 
            VALUES (NULL, ?, @storedSaltedHash);`

    connection.query(signupQ, [passwordraw, username], (err, data)=>{
        if(err) {
            res.json({err}); 
            throw err;
        }

        if(data){
            console.log(data);
            let respObj = {
                id: data[3].insertId,
                /// TODO find out why 4 OKpackets
                title: username,
                message: `${username} added to database`,
            };
            res.json({respObj}); 
        }
    });

});

app.post("/login", (req, res)=>{

    console.log("logging in?")

    let username = req.body.username;
    let passwordraw = req.body.passwordraw;

    let loginQ = `#Get the salt which is stored in clear text
    SELECT @saltInUse := SUBSTRING(password, 1, 6) FROM user WHERE username = ?;
    
    #Get the hash of the salted password entered by the user at SIGN UP
    SELECT @storedSaltedHashInUse := SUBSTRING(password, 7, 40) FROM user WHERE username = ?;
    
    #Concat our salt in use and our login password attempt, then hash them.
    SET @saltedHash = SHA1(CONCAT(@saltInUse, ?));
    
    #Return the user id
    SELECT user_id FROM user WHERE username = ? AND password = CONCAT(@saltInUse, @saltedHash);`;
  
    connection.query(loginQ, [username, username, passwordraw, username], (err, data)=>{
        if(err) {
            res.json({err}); 
            throw err;
        }
        /// TODO tidy this up
        if(data){
            try {
                console.log(data[3][0].user_id);
                let respObj = {
                    id: data[3][0].user_id,
                    title: username,
                    message: `${username} logged in`,
                };
                console.log(respObj);
                res.json({respObj}); 
            } catch {
                res.json({err});
            }
        }
    });

});

const server = app.listen(API_PORT, () => {
    console.log(`API started on port ${server.address().port}.`);
});