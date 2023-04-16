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
    WHERE release_id = ?;`

    connection.query(vinylQ, [release_id], (err, data)=>{

        if (err) {
            res.json({badstuff: err});
            return;
        };
        
        console.log(data);

        let goodstuff = data[0];

        let responseobject = {};
        
        if (goodstuff) {
            responseobject.goodstuff = goodstuff;
        } else {
            responseobject.badstuff = {
                apimessage: "The release requested does not exist."
            };
        };

        res.json(responseobject);
        
    });

});

module.exports = router;