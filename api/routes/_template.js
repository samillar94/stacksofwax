const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.get('/', (req, res)=> { 

    try {

        /// code from inside app.get here

    } catch (err) {

        console.log("Error in template GET route:", err.message);
        res.json(err);

    };

});

router.post('/', (req, res)=> { 

    try {

        /// code from inside app.post here

    } catch (err) {

        console.log("Error in template POST route:", err.message);
        res.json(err);

    };

});

module.exports = router;