const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.post('/', (req, res)=> { 

    try {

        let from = req.headers.referer; 

        let { copy_id, ownercomment } = req.body;

        console.log(copy_id, ownercomment);

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const postdata = {copy_id, ownercomment};

        let editcopyEP = `http://localhost:${API_PORT}/editcopy`;

        axios.post(editcopyEP, postdata, config)
        .then((results)=>{

            if (from.includes('http://localhost:3000/me')) res.redirect('me'); 
            // if (from == 'http://localhost:3000/vinyl') res.redirect('vinyl'); /// need to sort this out
    
        });

    } catch (err) {

        console.log("Error in editcopy POST route:", err.message);
        res.redirect("/?message=editcopybug");

    };

});

module.exports = router;