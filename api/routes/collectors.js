const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.get('/', (req, res)=> { 

    let { user_id, sessionuserid } = req.query;

    let userclause = '';
    if (user_id) userclause = ` AND user.user_id = ${user_id}`

    let publiccollectorsQ = `
    SELECT user.user_id, username, joindate, bio, userimageurl, stack, likes, public
    FROM user 
    LEFT JOIN (
        SELECT COUNT(copy_id) as stack, owneruser_id
        FROM copy
        GROUP BY owneruser_id
    ) copydata ON copydata.owneruser_id = user.user_id
    LEFT JOIN (
        SELECT COUNT(jukebox_like_id) as likes, user_id
        FROM jukebox
        LEFT JOIN jukebox_like ON jukebox_like.jukebox_id = jukebox.jukebox_id
        GROUP BY jukebox.user_id
    ) likedata ON likedata.user_id = user.user_id
    WHERE (public OR user.user_id = ?)
    ${userclause}
    ;`

    connection.query(publiccollectorsQ, [sessionuserid], (err, data)=>{

        if (err) {
            res.json({badstuff: err}); 
            return;
        }; 
        
        let goodstuff = data;

        if (goodstuff[0]) { 

            if (user_id) {
                res.json({goodstuff: goodstuff[0]}); 
            } else {
                res.json({goodstuff: goodstuff}); 
            }
            
        } else {

            let badstuff = {
                apimessage: "No user data found."
            };
            res.json({badstuff: badstuff});

        };

    });

});

module.exports = router;