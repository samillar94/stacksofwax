const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.get('/', (req, res)=> { 

    let { nameS } = req.query;
    let nameA = nameS.split('');
    let nameQS='%';

    nameA.forEach( letter => {
        nameQS += letter;
        nameQS += '%';
    });

    console.log(nameQS)

    let searchvinylsQ = `SELECT *
    FROM \`release\`
    WHERE releasename LIKE '%${nameQS}%'
    ;`;

    // TODO both exact and fragmented matches

    connection.query(searchvinylsQ, (err, data)=>{

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