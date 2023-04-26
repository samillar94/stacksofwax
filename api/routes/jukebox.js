const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.get('/', (req, res)=> { 

    let { jukebox_id, sessionuserid } = req.query;

    let jukeboxQ = `SELECT jukebox_id, jukeboxname, jukeboxdesc, jukeboximageurl, jukebox.user_id AS 'user_id', username, userimageurl
    FROM jukebox
    LEFT JOIN user ON jukebox.user_id = user.user_id
    WHERE (public OR user.user_id = ?) AND jukebox_id = ?
    ;`;

    connection.query(jukeboxQ, [sessionuserid, jukebox_id], (err, data)=>{

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