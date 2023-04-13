const express = require("express");
const router = express.Router();
const axios = require('axios');

const APP_PORT = process.env.APP_PORT || 3000;
const API_PORT = process.env.API_PORT || 4000;

router.get('/', (req, res)=>{

    res.render('signup', {member: false});

});

router.post('/', (req, res, next)=> { 

    try {

        let username = req.body.username;
        let passwordraw = req.body.passwordraw1;

        const insertData = {username, passwordraw};
    
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
    
        let signupEP = `http://localhost:${API_PORT}/signup`;
        
        axios.post(signupEP, insertData, config)
        .then((response) => {

            let data = response.data;

            if (data.respObj) {

                let insertedid = data.respObj.id; 
                let resmessage = data.respObj.message;

                req.session.user_id = insertedid;

                console.log(`${resmessage}. Inserted user_id ${insertedid}.`);
                res.redirect("/goodlogin");

            } else {

                console.log("Signup failed:", data.sqlMessage);
                res.redirect("/?message=signupfailed");

            };

        });

    } catch (err) {
        
        console.log("Error in signup route:", err.message);
        res.redirect("/?message=signupbug");

    };

});

module.exports = router;