const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.post('/', (req, res)=> { 

    let { jukebox_id, likeruser_id } = req.body;

    /// TODO validate user id?

    let checklikeQ = `SELECT * FROM jukebox_like WHERE jukebox_id = ? AND likeruser_id = ?;`;

    connection.query(checklikeQ, [jukebox_id, likeruser_id], (err, data)=>{

        if (err) {
            console.log("Jukebox like check failed: ", err.sqlMessage);
            res.json({badstuff: err}); 
            return;
        }; 

        if (data[0]) {

            let unlikeQ = `DELETE FROM jukebox_like WHERE jukebox_id = ? AND likeruser_id = ?;`

            connection.query(unlikeQ, [jukebox_id, likeruser_id], (err, data)=>{

                if (err) {
                    console.log("Jukebox unlike failed: ", err.sqlMessage);
                    res.json({badstuff: err}); 
                    return;
                }; 

                let goodstuff; 
                if (data.affectedRows == 1) goodstuff = data;

                if (goodstuff) {
                    goodstuff.apimessage = `Jukebox unliked.`,
                    res.json({goodstuff: goodstuff}); 
                } else {
                    let badstuff = data
                    badstuff.apimessage = "Something wacky's happened with togglelike."
                    res.json({badstuff: badstuff});
                };
            
            });
        
        } else {
 
            let likeQ = `INSERT INTO jukebox_like (jukebox_id, likeruser_id)
            VALUES (?, ?);`;

            connection.query(likeQ, [jukebox_id, likeruser_id], (err, data)=>{

                if (err) {
                    console.log("Jukebox like failed: ", err.sqlMessage);
                    res.json({badstuff: err}); 
                    return;
                }; 

                let goodstuff; 
                if (data.insertId) goodstuff = data;

                if (goodstuff) {
                    goodstuff.apimessage = `Jukebox liked.`,
                    res.json({goodstuff: goodstuff}); 
                } else {
                    let badstuff = {
                        apimessage: "Something wacky's happened with togglelike."
                    };
                    res.json({badstuff: badstuff});
                };

            }); 
        };
    });
});

module.exports = router;