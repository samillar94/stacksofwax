const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.get('/', (req, res)=> { 

    try {

        let jukebox_id = req.query.id;
        let user_id = req.session.user_id;

        let jukeboxEP = `http://localhost:${API_PORT}/jukebox?jukebox_id=${jukebox_id}`;

        axios.get(jukeboxEP)
        .then((results) => {
            
            let jukeboxdata = results.data.goodstuff;
                 
            if (results.data.badstuff) console.log(results.data.badstuff);

            if (jukeboxdata) {
                res.render('jukebox', {title: `${jukeboxdata.jukeboxname} - Jukebox`, jukeboxdata, member: req.session.sess_valid});
            } else {
                console.log("Jukebox route received no release data from the API.");
                console.log("Response:", badstuff);
                res.redirect('/?message=nojukebox');
            };
    
        }); 

    } catch (err) {

        console.log("Error in vinyl GET route: ", err.message);
        res.redirect('/?message=vinylbug');

    };

});

module.exports = router;