const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.get('/', (req, res)=> { 


    let userclause = '';
    let user_id = req.query.user_id;
    if (user_id) userclause = `WHERE jukebox.user_id = ${user_id}`

    let jukeboxesQ = `SELECT jukebox_id, jukeboxname, jukeboxdesc, jukebox.user_id, username
    FROM jukebox
    LEFT JOIN user ON jukebox.user_id = user.user_id
    ?;`

    connection.query(jukeboxesQ, [userclause], (err, data)=>{

        if (err) {
            console.log(err.sqlMessage)
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