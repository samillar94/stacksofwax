const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.post('/', (req, res)=> { 

    let { jukebox_id, copy_id } = req.body;

    /// TODO validate user id?
    
    let popjukeboxQ = `INSERT INTO selection (jukebox_id, copy_id)
    VALUES (?, ?);`;

    connection.query(popjukeboxQ, [jukebox_id, copy_id], (err, data)=>{

        if (err) {
            console.log("Jukebox population failed: ", err.sqlMessage);
            res.json({badstuff: err}); 
            return;
        }; 

        let goodstuff; 
        if (data.insertId) goodstuff = data;

        if (goodstuff) {
            goodstuff.apimessage = `Jukebox selection added.`,
            res.json({goodstuff: goodstuff}); 
        } else {
            let badstuff = {
                apimessage: "Something wacky's happened with popjukebox."
            };
            res.json({badstuff: badstuff});
        };

    });

});

module.exports = router;