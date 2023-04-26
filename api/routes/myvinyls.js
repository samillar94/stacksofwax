const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.get('/', (req, res)=> { 

    let user_id = req.query.user_id;

    let releaseclause = '';
    let release_id = req.query.release_id;
    if (release_id) releaseclause = ` AND copy.release_id = ${release_id}`

    let releaseQ = `
    SELECT \`release\`.release_id, releasename, year, releaseimageurl
    FROM \`release\`
    INNER JOIN (
        SELECT release_id
        FROM copy
        WHERE owneruser_id = ? 
        ${releaseclause}
        GROUP BY release_id
    ) copydata ON copydata.release_id = \`release\`.release_id
    ORDER BY releasename
    ;`

    let copyQ = `
    SELECT \`release\`.release_id, copy_id, ownercomment
    FROM copy
    LEFT JOIN \`release\` ON copy.release_id = \`release\`.release_id
    WHERE owneruser_id = ? 
    ${releaseclause}
    ORDER BY copy_id
    ;`

    connection.query(releaseQ+copyQ, [user_id, user_id], (err, data)=>{

        if (err) {
            console.log(err.sqlMessage)
            res.json({badstuff: err});
            return;
        };
        
        let goodstuff = data[0];

        if (goodstuff) {

            goodstuff.forEach(vinyl => {

                let copies = [];
                data[1].forEach(copy => {
                    if (copy.release_id == vinyl.release_id) copies.push(copy);
                });

                vinyl.copies = copies;

            });

            console.log(goodstuff)

            res.json({goodstuff});

        }
        
    });

});

module.exports = router;