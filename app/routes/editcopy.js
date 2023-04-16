const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.post('/', (req, res)=> { 

    try {

        let from = req.headers.referer; 

        let { owned_release_id, ownercomment, toupdate, todelete } = req.body;

        console.log(owned_release_id, ownercomment, toupdate, todelete);

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        if (toupdate) {

            const postdata = {owned_release_id, ownercomment};

            let updatecopyEP = `http://localhost:${API_PORT}/updatecopy`;

            axios.post(updatecopyEP, postdata, config)
            .then((results)=>{

                if (from == 'http://localhost:3000/me') res.redirect('me'); 
                // if (from == 'http://localhost:3000/vinyl') res.redirect('vinyl'); /// need to sort this out
        
            });

        } else if (todelete) {

            const postdata = {owned_release_id};

            let deletecopyEP = `http://localhost:${API_PORT}/deletecopy`;

            axios.post(deletecopyEP, postdata, config)
            .then((results)=>{
 
                if (from == 'http://localhost:3000/me') res.redirect('me'); 
                // if (from == 'http://localhost:3000/vinyl') res.redirect('vinyl'); /// need to sort this out
            });
 
        } 

        /// code from inside app.get here (pull axios.get.then.catch into catch block below)

    } catch (err) {

        console.log("Error in editcopy POST route:", err.message);
        res.redirect("/?message=editcopybug");

    };

});

module.exports = router;