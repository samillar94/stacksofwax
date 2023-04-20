const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.post('/', (req, res)=> { 

    try {

        let jukebox_id = req.body.jukebox_id;
        let reviewtext = req.body.reviewtext;
        let revieweruser_id = req.session.user_id;
        console.log(req.body);

        let from = req.headers.referer; /// TODO use this to send user back whence they came 
        console.log(from);

        const postdata = {jukebox_id, reviewtext, revieweruser_id};

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        let addreviewEP = `http://localhost:${API_PORT}/addreview`;

        if (req.session.sess_valid) {

            axios.post(addreviewEP, postdata, config)
            .then((results)=>{
                
                console.log(`Review added by ${revieweruser_id}`);

                let goodstuff = results.data.goodstuff;
        
                if (goodstuff) {
                    res.redirect(`/jukebox?id=${jukebox_id}&message=reviewadded`);
                } else { 
                    console.log(results.data.badstuff);
                    res.redirect(`/jukebox?id=${jukebox_id}&message=insertfailed`);
                }; 

            });

        } else {
            res.redirect('/');
        }

    } catch (err) {

        console.log("Error in addjukebox POST route:", err.message);
        res.redirect("/?message=addjukeboxbug");

    };

});

module.exports = router;