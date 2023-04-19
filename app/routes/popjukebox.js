const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.post('/', (req, res)=> { 

    try {

        let user_id = req.session.user_id;
        let jukebox_id = req.body.jukebox_id;
        let copy_id = req.body.copy_id;
        console.log(req.body);

        let from = req.headers.referer; /// TODO use this to send user back whence they came 
        console.log(from);

        const postdata = {jukebox_id, copy_id, user_id};

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        let popjukeboxEP = `http://localhost:${API_PORT}/popjukebox`;

        if (req.session.sess_valid) {

            axios.post(popjukeboxEP, postdata, config)
            .then((results)=>{
                
                console.log(`Jukebox "${jukebox_id}" populated by ${user_id}`);

                let goodstuff = results.data.goodstuff;
        
                if (goodstuff) {
                    res.redirect(`/me?message=jukeboxpopulated`);
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