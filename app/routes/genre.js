const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.get('/', (req, res) => {

    try {

        let genrehandle = req.query.handle

        let genreEP = `http://localhost:${API_PORT}/genres?genrehandle=${genrehandle}`;
        let vinylsEP = `http://localhost:${API_PORT}/vinyls?genrehandle=${genrehandle}`;

        axios.get(genreEP)
            .then((results1) => {

                let genre = results1.data.goodstuff;

                if (results1.data.badstuff) console.log(results1.data.badstuff);

                if (genre) {

                    axios.get(vinylsEP)
                        .then((results2) => {

                            let vinyls = results2.data.goodstuff;

                            if (results2.data.badstuff) console.log(results2.data.badstuff); 

                            res.render('genre', {
                                title: genre.genrename+' - Genre',
                                genre,
                                vinyls,
                                member: req.session.sess_valid, 
                                query: req.query
                            });

                        });

                } else {
                    console.log("Genre route received no genre data from the API.");
                    console.log("Response:", results1.data.badstuff);
                    res.redirect('/genres?message=nogenre');
                };
            });

    } catch (err) {

        console.log("Error in genre POST route:", err.message);
        res.redirect("/?message=genrebug");

    };

});

module.exports = router;