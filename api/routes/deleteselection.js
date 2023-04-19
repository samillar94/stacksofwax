const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.post('/', (req, res)=> { 

    let { jukebox_id, copy_id } = req.body;

    let deleteselectionQ = `DELETE FROM selection
    WHERE jukebox_id = ? AND copy_id = ?;`;

    console.log(req.body)

    connection.query(deleteselectionQ, [jukebox_id, copy_id], (err, data)=>{

        if (err) {
            console.log("Delete selection failed: ", err.sqlMessage);
            res.json({badstuff: err}); 
            return;
        }; 

        console.log(data);

        let responseobject = {};

        if (data.affectedRows == 1) {
            responseobject.goodstuff = data;
            responseobject.goodstuff.apimessage = `Copy deleted from jukebox.`,
            res.json(responseobject); 
        } else {
            responseobject.badstuff = {
                data,
                apimessage: "Something wacky's happened with deleteselection."
            }
            res.json(responseobject);
        };

    });

});

module.exports = router;