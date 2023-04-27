const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.get('/', (req, res)=>{

    res.render('signup', {
        title: 'Sign up', 
        member: false
    });

});

router.post('/', (req, res)=> { 

    try {

        let username = req.body.username;
        let passwordraw = req.body.passwordraw1;

        const insertdata = {username, passwordraw};
    
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
    
        let signupEP = `http://localhost:${API_PORT}/signup`;
        
        axios.post(signupEP, insertdata, config)
        .then((results) => {

            let goodstuff = results.data.goodstuff;

            if (goodstuff) {

                req.session.user_id = goodstuff.insertId;
                console.log(`${goodstuff.apimessage}. Inserted user_id ${goodstuff.insertId}.`);
                res.redirect("/goodlogin");

            } else {

                console.log("Signup failed:", results.data.badstuff);
                res.redirect("/?message=signupfailed");

            };

        });

    } catch (err) {
        
        console.log("Error in signup POST route:", err.message);
        res.redirect("/?message=signupbug");

    };

});

module.exports = router;