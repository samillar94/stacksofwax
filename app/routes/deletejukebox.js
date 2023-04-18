const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.post('/', (req, res)=> { 

    try {

        let from = req.headers.referer; 

        let { jukebox_id } = req.body;

        console.log("Jukebox",jukebox_id,"deleted");

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const postdata = { jukebox_id };

        let deletejukeboxEP = `http://localhost:${API_PORT}/deletejukebox`;

        axios.post(deletejukeboxEP, postdata, config)
        .then((results)=>{

            if (from.includes('http://localhost:3000/me')) res.redirect('me'); 
            // if (from == 'http://localhost:3000/jukeboxes') res.redirect('jukeboxes'); /// need to sort this out
        });

    } catch (err) {

        console.log("Error in deletejukebox POST route:", err.message);
        res.redirect("/?message=deletejukeboxbug");

    };

});

module.exports = router;