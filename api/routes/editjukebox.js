const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.post('/', (req, res)=> { 

    let { jukebox_id, jukeboxname, jukeboxdesc } = req.body;

    let editjukeboxQ = `UPDATE jukebox
    SET jukeboxname = ?, jukeboxdesc = ?
    WHERE jukebox_id = ?;`;

    console.log(req.body)

    connection.query(editjukeboxQ, [jukeboxname, jukeboxdesc, jukebox_id], (err, data)=>{
       
        if (err) {
            console.log("Jukebox update failed: ", err.sqlMessage);
            res.json({badstuff: err}); 
            return;
        }; 

        console.log(data);

        let responseobject = {};

        if (data.affectedRows == 1) {
            responseobject.goodstuff = data;
            responseobject.goodstuff.apimessage = `Jukebox updated.`,
            res.json(responseobject); 
        } else {
            responseobject.badstuff = {
                apimessage: "Something wacky's happened with editjukebox."
            }
            res.json(responseobject);
        };

    });

});

module.exports = router;