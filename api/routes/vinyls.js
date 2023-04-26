const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.get('/', (req, res)=> { 

    let { artist_id, genrehandle, decade } = req.query;

    let artistclause = '';
    if (artist_id) artistclause = `AND artist.artist_id = ${artist_id}`;
    let genreclause = '';
    if (genrehandle) genreclause = `AND genre.genrehandle = "${genrehandle}"`;
    let decadeclause = '';
    if (decade) decadeclause = `AND release.year >= ${decade} AND release.year < ${decade+10}`;

    let releasesQ = `
        SELECT \`release\`.release_id, releasename, releaseimageurl, year, vinyls, owners, sectionnames, sectionsartistnames, genrenames
        FROM \`release\` 
        LEFT JOIN (
            SELECT release_id, COUNT(owneruser_id) AS owners
            FROM (
                SELECT DISTINCT release_id, owneruser_id
                FROM copy
            ) distinctcopy
            GROUP BY release_id
        ) ownerdata ON ownerdata.release_id = \`release\`.release_id
        INNER JOIN (
            SELECT release_id, GROUP_CONCAT(sectionname ORDER BY sectionindex SEPARATOR ' / ') AS sectionnames, 
            GROUP_CONCAT(artistnames ORDER BY sectionindex SEPARATOR ' / ') as sectionsartistnames
            FROM section 
            INNER JOIN (
                SELECT section_id, GROUP_CONCAT(artistname ORDER BY artistversion.artist_id SEPARATOR ', ') AS artistnames,
                COUNT(IF(true ${artistclause}, 1, NULL)) AS artistmatches
                FROM section_credit 
                LEFT JOIN artistversion ON section_credit.artistversion_id = artistversion.artistversion_id
                LEFT JOIN artist on artistversion.artist_id = artist.artist_id
                GROUP BY section_id
                HAVING artistmatches > 0
            ) artistdata ON artistdata.section_id = section.section_id
            GROUP BY release_id
        ) sectiondata ON sectiondata.release_id = \`release\`.release_id
        INNER JOIN (
            SELECT release_id, GROUP_CONCAT(genrename SEPARATOR ' / ') as genrenames, 
            COUNT(IF(true ${genreclause}, 1, NULL)) AS genrematches
            FROM release_genre
            LEFT JOIN genre ON genre.genre_id = release_genre.genre_id
            GROUP BY release_id
            HAVING genrematches > 0
        ) genredata ON genredata.release_id = \`release\`.release_id
        WHERE true 
        ${decadeclause}
        ORDER BY owners DESC, sectionnames ASC
        ;`

    connection.query(releasesQ, (err, data)=>{

        if (err) {
            res.json({badstuff: err});
            return;
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