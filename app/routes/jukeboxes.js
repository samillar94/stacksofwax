const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.get('/', (req, res)=> {

    try {

        let sessionuserid = req.session.user_id;

        let jukeboxesEP = `http://localhost:${API_PORT}/jukeboxes?sessionuserid=${sessionuserid}`;

        axios.get(jukeboxesEP)
        .then((results)=>{
            
            let jukeboxesdata = results.data.goodstuff;
            res.render('jukeboxes', {
                title: 'Jukeboxes', 
                jukeboxesdata
            }); 

        });

    } catch (err) {

        console.log("Error in jukeboxes GET route:", err.message);
        res.redirect("/?message=jukeboxesbug");

    };

});

module.exports = router;