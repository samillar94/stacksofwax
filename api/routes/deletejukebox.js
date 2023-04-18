const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.post('/', (req, res)=> { 

    let { jukebox_id } = req.body;

    let deletejukeboxQ = `DELETE FROM jukebox
    WHERE jukebox_id = ?;`;

    console.log(req.body)

    connection.query(deletejukeboxQ, [jukebox_id], (err, data)=>{

        if (err) {
            console.log("Delete jukebox failed: ", err.sqlMessage);
            res.json({badstuff: err}); 
            return;
        }; 

        console.log(data);

        let responseobject = {};

        if (data.affectedRows == 1) {
            responseobject.goodstuff = data;
            responseobject.goodstuff.apimessage = `Jukebox deleted.`,
            res.json(responseobject); 
        } else {
            responseobject.badstuff = {
                data,
                apimessage: "Something wacky's happened with deletejukebox."
            }
            res.json(responseobject);
        };

    });

});

module.exports = router;