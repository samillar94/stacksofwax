const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.get('/', (req, res)=> { 

    try {

        let id = req.query.id;
        let sessionuserid = req.session.user_id;
    
        let collectorEP = `http://localhost:${API_PORT}/collector?id=${id}&sessionuserid=${sessionuserid}`;
    
        axios.get(collectorEP)
        .then((results)=>{
    
            let data = results.data.goodstuff;
    
            if (data) {

                res.render('collector', {title: `${data.username} - Collector`, data, member: req.session.sess_valid});  

            } else {

                console.log("Collector route received no user data from the API.")
                console.log("Response:", results.data.badstuff);
                res.redirect('/collectors');

            };
    
        });

    } catch (err) {

        console.log("Error in collector GET route: ", err.message);
        res.redirect('/collectors');

    };

});

module.exports = router;