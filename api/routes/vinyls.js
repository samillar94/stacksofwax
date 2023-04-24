const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.get('/', (req, res)=> { 

    let { artist_id, genrehandle, decade } = req.query;

    let artistclause = '';
    if (artist_id) artistclause = `AND artist.artist_id = ${artist_id}`;
    let genreclause = '';
    if (genrehandle) genreclause = `AND genre.genrehandle = ${genrehandle}`;
    let decadeclause = '';
    if (decade) decadeclause = `AND release.year >= ${decade} AND release.year < ${decade+10}`;

    let releasesQ = `
        SELECT \`release\`.release_id, releasename, releaseimageurl, year, vinyls, owners, sectionnames, sectionsartistnames
        FROM \`release\` 
        LEFT JOIN (
            SELECT release_id, COUNT(owneruser_id) AS owners
            FROM (
                SELECT DISTINCT release_id, owneruser_id
                FROM copy
            ) distinctcopy
            GROUP BY release_id
        ) ownerdata ON ownerdata.release_id = \`release\`.release_id
        LEFT JOIN (
            SELECT release_id, GROUP_CONCAT(sectionname ORDER BY sectionindex SEPARATOR ' / ') AS sectionnames, 
            GROUP_CONCAT(artistnames ORDER BY sectionindex SEPARATOR ' / ') as sectionsartistnames
            FROM section 
            LEFT JOIN (
                SELECT section_id, GROUP_CONCAT(artistname ORDER BY artistversion.artist_id SEPARATOR ', ') AS artistnames
                FROM section_credit 
                LEFT JOIN artistversion ON section_credit.artistversion_id = artistversion.artistversion_id
                LEFT JOIN artist on artistversion.artist_id = artist.artist_id
                GROUP BY section_id
            ) artistdata ON artistdata.section_id = section.section_id
            GROUP BY release_id
        ) sectiondata ON sectiondata.release_id = \`release\`.release_id
        WHERE true 
        ${artistclause} 
        ${genreclause}
        ${decadeclause}
        ORDER BY owners DESC, sectionnames ASC
        ;`

    connection.query(releasesQ, (err, data)=>{

        if (err) {
            res.json({badstuff: err});
        };
        
        let goodstuff = data;
        
        if (goodstuff[0]) { 
            res.json({goodstuff: goodstuff});
        } else {
            let badstuff = {
                apimessage: "No release data. (Why??)"
            };
            res.json({badstuff: badstuff});
        };
        
    });

});

module.exports = router;