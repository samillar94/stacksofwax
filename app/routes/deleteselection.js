const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.post('/', (req, res)=> { 

    try {

        let from = req.headers.referer; 

        let { jukebox_id, copy_id } = req.body;

        console.log(jukebox_id, copy_id);

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const postdata = { jukebox_id, copy_id };

        let deleteselectionEP = `http://localhost:${API_PORT}/deleteselection`;

        axios.post(deleteselectionEP, postdata, config)
        .then((results)=>{

            if (from.includes('http://localhost:3000/me')) res.redirect('me'); 
            // if (from == 'http://localhost:3000/vinyl') res.redirect('vinyl'); /// need to sort this out
        });

    } catch (err) {

        console.log("Error in deleteselection POST route:", err.message);
        res.redirect("/?message=deleteselectionbug");

    };

});

module.exports = router;