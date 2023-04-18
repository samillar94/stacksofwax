const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.get('/', (req, res)=> { 

    let user_id = req.query.user_id;

    let releaseclause = '';
    let release_id = req.query.release_id;
    if (release_id) releaseclause = ` AND copy.release_id = ${release_id}`

    let vinylQ = `SELECT \`release\`.release_id, releasename, year, copy_id, copy.jukebox_id, jukeboxname, ownercomment
    FROM copy
    LEFT JOIN \`release\` ON copy.release_id = \`release\`.release_id
    LEFT JOIN jukebox ON copy.jukebox_id = jukebox.jukebox_id
    WHERE owneruser_id = ? ?;`

    connection.query(vinylQ, [user_id, releaseclause], (err, data)=>{

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