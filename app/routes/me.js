const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.get('/', (req, res)=> { 

    try {

        if (req.session.sess_valid) {

            console.log("Cookies:", req.cookies);

            let user_id = req.session.user_id;

            /// TODO pass in username/data

            let myvinylsEP = `http://localhost:${API_PORT}/myvinyls?user_id=${user_id}`;
            let myjukeboxesEP = `http://localhost:${API_PORT}/jukeboxes?user_id=${user_id}`;
            let jukevinylsEP = `http://localhost:${API_PORT}/jukevinyls?user_id=${user_id}`;
        
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

                        res.render('me', {
                            title: `Me`, 
                            copiesdata: copiesdata, 
                            jukeboxesdata: jukeboxesdata,
                            jukevinylsdata,
                            user_id: user_id, 
                            member: req.session.sess_valid,
                            query: req.query
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

module.exports = router;