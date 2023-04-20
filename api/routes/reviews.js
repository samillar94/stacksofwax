const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.get('/', (req, res)=> { 

    // let user_id = req.query.user_id;

    let jukeboxclause = '';
    let jukebox_id = req.query.jukebox_id;
    if (jukebox_id) jukeboxclause = ` AND jukebox_id = ${jukebox_id}`

    let reviewsQ = `SELECT jukebox_review_id, reviewtext, revieweruser_id, user.username, jukebox_id 
    FROM jukebox_review
    LEFT JOIN user ON user.user_id = jukebox_review.revieweruser_id
    WHERE true ${jukeboxclause};`

    connection.query(reviewsQ, (err, data)=>{

        if (err) {
            console.log(err.sqlMessage)
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