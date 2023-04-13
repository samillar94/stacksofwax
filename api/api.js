require('dotenv').config();
const express = require("express");
const mysql = require('mysql');

const app = express();
const API_PORT = process.env.API_PORT || 4000;

app.use(express.urlencoded({extended: true}));


/// custom modules
const globalErrHandler = require("./middleware/errorHandler");

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


app.get("/vinyls", (req, res, next)=>{

    let allvinylsQ = `SELECT release_id, releasename FROM \`release\`;` /// release is a reserved word in SQL -_-

    connection.query(allvinylsQ, (err, data)=>{
        if (err) {
            console.log(err); /// this is the API's business, not the app's
        } else if (data[0].release_id) { /// checks the data is not blank
            res.json(data);
        } else {
            console.log("No release data. (Why??)");
            next();
        }
    });

});

app.get("/vinyl", (req, res, next)=>{

    let id = req.query.id;

    let vinylQ = `SELECT release_id, releasename, year, vinyls, releasenotes, label.label_id AS label_id, labelname
    FROM \`release\`
    LEFT JOIN label ON release.label_id = label.label_id
    WHERE release_id = ?;`

    connection.query(vinylQ, [id], (err, data)=>{
        if (err) {
            console.log(err); 
            res.json(err);
        } else if (data[0]) {
            console.log(data[0].releasename, "viewed.");
            res.json(data[0]);
        } else {
            apimessage = "The release requested does not exist.";
            console.log(apimessage);
            res.json(apimessage);
        }
    });

});

app.get("/collectors", (req, res, next)=>{

    let publiccollectorsQ = `SELECT user_id, username, joindate FROM user WHERE public;`

    connection.query(publiccollectorsQ, (err, data)=>{
        if (err) {
            console.log(err); 
        } else if (data[0]) { 
            res.json(data);
        } else {
            console.log("No user data. (Why??)");
            next();
        }
    });

});

app.get("/collector", (req, res)=>{

    let id = req.query.id;
    let sessionuserid = req.query.sessionuserid;

    let collectorQ = `SELECT user_id, username, joindate, bio FROM user WHERE (public OR user_id = ?) AND user_id = ?;`

    connection.query(collectorQ, [sessionuserid, id], (err, data)=>{
        if (err) {
            console.log(err); 
            res.json(err);
        } else if (data[0]) { 
            console.log(data[0].username, "viewed.")
            res.json(data[0]);
        } else {
            apimessage = "The user requested does not exist, or is not visible.";
            console.log(apimessage);
            res.json(apimessage);
        }
    });

});

app.post("/signup", (req, res, next)=>{

    let username = req.body.username;
    let passwordraw = req.body.passwordraw; 
    /// TODO ensure non blank password (client JS)
    /// TODO ensure passwords match (client JS)
    /// TODO ensure unique username goes to API (client JS)

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
        if (err) {
            console.log("User creation failed: ", err.sqlMessage);
            res.json({err}); 
        } else if (data[3].insertId) {
  
            let respObj = {
                id: data[3].insertId, /// 4 OK packets from 4 commands
                title: username,
                message: `${username} added to database`,
            };
            res.json({respObj}); 

        } else {
            console.log("Something wacky's happened with signup.");
            next();
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
        } else if (data) {
            try {
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

app.use(globalErrHandler);

const server = app.listen(API_PORT, () => {
    console.log(`API started at http://localhost:${server.address().port}/`);
});