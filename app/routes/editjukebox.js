const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.post('/', (req, res)=> { 

    try {

        let from = req.headers.referer; 

        let { jukebox_id, jukeboxname, jukeboxdesc, jukeboximageurl } = req.body;

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const postdata = { jukebox_id, jukeboxname, jukeboxdesc, jukeboximageurl };

        let editjukeboxEP = `http://localhost:${API_PORT}/editjukebox`; 

        axios.post(editjukeboxEP, postdata, config)
        .then((results)=>{

            if (from.includes('http://localhost:3000/me')) res.redirect('me'); 
            // if (from == 'http://localhost:3000/jukeboxes') res.redirect('jukeboxes'); /// need to sort this out
    
        });

    } catch (err) {

        console.log("Error in editjukebox POST route:", err.message);
        res.redirect("/?message=editjukeboxbug");

    };

});

module.exports = router;