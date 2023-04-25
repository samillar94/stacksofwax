const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.get('/', (req, res) => {

    try {

        let artist_id = req.query.id

        let artistEP = `http://localhost:${API_PORT}/artists?artist_id=${artist_id}`;
        let vinylsEP = `http://localhost:${API_PORT}/vinyls?artist_id=${artist_id}`;

        axios.get(artistEP)
            .then((results1) => {

                let artist = results1.data.goodstuff;

                if (results1.data.badstuff) console.log(results1.data.badstuff);

                if (artist) {

                    axios.get(vinylsEP)
                        .then((results2) => {

                            let vinyls = results2.data.goodstuff;

                            if (results2.data.badstuff) console.log(results2.data.badstuff); 

                            res.render('artist', {
                                title: artist.artistname+' - Artist',
                                artist,
                                vinyls,
                                member: req.session.sess_valid, 
                                query: req.query
                            });

                        });

                } else {
                    console.log("Artist route received no artist data from the API.");
                    console.log("Response:", results1.data.badstuff);
                    res.redirect('/artists?message=noartist');
                };
            });

    } catch (err) {

        console.log("Error in artist POST route:", err.message);
        res.redirect("/?message=artistbug");

    };

});

module.exports = router;