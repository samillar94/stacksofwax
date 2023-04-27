const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.get('/', (req, res)=> { 

    try {

        res.render('login', {
            title: 'Login', 
            member: req.session.sess_valid,
            query: req.query
        }); 

    } catch (err) {

        console.log("Error in login GET route:", err.message);
        res.redirect("/?message=loginbug");

    };

});

router.post('/', (req, res)=> { 

    try {

        let username = req.body.username;
        let passwordraw = req.body.passwordraw;
    
        const checkdata = {username, passwordraw};
    
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
    
        let signupEP = `http://localhost:${API_PORT}/login`; 
        
        axios.post(signupEP, checkdata, config)
        .then((results) => {

            console.log(`Login attempt by "${username}"...`);

            let goodstuff = results.data.goodstuff;
    
            if (goodstuff) {
                req.session.user_id = goodstuff.user_id; 
                console.log("...succeeded.");
                res.redirect("/goodlogin");
            } else {
                console.log("...failed - no data from the API.");
                console.log("Response:", results.data.badstuff);
                res.redirect("/?message=loginfailed"); 
            };
    
        });    

    } catch (err) {

        console.log("Error in login POST route:", err.message);
        res.redirect("/?message=loginbug");

    };

});

module.exports = router;