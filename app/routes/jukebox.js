const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.get('/', (req, res)=> { 

    try {

        let jukebox_id = req.query.id;
        let user_id = req.session.user_id;

        let jukeboxEP = `http://localhost:${API_PORT}/jukebox?jukebox_id=${jukebox_id}`;
        let jukevinylsEP = `http://localhost:${API_PORT}/jukevinyls?jukebox_id=${jukebox_id}`;
        let reviewsEP = `http://localhost:${API_PORT}/reviews?jukebox_id=${jukebox_id}`;
        let likesEP = `http://localhost:${API_PORT}/jukeboxlikes?jukebox_id=${jukebox_id}`;

        axios.get(jukeboxEP)
        .then((results1) => {
            
            let jukeboxdata = results1.data.goodstuff;
                  
            if (results1.data.badstuff) console.log(results1.data.badstuff);

            axios.get(jukevinylsEP)
            .then((results2) => {

                let jukevinylsdata = results2.data.goodstuff;

                if (results2.data.badstuff) console.log(results2.data.badstuff);

                axios.get(reviewsEP)
                .then((results3) => {
                    
                    let reviewsdata = results3.data.goodstuff;
                 
                    if (results3.data.badstuff) console.log(results3.data.badstuff);
                
                    axios.get(likesEP)
                    .then((results4) => {

                        let likesdata = results4.data.goodstuff;
                
                        if (results4.data.badstuff) console.log(results4.data.badstuff);

                        if (jukeboxdata) {

                            let likebutton = "Like";
                            if (likesdata) likesdata.forEach(like => {
                                if (like.likeruser_id == user_id) likebutton = "Unlike";
                            });
                            res.render('jukebox', {
                                title: `${jukeboxdata.jukeboxname} - Jukebox`, 
                                jukeboxdata, 
                                jukevinylsdata,
                                reviewsdata,
                                likesdata,
                                likebutton,
                                member: req.session.sess_valid,
                                query: req.query
                            });
                        } else {
                            console.log("Jukebox route received no release data from the API.");
                            console.log("Response:", badstuff);
                            res.redirect('/jukeboxes?message=nojukebox');
                        };

                    });

                });
                
            });

        }); 

    } catch (err) {

        console.log("Error in vinyl GET route: ", err.message);
        res.redirect('/?message=vinylbug');

    };

});

module.exports = router;