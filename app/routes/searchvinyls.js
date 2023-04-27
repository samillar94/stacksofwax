const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.get('/', (req, res)=> {

    try {

        let { nameS } = req.query;

        let searchvinylsEP = `http://localhost:${API_PORT}/searchvinyls?nameS=${nameS}`;

        axios.get(searchvinylsEP)
        .then((results)=>{
            
            let vinylsdata = results.data.goodstuff;
            res.render('searchvinyls', {
                title: `${nameS} - Vinyl search`, 
                vinylsdata
            }); 

        });

    } catch (err) {

        console.log(err);
        res.redirect('/');

    };

});

module.exports = router;