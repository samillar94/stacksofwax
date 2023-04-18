const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.post('/', (req, res)=> { 

    let {jukeboxname, jukeboxdesc} = req.body;

    let addjukeboxQ = `INSERT INTO jukebox (jukeboxname, jukeboxdesc)
    VALUES (?, ?);`;

    connection.query(addjukeboxQ, [jukeboxname, jukeboxdesc], (err, data)=>{

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