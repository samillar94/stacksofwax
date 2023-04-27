const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.get('/', (req, res)=> {

    try {

        let artistsEP = `http://localhost:${API_PORT}/artists`;

        axios.get(artistsEP)
        .then((results)=>{
            
            let artists = results.data.goodstuff;

            res.render('artists', {
                title: 'Artists', 
                artists
            }); 

        });
 
    } catch (err) {

        console.log("Error in artists GET route:", err.message);
        res.redirect("/?message=artistsbug");

    };

});

module.exports = router;