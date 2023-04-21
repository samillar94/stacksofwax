const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.get('/', (req, res, next)=> {

    try {

        let from = req.headers.referer; /// could use this to display page differently 

        let { nameS } = req.query;

        let searchvinylsEP = `http://localhost:${API_PORT}/searchvinyls?nameS=${nameS}`;
        /// TODO top n vinyls

        axios.get(searchvinylsEP)
        .then((results)=>{
            
            let vinylsdata = results.data.goodstuff;
            res.render('searchvinyls', {
                title: `${nameS} - Vinyl search`, 
                vinylsdata: vinylsdata, 
                member: req.session.sess_valid,
                query : req.query
            }); 

        });

    } catch (err) {

        console.log(err);
        next(); 
        /// the home route is the one place I'll pass to the error handler 
        /// - all other page errors I'll just redirect here

    };

});

module.exports = router;