const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.get('/', (req, res)=> { 

    let genrehandle = req.query.genrehandle;

    let genreclause = '';
    if (genrehandle) genreclause = ` AND genrehandle = "${genrehandle}"`

    let genresQ = `
        SELECT * 
        FROM genre
        WHERE true
        ${genreclause}
        ORDER BY genrehandle
        ;`

    connection.query(genresQ, (err, data)=>{

        if (err) {
            res.json({badstuff: err});
            return;
        };
        
        let goodstuff = data;
        console.log(goodstuff)
        
        if (goodstuff.length == 1) {  
            res.json({goodstuff: goodstuff[0]});
        } else if (goodstuff.length > 1) {
            res.json({goodstuff: goodstuff});
        } else {
            let badstuff = {
                apimessage: "No genre data. (Why??)"
            };
            res.json({badstuff: badstuff});
        };
        
    });

});

module.exports = router;