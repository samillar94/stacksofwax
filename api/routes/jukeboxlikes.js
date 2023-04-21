const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.get('/', (req, res)=> { 

    let { jukebox_id } = req.query;

    /// TODO validate user id?

    let checklikeQ = `SELECT likeruser_id, created, username
    FROM jukebox_like 
    LEFT JOIN user ON user.user_id = jukebox_like.likeruser_id
    WHERE jukebox_id = ? 
    ORDER BY created DESC;`;

    connection.query(checklikeQ, [jukebox_id], (err, data)=>{

        if (err) {
            console.log("Jukebox like query failed: ", err.sqlMessage);
            res.json({badstuff: err}); 
            return;
        }; 
        
        let goodstuff = data;

        let responseobject = {};
        
        if (goodstuff) responseobject.goodstuff = goodstuff;

        res.json(responseobject);

    });

});

module.exports = router;