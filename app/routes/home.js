const express = require("express");
const router = express.Router();
const axios = require('axios');

const APP_PORT = process.env.APP_PORT || 3000;
const API_PORT = process.env.API_PORT || 4000;

router.get('/', (req, res, next)=> { 

    try {

        let from = req.headers.referer; // can use this to display page differently 
        // console.log(sess_obj);

        let vinylsEP = `http://localhost:${API_PORT}/vinyls`;
        // TODO top n vinyls

        axios.get(vinylsEP).then((response)=>{
            let data = response.data.data;
            res.render('home', {titletext : 'vinyls', data, member: req.session.sess_valid});  
        });

    } catch (err) {

        console.log(err);
        next(); // sends control flow to next bit of code
        // TODO throws error - next not defined

    }

});

module.exports = router;