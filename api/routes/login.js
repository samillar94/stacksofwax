const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.post('/', (req, res)=> { 

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

        if (err) {
            res.json({badstuff: err});
            return; 
        }; 
        
        let goodstuff = data[3][0];
        console.log(goodstuff);
       
        if (goodstuff) {
            goodstuff.apimessage = `${username} logged in.`;
            goodstuff.username = username;
            res.json({goodstuff: goodstuff}); 
        } else {
            let badstuff = {
                apimessage: "Login details invalid."
            };
            res.json({badstuff: badstuff});
        };

    });

});

module.exports = router;