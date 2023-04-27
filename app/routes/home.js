const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.get('/', (req, res, next)=> {

    try {

        let vinylsEP = `http://localhost:${API_PORT}/vinyls`;

        axios.get(vinylsEP)
        .then((results)=>{
            
            let vinylsdata = results.data.goodstuff;
            res.render('home', {
                title: 'Vinyls', 
                vinylsdata
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