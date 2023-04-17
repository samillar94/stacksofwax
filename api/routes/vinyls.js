const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.get('/', (req, res)=> { 

    let allvinylsQ = `SELECT release_id, releasename FROM \`release\`;` /// release is a reserved word in SQL -_-

    connection.query(allvinylsQ, (err, data)=>{

        if (err) {
            res.json({badstuff: err});
        };
        
        let goodstuff = data;
        
        if (goodstuff[0]) { 
            res.json({goodstuff: goodstuff});
        } else {
            let badstuff = {
                apimessage: "No release data. (Why??)"
            };
            res.json({badstuff: badstuff});
        };
        
    });

});

module.exports = router;