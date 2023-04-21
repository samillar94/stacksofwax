const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.post('/', (req, res)=> { 

    try {

        let jukebox_id = req.body.jukebox_id;
        let likeruser_id = req.session.user_id;

        const postdata = {jukebox_id, likeruser_id}
        const config = { 
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        let togglelikeEP = `http://localhost:${API_PORT}/togglelike`;

        axios.post(togglelikeEP, postdata, config)
        .then((results) => {
            
            let likedata = results.data.goodstuff;
            
            if (results.data.badstuff) console.log(results.data.badstuff);
        
            if (likedata) {
                res.redirect(`/jukebox?id=${jukebox_id}&message=liketoggled`);
            } else {
                console.log("Like toggle route received no data from the API.");
                console.log("Response:", results.data.badstuff);
                res.redirect(`/jukebox?id=${jukebox_id}&message=noliketoggle`);
            };

        });

    } catch (err) {

        console.log("Error in togglelike POST route: ", err.message);
        res.redirect(`/jukebox?id=${jukebox_id}&message=togglelikebug`);

    };

});

module.exports = router;