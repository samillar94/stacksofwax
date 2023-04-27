const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.get('/', (req, res)=> { 

    try {

        req.session.destroy(); 
        console.log("logged out");
        res.redirect('/?message=loggedout');

    } catch (err) {

        console.log("Error in logout route:", err.message);
        res.redirect("/?message=logoutbug");

    };

});

module.exports = router;