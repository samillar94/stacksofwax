const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.get('/', (req, res)=> { 

    try {

        if (req.session.sess_valid) {

            let user_id = req.session.user_id;

            let myvinylsEP = `http://localhost:${API_PORT}/myvinyls?user_id=${user_id}`;
            let myjukeboxesEP = `http://localhost:${API_PORT}/jukeboxes?user_id=${user_id}`;
            
            axios.get(myvinylsEP)
            .then((results1) => {
                
                let copiesdata = results1.data.goodstuff;
                let { badstuff } = results1.data;

                if (badstuff) console.log(badstuff);

                axios.get(myjukeboxesEP)   
                .then((results2) => {

                    let jukeboxesdata = results2.data.goodstuff;
                    let { badstuff } = results2.data;

                    if (badstuff) console.log(badstuff);

                    res.render('me', {
                        title: `Me`, 
                        copiesdata: copiesdata, 
                        jukeboxesdata: jukeboxesdata,
                        user_id: user_id, 
                        member: req.session.sess_valid
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