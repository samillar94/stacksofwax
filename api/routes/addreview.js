const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.post('/', (req, res)=> { 

    let { jukebox_id, revieweruser_id, reviewtext } = req.body;

    /// TODO validate user id?
    
    let addreviewQ = `INSERT INTO jukebox_review (jukebox_id, revieweruser_id, reviewtext)
    VALUES (?, ?, ?);`;

    connection.query(addreviewQ, [jukebox_id, revieweruser_id, reviewtext], (err, data)=>{

        if (err) {
            console.log("Jukebox review failed: ", err.sqlMessage);
            res.json({badstuff: err}); 
            return;
        }; 

        let goodstuff; 
        if (data.insertId) goodstuff = data;

        if (goodstuff) {
            goodstuff.apimessage = `Jukebox review added.`,
            res.json({goodstuff: goodstuff}); 
        } else {
            let badstuff = {
                apimessage: "Something wacky's happened with addreview."
            };
            res.json({badstuff: badstuff});
        };

    });

});

module.exports = router;