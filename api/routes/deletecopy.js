const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.post('/', (req, res)=> { 

    let {copy_id} = req.body;

    let deletecopyQ = `DELETE FROM copy
    WHERE copy_id = ?;`;

    console.log(req.body)

    connection.query(deletecopyQ, [copy_id], (err, data)=>{

        if (err) {
            console.log("Delete copy update failed: ", err.sqlMessage);
            res.json({badstuff: err}); 
            return;
        }; 

        console.log(data);

        let responseobject = {};

        if (data.affectedRows == 1) {
            responseobject.goodstuff = data;
            responseobject.goodstuff.apimessage = `Release copy deleted.`,
            res.json(responseobject); 
        } else {
            responseobject.badstuff = {
                data,
                apimessage: "Something wacky's happened with deletecopy."
            }
            res.json(responseobject);
        };

    });

});

module.exports = router;