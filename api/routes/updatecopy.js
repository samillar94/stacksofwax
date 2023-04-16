const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.post('/', (req, res)=> { 

    let {owned_release_id, ownercomment} = req.body;

 
    let updatecopyQ = `UPDATE owned_release
    SET ownercomment = ?
    WHERE owned_release_id = ?;`;

    console.log(req.body)

    connection.query(updatecopyQ, [ownercomment, owned_release_id], (err, data)=>{

       
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
                apimessage: "Something wacky's happened with updatecopy."
            }
            res.json(responseobject);
        };

    });

});

module.exports = router;