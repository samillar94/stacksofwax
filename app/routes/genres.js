const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.get('/', (req, res)=> {

    try {

        let genresEP = `http://localhost:${API_PORT}/genres`;

        axios.get(genresEP)
        .then((results)=>{
            
            let genres = results.data.goodstuff;
            res.render('genres', {
                title: 'Genres', 
                genres
            }); 

        });
 
    } catch (err) {

        console.log("Error in genres GET route:", err.message);
        res.redirect("/?message=genresbug");

    };

});

module.exports = router;