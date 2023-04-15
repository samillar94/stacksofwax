const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.get('/', (req, res)=> { 

    try {

        if (req.session.sess_valid) {
            res.render('membersonly', {title: 'Shhhh!', member: req.session.sess_valid, user_id: req.session.user_id });
        } else {
            res.redirect('/?message=unauthorised');
        }

    } catch (err) {

        console.log("Error in membersonly GET route:", err.message);
        res.redirect("/?message=membersonlybug");

    };

});

module.exports = router;