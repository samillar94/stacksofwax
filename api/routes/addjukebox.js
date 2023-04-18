const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.post('/', (req, res)=> { 

    let {jukeboxname, jukeboxdesc, user_id} = req.body;

    let addjukeboxQ = `INSERT INTO jukebox (jukeboxname, jukeboxdesc, user_id)
    VALUES (?, ?, ?);`;

    connection.query(addjukeboxQ, [jukeboxname, jukeboxdesc, user_id], (err, data)=>{

        if (err) {
            console.log("Jukebox addition failed: ", err.sqlMessage);
            res.json({badstuff: err}); 
            return;
        }; 

        let goodstuff; 
        if (data.insertId) goodstuff = data;

        if (goodstuff) {
            goodstuff.apimessage = `Jukebox added.`,
            res.json({goodstuff: goodstuff}); 
        } else {
            let badstuff = {
                apimessage: "Something wacky's happened with addjukebox."
            };
            res.json({badstuff: badstuff});
        };

    });

});

module.exports = router;