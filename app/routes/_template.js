const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.get('/', (req, res, next)=> { 

    try {

        /// code from inside app.get here (pull axios.get.then.catch into catch block below)

    } catch (err) {

        console.log(err);
        next(); /// sends control flow to next bit of code

    }

});

module.exports = router;