const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.get('/', (req, res)=> { 

    let { jukebox_id } = req.query;
    /// TODO validate public/private

    let jukeboxQ = `SELECT jukebox_id, jukeboxname, jukeboxdesc, jukebox.user_id, username
    FROM jukebox
    LEFT JOIN user ON jukebox.user_id = user.user_id
    WHERE jukebox_id = ?;`;

    connection.query(jukeboxQ, [jukebox_id], (err, data)=>{

        if (err) {
            console.log("Jukebox selection failed:", err.sqlMessage)
            res.json({badstuff: err});
            return;
        };
        
        let goodstuff = data[0];

        let responseobject = {};
        
        if (goodstuff) responseobject.goodstuff = goodstuff;

        res.json(responseobject);
        
    });

});

module.exports = router;