const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.get('/', (req, res)=> { 

    try {

        req.session.sess_valid = true;
        console.log("logged in");
        res.redirect('/me?message=goodlogin'); 

    } catch (err) {

        console.log("Error in goodlogin GET route:", err.message);
        res.redirect("/?message=goodloginbug");

    };

});

module.exports = router;