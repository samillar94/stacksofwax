const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.get('/', (req, res)=> { 

    let decadesQ = `
        SELECT DISTINCT CONCAT(SUBSTRING(year,0,3), "0") AS decade
        FROM \`release\`
        ORDER BY decade
        ;`

    connection.query(decadesQ, (err, data)=>{

        if (err) {
            res.json({badstuff: err});
        };
        
        let goodstuff = data;
        
        if (goodstuff[0]) { 
            res.json({goodstuff: goodstuff});
        } else {
            let badstuff = {
                apimessage: "No decade data. (Why??)"
            };
            res.json({badstuff: badstuff});
        };
        
    });

});

module.exports = router;