const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.get('/', (req, res)=> { 

    let release_id = req.query.release_id;
    let user_id = req.query.user_id;
    console.log(user_id)

    let vinylQ = `
    SELECT release_id, releasename, year, vinyls, releasenotes, label.label_id AS label_id, labelname
    FROM \`release\`
    LEFT JOIN label ON release.label_id = label.label_id
    WHERE release_id = ${release_id}
    ;`

    let sectionQ = `
    SELECT \`release\`.release_id, section_id, sectionname, sectionindex
    FROM section
    LEFT JOIN \`release\` ON release.release_id = section.release_id
    WHERE \`release\`.release_id = ${release_id}
    ;`

    let artistQ = `
    SELECT section.section_id, artist.artist_id, artistname
    FROM section_credit
    LEFT JOIN section ON section.section_id = section_credit.section_id
    LEFT JOIN \`release\` ON \`release\`.release_id = section.release_id
    LEFT JOIN artistversion ON artistversion.artistversion_id = section_credit.artistversion_id
    LEFT JOIN artist ON artist.artist_id = artistversion.artist_id
    WHERE \`release\`.release_id = ${release_id}
    ;`

    let genreQ = `
    SELECT genrename, genrehandle
    FROM release_genre
    LEFT JOIN genre ON genre.genre_id = release_genre.genre_id
    WHERE release_genre.release_id = ${release_id}
    ;`

    connection.query(vinylQ+sectionQ+artistQ+genreQ, (err, data)=>{

        if (err) {
            res.json({badstuff: err});
            return;
        };
        
        let goodstuff = data[0][0];

        let responseobject = {};
        
        if (goodstuff) {

            /// nest data like a good JSON
            let sections = [];
            data[1].forEach(section => {
                if (section.release_id == goodstuff.release_id) {
                    let credits = [];
                    data[2].forEach(credit => {
                        if (credit.section_id == section.section_id) credits.push(credit);
                    });
                    section.artists = credits;
                    sections.push(section);
                };
            });
            goodstuff.sections = sections;

            goodstuff.genres = data[3];

            responseobject.goodstuff = goodstuff;

        } else {
            responseobject.badstuff = {
                apimessage: "The release requested does not exist."
            };
        };

        res.json(responseobject);
        
    });

});

module.exports = router;