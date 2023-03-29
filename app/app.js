const express = require("express");
const axios = require("axios");

const app = express();
const APP_PORT = process.env.APP_PORT || 3000;
const API_PORT = process.env.API_PORT || 4000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));

let testEP = `http://localhost:${API_PORT}/vinyls`;
    
axios.get(testEP).then((response)=>{
    console.log(response.data.data);  

});

const server = app.listen(APP_PORT, () => {
    console.log(`App started on port ${server.address().port}`);
});