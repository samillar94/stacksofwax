const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.get('/', (req, res)=> { 

    let id = req.query.id;
    let sessionuserid = req.query.sessionuserid;

    let collectorQ = `
    SELECT user_id, username, joindate, bio, userimageurl 
    FROM user WHERE (public OR user_id = ?) 
    AND user_id = ?;`

    connection.query(collectorQ, [sessionuserid, id], (err, data)=>{
 
        if (err) {
            res.json({badstuff: err}); 
            return;
        };

        let goodstuff = data[0];
        
        if (goodstuff) { 
            res.json({goodstuff: goodstuff}); 
        } else {
            let badstuff = {
                apimessage: "The user requested does not exist, or is not visible."
            };
            res.json({badstuff: badstuff});
        };
        
    });

});

module.exports = router;