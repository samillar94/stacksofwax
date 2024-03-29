const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.get('/', (req, res)=> { 

    try {

        let release_id = req.query.id;
        let user_id = req.session.user_id;

        let vinylEP = `http://localhost:${API_PORT}/vinyl?release_id=${release_id}`;
        let copiesEP = `http://localhost:${API_PORT}/myvinyls?release_id=${release_id}&user_id=${user_id}`;

        axios.get(vinylEP)
        .then((results1) => {
            
            let vinyldata = results1.data.goodstuff;
                 
            if (results1.data.badstuff) console.log(results1.data.badstuff);

            axios.get(copiesEP)
            .then((results2) => {
                
                if (results2.data.goodstuff[0]) {
                    vinyldata.copies = results2.data.goodstuff[0].copies;
                };
                
                if (results2.data.badstuff) console.log(results2.data.badstuff);

                if (vinyldata) {
                    res.render('vinyl', { 
                        title: `${vinyldata.releasename} - Vinyl`, 
                        vinyldata
                    });
                } else {
                    console.log("Vinyl route received no release data from the API.");
                    res.redirect('/?message=novinyl');
                }                

            }); 
    
        }); 

    } catch (err) {

        console.log("Error in vinyl GET route: ", err.message);
        res.redirect('/?message=vinylbug'); 

    };

});

module.exports = router;