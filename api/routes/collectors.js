const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.get('/', (req, res)=> { 

    let publiccollectorsQ = `SELECT user_id, username, joindate, userimageurl FROM user WHERE public;`

    connection.query(publiccollectorsQ, (err, data)=>{

        if (err) {
            res.json({badstuff: err}); 
            return;
        }; 
        
        let goodstuff = data;

        if (goodstuff[0]) { 
            res.json({goodstuff: goodstuff}); 
        } else {
            let badstuff = {
                apimessage: "No user data, for some godforsaken reason."
            };
            res.json({badstuff: badstuff});
        };

    });

});

module.exports = router;