const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.get('/', (req, res)=> { 

    let release_id = req.query.release_id;
    let user_id = req.query.user_id;
    console.log(user_id)

    let vinylQ = `SELECT release_id, releasename, year, vinyls, releasenotes, label.label_id AS label_id, labelname
    FROM \`release\`
    LEFT JOIN label ON release.label_id = label.label_id
    WHERE release_id = ?;
    SELECT owned_release_id, owned_release.collection_id, collectionname, ownercomment
    FROM owned_release
    LEFT JOIN \`release\` ON owned_release.release_id = \`release\`.release_id
    LEFT JOIN collection ON owned_release.collection_id = collection.collection_id
    WHERE owned_release.release_id = ? AND owneruser_id = ?;`

    connection.query(vinylQ, [release_id, release_id, user_id], (err, data)=>{

        if (err) {
            res.json({badstuff: err});
            return;
        };
        
        console.log(data);

        let goodstuff = data[0][0];
        let gravy = data[1];

        let responseobject = {};
        
        if (goodstuff) {
            responseobject.goodstuff = goodstuff;
        } else {
            responseobject.badstuff = {
                apimessage: "The release requested does not exist."
            };
        };

        if (gravy) {
            responseobject.gravy = gravy;
        } else {
            responseobject.baldy = {
                apimessage: "The user has no copies of this release."
            };
        };

        res.json(responseobject);
        
    });

});

module.exports = router;