const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.get('/', (req, res)=> { 

    let { sessionuserid, user_id } = req.query;

    let userclause = "";
    if (user_id) userclause = ` AND jukebox.user_id = ${user_id}`

    let jukeboxesQ = `SELECT jukebox_id, jukeboxname, jukeboxdesc, jukeboximageurl, jukebox.user_id, username
    FROM jukebox
    LEFT JOIN user ON jukebox.user_id = user.user_id
    WHERE (public OR user.user_id = ?)
    ${userclause};`

    connection.query(jukeboxesQ, [sessionuserid], (err, data)=>{

        if (err) {
            console.log("Jukebox selection failed:", err.sqlMessage)
            res.json({badstuff: err});
            return;
        };
        
        let goodstuff = data;

        let responseobject = {};
        
        if (goodstuff) responseobject.goodstuff = goodstuff;

        res.json(responseobject);
        
    });

});

module.exports = router;