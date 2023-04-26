const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.get('/', (req, res)=> { 

    try {

        let user_id = req.query.id;
        let sessionuserid = req.session.user_id;
    
        let collectorEP = `http://localhost:${API_PORT}/collectors?user_id=${user_id}&sessionuserid=${sessionuserid}`;
        let ownedvinylsEP = `http://localhost:${API_PORT}/myvinyls?user_id=${user_id}`;
        let theirjukeboxesEP = `http://localhost:${API_PORT}/jukeboxes?user_id=${user_id}`;

        axios.get(collectorEP)
        .then((results1)=>{
    
            let userdata = results1.data.goodstuff;
            if (results1.data.badstuff) console.log(results1.data.badstuff);

            axios.get(ownedvinylsEP) 
            .then((results2) => {
                
                let ownedvinylsdata = results2.data.goodstuff;
                console.log(results2.data)
                if (results2.data.badstuff) console.log(results2.data.badstuff);

                axios.get(theirjukeboxesEP)   
                .then((results3) => {

                    let jukeboxesdata = results3.data.goodstuff;
                    if (results3.data.badstuff) console.log(results3.data.badstuff);

                    if (userdata) {

                        res.render('collector', {
                            title: `${userdata.username} - Collector`, 
                            userdata, 
                            ownedvinylsdata, 
                            jukeboxesdata,
                            member: req.session.sess_valid,
                            query: req.query
                        });  

                    } else {

                        console.log("Collector route received no user data from the API.")
                        res.redirect('/collectors');

                    };
                    
                });

            });

        });

            
 

      

    } catch (err) {

        console.log("Error in collector GET route: ", err.message);
        res.redirect('/collectors');

    };

});

module.exports = router;