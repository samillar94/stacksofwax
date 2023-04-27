const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.post('/', (req, res)=> { 

    let username = req.body.username;
    let passwordraw = req.body.passwordraw; 

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
            res.json({badstuff: err}); 
            return;
        }; 
        
        let goodstuff; 
        if (data[3].insertId) goodstuff = data[3];
        console.log(goodstuff);

        if (goodstuff) {
            goodstuff.apimessage = `${username} added to database`,
            goodstuff.username = username;
            res.json({goodstuff: goodstuff}); 

        } else {
            let badstuff = {
                apimessage: "Something wacky's happened with signup."
            };
            res.json({badstuff: badstuff});
        };

    });
    
});

module.exports = router;