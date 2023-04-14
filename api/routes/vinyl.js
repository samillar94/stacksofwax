const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.get('/', (req, res)=> { 

    let id = req.query.id;

    let vinylQ = `SELECT release_id, releasename, year, vinyls, releasenotes, label.label_id AS label_id, labelname
    FROM \`release\`
    LEFT JOIN label ON release.label_id = label.label_id
    WHERE release_id = ?;`

    connection.query(vinylQ, [id], (err, data)=>{

        if (err) {
            res.json({badstuff: err});
            return;
        };
        
        let goodstuff = data[0];
        
        if (goodstuff) {
            res.json({goodstuff: goodstuff});
        } else {
            let badstuff = {
                apimessage: "The release requested does not exist."
            };
            res.json({badstuff: badstuff});
        };
        
    });

});

module.exports = router;