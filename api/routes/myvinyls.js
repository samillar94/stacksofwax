const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.get('/', (req, res)=> { 

    let user_id = req.query.user_id;

    let releaseclause = '';
    let release_id = req.query.release_id;
    if (release_id) releaseclause = ` AND owned_release.release_id = ${release_id}`

    let vinylQ = `SELECT \`release\`.release_id, releasename, year, owned_release_id, owned_release.collection_id, collectionname, ownercomment
    FROM owned_release
    LEFT JOIN \`release\` ON owned_release.release_id = \`release\`.release_id
    LEFT JOIN collection ON owned_release.collection_id = collection.collection_id
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