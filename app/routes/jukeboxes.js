const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.get('/', (req, res, next)=> {

    try {

        let jukeboxesEP = `http://localhost:${API_PORT}/jukeboxes`;
        /// TODO top rated jukeboxes

        axios.get(jukeboxesEP)
        .then((results)=>{
            
            let jukeboxesdata = results.data.goodstuff;
            res.render('jukeboxes', {
                title: 'Jukeboxes', 
                jukeboxesdata: jukeboxesdata, 
                member: req.session.sess_valid
            }); 

        });

    } catch (err) {

        console.log(err);
        next(); /// the home route is the one place I'll pass to the error handler - all other page errors I'll just redirect here

    };

});

module.exports = router;