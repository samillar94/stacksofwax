const express = require("express");
const router = express.Router();
const axios = require('axios');

const APP_PORT = process.env.APP_PORT || 3000;
const API_PORT = process.env.API_PORT || 4000;

/// custom HTTP response codes for redirects
const CHRC_login = 309;
const CHRC_logout = 389;
const CHRC_failed = 399;

router.get('/', (req, res)=>{
    //get at the session object and store it in a local variable
    let sess_obj = req.session;
    console.log(sess_obj);
    res.render('signup', {member: false});
});

router.post('/', (req, res, next)=> { 

    try {

        //get at the session object and store it in a local variable
        let sess_obj = req.session;
        console.log(sess_obj);

        let username = req.body.username;
        let passwordraw = req.body.passwordraw;

        const insertData = {username, passwordraw};
    
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    
        let signupEP = `http://localhost:${API_PORT}/signup`;
        let vinylsEP = `http://localhost:${API_PORT}/vinyls`;
        
        axios.post(signupEP, insertData, config)
        .then((response) => {

            let insertedid = response.data.respObj.id; 
            let resmessage = response.data.respObj.message;

            console.log(`${resmessage}. INSERTED user_id ${insertedid}`);

            axios.get(vinylsEP).then((response2)=>{
                res.redirect("/login");
                // let data = response2.data.data;
                // res.render('home', {titletext : 'vinyls say signup successful', data});  
            });

        }).catch((err)=>{ 

            console.log(err.message);

            axios.get(vinylsEP).then((response2)=>{
                res.redirect("/");
                // let data = response2.data.data;
                // res.render('home', {titletext : 'vinyls say signup unsuccessful', data});  
            });

        });



    } catch (err) {
        
        console.log(err.message);
        next(); // sends control flow to next bit of code
        // TODO throws error - next not defined

    }

});

module.exports = router;