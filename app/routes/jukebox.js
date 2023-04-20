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

        axios.get(jukeboxEP)
        .then((results1) => {
            
            let jukeboxdata = results1.data.goodstuff;
                  
            if (results1.data.badstuff) console.log(results1.data.badstuff);

            axios.get(jukevinylsEP)
            .then((results2) => {

                let jukevinylsdata = results2.data.goodstuff;
                let { badstuff } = results2.data;

                if (badstuff) console.log(badstuff);

                axios.get(reviewsEP)
                .then((results3) => {
                    
                    let reviewsdata = results3.data.goodstuff;
                 
                    if (results3.data.badstuff) console.log(results3.data.badstuff);
                
                    if (jukeboxdata) {
                        res.render('jukebox', {
                            title: `${jukeboxdata.jukeboxname} - Jukebox`, 
                            jukeboxdata, 
                            jukevinylsdata,
                            reviewsdata,
                            member: req.session.sess_valid});
                    } else {
                        console.log("Jukebox route received no release data from the API.");
                        console.log("Response:", badstuff);
                        res.redirect('/?message=nojukebox');
                    };

                });
                
            });

        }); 

    } catch (err) {

        console.log("Error in vinyl GET route: ", err.message);
        res.redirect('/?message=vinylbug');

    };

});

module.exports = router;