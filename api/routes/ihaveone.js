const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.post('/', (req, res)=> { 

    let {release_id, user_id} = req.body;

    let ihaveoneQ = `INSERT INTO owned_release (release_id, owneruser_id)
    VALUES (?, ?);`;

    connection.query(ihaveoneQ, [release_id, user_id], (err, data)=>{

        if (err) {
            console.log("Release copy registration failed: ", err.sqlMessage);
            res.json({badstuff: err}); 
            return;
        }; 

        let goodstuff; 
        if (data.insertId) goodstuff = data;

        if (goodstuff) {
            goodstuff.apimessage = `Release copy registered.`,
            res.json({goodstuff: goodstuff}); 
        } else {
            let badstuff = {
                apimessage: "Something wacky's happened with ihaveone."
            };
            res.json({badstuff: badstuff});
        };

    });

});

module.exports = router;