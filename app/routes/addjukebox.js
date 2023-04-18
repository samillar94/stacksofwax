const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.post('/', (req, res)=> { 

    try {

        let user_id = req.session.user_id;
        let jukeboxname = req.body.jukeboxname;
        let jukeboxdesc = req.body.jukeboxdesc;
        console.log(req.body);

        let from = req.headers.referer; /// TODO use this to send user back whence they came 
        console.log(from);

        const postdata = {jukeboxname, jukeboxdesc, user_id};

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        let addjukeboxEP = `http://localhost:${API_PORT}/addjukebox`;

        if (req.session.sess_valid) {

            axios.post(addjukeboxEP, postdata, config)
            .then((results)=>{
                
                console.log(`Jukebox "${jukeboxname}" added by ${user_id}`);

                let goodstuff = results.data.goodstuff;
        
                if (goodstuff) {
                    res.redirect(`/me?message=jukeboxadded`);
                } else {
                    console.log(results.data.badstuff);
                    res.redirect(`/me?message=insertfailed`);
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