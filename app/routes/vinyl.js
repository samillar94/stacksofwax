const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.get('/', (req, res)=> { 

    try {

        let id = req.query.id;

        let vinylEP = `http://localhost:${API_PORT}/vinyl?id=${id}`;
        
        axios.get(vinylEP)
        .then((results) => {
            
            let data = results.data.goodstuff;
                 
            if (data) {
                res.render('vinyl', {data, member: req.session.sess_valid});
            } else {
                console.log("Vinyl route received no release data from the API.");
                console.log("Response:", data);
                res.redirect('/?message=novinyl');
            }
    
        });

    } catch (err) {

        console.log("Error in vinyl GET route: ", err.message);
        res.redirect('/?message=vinylbug');

    };

});

module.exports = router;