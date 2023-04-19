const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.get('/', (req, res)=> { 

    let { user_id, jukebox_id } = req.query;

    let jukeboxclause = '';
    if (jukebox_id) jukeboxclause = `AND selection.jukebox_id = ${jukebox_id}`;
    let userclause = '';
    if (user_id) userclause = `AND owneruser_id = ${user_id}`;

    let jukevinylsQ = `SELECT selection_id, jukebox_id, selection.copy_id, copy.release_id, 
    releasename, year, owneruser_id AS user_id, ownercomment
    FROM selection
    LEFT JOIN copy ON selection.copy_id = copy.copy_id
    LEFT JOIN \`release\` ON copy.release_id = \`release\`.release_id
    WHERE true ${jukeboxclause} ${userclause};`

    connection.query(jukevinylsQ, (err, data)=>{

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