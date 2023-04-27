const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.get('/', (req, res)=> { 

    try {

        /// code 

    } catch (err) {

        console.log("Error in template GET route:", err.message);
        res.redirect("/?message=templatebug");

    };

});

router.post('/', (req, res)=> { 

    try {

        /// code 

    } catch (err) {

        console.log("Error in template POST route:", err.message);
        res.redirect("/?message=templatebug");

    };

});

module.exports = router;