const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.get('/', (req, res)=> { 

    try {

        let collectorsEP = `http://localhost:${API_PORT}/collectors`;

        axios.get(collectorsEP)
        .then((results)=>{
    
            let collectorsdata = results.data.goodstuff;

            if (results.data.badstuff) console.log(results.data.badstuff)
            res.render('collectors', {
                title: 'Collectors', 
                collectorsdata: collectorsdata, 
                member: req.session.sess_valid,
                query: req.query
            });  
    
        });

    } catch (err) {

        console.log("Error in collectors route: ", err.message);
        res.redirect('/?message=collectorsbug');

    };

});

module.exports = router;