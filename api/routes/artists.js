const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.get('/', (req, res)=> { 

    let artist_id = req.query.artist_id;

    let artistclause = '';
    if (artist_id) artistclause = ` AND artist_id = ${artist_id}`

    let artistsQ = `
        SELECT * 
        FROM artist
        WHERE true
        ${artistclause}
        ORDER BY artistname
        ;`

    connection.query(artistsQ, (err, data)=>{

        if (err) {
            res.json({badstuff: err});
            return;
        }; 
        
        let goodstuff = data;

        console.log(goodstuff.length)
        
        if (goodstuff.length == 1) { 
            res.json({goodstuff: goodstuff[0]});
        } else if (goodstuff.length > 1) {
            res.json({goodstuff: goodstuff});
        } else {
            let badstuff = {
                apimessage: "No artist data. (Why??)"
            };
            res.json({badstuff: badstuff});
        };
        
    });

});

module.exports = router;