const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.post('/', (req, res)=> { 

    try {

        let user_id = req.session.user_id;

        let release_id = req.body.release_id;
        console.log(req.body);

        let from = req.headers.referer; /// could use this to display page differently 
        console.log(from);

        const postdata = {user_id, release_id};

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        let ihaveoneEP = `http://localhost:${API_PORT}/ihaveone`;

        if (req.session.sess_valid) {

            axios.post(ihaveoneEP, postdata, config)
            .then((results)=>{
                
                console.log(`Vinyl checked off by ${user_id}`);

                let goodstuff = results.data.goodstuff;
        
                if (goodstuff) {
                    res.redirect(`/vinyl?id=${release_id}&message=niceyouhaveone`);
                } else {
                    console.log(results.data.badstuff);
                    res.redirect(`/vinyl?id=${release_id}&message=insertfailed`);
                }; 

            });

        } else {
            res.redirect('/');
        }

    } catch (err) {

        console.log("Error in ihaveone POST route:", err.message);
        res.redirect("/?message=ihaveonebug");

    };

});

module.exports = router;