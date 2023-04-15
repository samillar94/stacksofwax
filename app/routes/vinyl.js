const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.get('/', (req, res)=> { 

    try {

        let release_id = req.query.id;
        let user_id = req.session.user_id;

        let vinylEP = `http://localhost:${API_PORT}/vinyl?release_id=${release_id}&user_id=${user_id}`;
        
        axios.get(vinylEP)
        .then((results) => {
            
            let { goodstuff, badstuff, gravy, baldy } = results.data;
                 
            if (goodstuff) {
                res.render('vinyl', {title: `${goodstuff.releasename} - Vinyl`, goodstuff: goodstuff, gravy: gravy, member: req.session.sess_valid});
            } else {
                console.log("Vinyl route received no release data from the API.");
                console.log("Response:", badstuff);
                res.redirect('/?message=novinyl');
            }
    
        }); 

    } catch (err) {

        console.log("Error in vinyl GET route: ", err.message);
        res.redirect('/?message=vinylbug');

    };

});

module.exports = router;