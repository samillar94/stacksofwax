const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.post('/', (req, res)=> { 

    let { user_id, username, userimageurl, bio, public } = req.body;

    let editprofileQ = `UPDATE user
    SET username = ?, userimageurl = ?, bio = ?, public = ?
    WHERE user_id = ?
    ;`;

    console.log(req.body);

    connection.query(editprofileQ, [username, userimageurl, bio, public, user_id], (err, data)=>{
       
        if (err) {
            console.log("Profile update failed: ", err.sqlMessage);
            res.json({badstuff: err}); 
            return;
        }; 

        console.log(data);

        let responseobject = {};

        if (data.affectedRows == 1) {
            responseobject.goodstuff = data;
            responseobject.goodstuff.apimessage = `Profile updated.`,
            res.json(responseobject); 
        } else {
            responseobject.badstuff = {
                apimessage: "Something wacky's happened with editprofile."
            }
            res.json(responseobject);
        };

    });

});

module.exports = router;