const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.get('/', (req, res)=> { 

    try {

        if (req.session.sess_valid) {

            let user_id = req.session.user_id;

            let meEP = `http://localhost:${API_PORT}/collectors?user_id=${user_id}`
            let myvinylsEP = `http://localhost:${API_PORT}/myvinyls?user_id=${user_id}`;
            let myjukeboxesEP = `http://localhost:${API_PORT}/jukeboxes?user_id=${user_id}`;
            let jukevinylsEP = `http://localhost:${API_PORT}/jukevinyls?user_id=${user_id}`;
        
            axios.get(meEP)
            .then((results0) => {

                let me = results0.data.goodstuff;
                if (results0.data.badstuff) console.log(results0.data.badstuff);

                axios.get(myvinylsEP)
                .then((results1) => {
                    
                    let copiesdata = results1.data.goodstuff;
                    if (results1.data.badstuff) console.log(results1.data.badstuff);

                    axios.get(myjukeboxesEP)   
                    .then((results2) => {

                        let jukeboxesdata = results2.data.goodstuff;
                        if (results2.data.badstuff) console.log(results1.data.badstuff);

                        axios.get(jukevinylsEP)
                        .then((results3) => {
            
                            let jukevinylsdata = results3.data.goodstuff;
                            if (results3.data.badstuff) console.log(results1.data.badstuff);

                            if (me) {

                                res.render('me', {
                                    title: `Me`, 
                                    me,
                                    copiesdata: copiesdata, 
                                    jukeboxesdata: jukeboxesdata,
                                    jukevinylsdata,
                                    member: req.session.sess_valid,
                                    query: req.query
                                });

                            } else {

                                console.log("Me route received no user data from the API.")
                                res.redirect('/');

                            }
                        });
                        
                    });

                }); 
                
            });

        } else {
            res.redirect('/?message=unauthorised');
        };

    } catch (err) {

        console.log("Error in me GET route:", err.message);
        res.redirect("/?message=mebug");

    };

});

router.post('/', (req, res) => {

    try {

        let { user_id, username, userimageurl, bio, public } = req.body;

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        if (public) {
            public = 1;
        } else {
            public = 0;
        }

        const postdata = { user_id, username, userimageurl, bio, public };
        console.log(postdata)
        let editprofileEP = `http://localhost:${API_PORT}/editprofile`; 

        axios.post(editprofileEP, postdata, config)
        .then((results)=>{

            let me = results.data.goodstuff;
            if (results.data.badstuff) console.log(results.data.badstuff);

            if (me) {
                res.redirect('/me?message=profileupdated'); 
            } else {
                res.redirect('/me?message=profilenotupdated'); 
            }
    
        });

    } catch (err) {

        console.log("Error in me POST route:", err.message);
        res.redirect("/?message=mebug");

    };

})

module.exports = router;