const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.post('/', (req, res)=> { 

    let { copy_id, ownercomment } = req.body;

    let editcopyQ = `UPDATE copy
    SET ownercomment = ?
    WHERE copy_id = ?;`;

    console.log(req.body)

    connection.query(editcopyQ, [ownercomment, copy_id], (err, data)=>{
       
        if (err) {
            console.log("Release copy update failed: ", err.sqlMessage);
            res.json({badstuff: err}); 
            return;
        }; 

        console.log(data);

        let responseobject = {};

        if (data.affectedRows == 1) {
            responseobject.goodstuff = data;
            responseobject.goodstuff.apimessage = `Release copy updated.`,
            res.json(responseobject); 
        } else {
            responseobject.badstuff = {
                apimessage: "Something wacky's happened with editcopy."
            }
            res.json(responseobject);
        };

    });

});

module.exports = router;