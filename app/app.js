/// installed modules
require('dotenv').config();
const express = require("express");
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const axios = require("axios");

/// app and ports
const app = express();
const APP_PORT = process.env.APP_PORT || 3000;
const API_PORT = process.env.API_PORT || 4000;

/// custom modules
const globalErrHandler = require("./middleware/errorHandler");

/// middleware 
app.set('view engine', 'ejs');
app.use(sessions({
    secret: 'thisisasecret',
    saveUninitialized: false,
    resave: false
    })
);
app.use(express.urlencoded({extended: true})); 

/// routes
const homeRoute = require('./routes/home.js');
app.use('/', homeRoute);
const signupRoute = require('./routes/signup.js');
app.use('/signup', signupRoute);

app.get('/login', (req, res) => {

    res.render('login', {member: req.session.sess_valid}); 

});

app.post('/login', (req, res) => { 

    let username = req.body.username;
    let passwordraw = req.body.passwordraw;

    const checkData = {username, passwordraw};

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    let signupEP = `http://localhost:${API_PORT}/login`; 
    
    axios.post(signupEP, checkData, config)
    .then((response) => {
        console.log(`Login attempt by "${username}"...`);

        if (response.data.respObj) {
            if (!req.session.user_id) req.session.user_id = response.data.respObj.id;
            console.log("...succeeded.");
            res.redirect("/goodlogin");
        } else {
            console.log("...failed - no data from the API.");
            console.log("Response:", response.data);
            res.redirect("/?message=loginfailed"); 
        }

    }).catch((err)=>{

        console.log("Error in login post route: ", err.message);
        res.redirect("/?message=loginbug"); 

    });
    
});

app.get('/goodlogin', (req, res) => {

    req.session.sess_valid = true;
    console.log("logged in");
    res.redirect('/?message=goodlogin'); 

});

app.get('/logout', (req, res) => {

    req.session.destroy();
    console.log("logged out");
    res.redirect('/?message=loggedout');

});

app.get('/membersonly', (req, res)=>{

    if (req.session.sess_valid) {
        res.render('membersonly', {member: req.session.sess_valid, user_id: req.session.user_id });
    } else {
        res.redirect('/?message=unauthorised');
    }

});

app.get("/vinyl", (req, res) => {

    let id = req.query.id;

    let vinylEP = `http://localhost:${API_PORT}/vinyl?id=${id}`;
    
    axios.get(vinylEP).then(results => {
        
        let data = results.data;
 
        if (data.release_id) {
            res.render('vinyl', {data, member: req.session.sess_valid});
        } else {
            console.log("Vinyl route received no release data from the API.");
            console.log("Response:", data);
            res.redirect('/?message=novinyl');
        }

    }).catch(err => {

        console.log("Error in vinyl route: ", err.message);
        res.redirect('/?message=vinylbug');

    });

});

app.get("/collectors", (req, res)=>{

    let collectorsEP = `http://localhost:${API_PORT}/collectors`;

    axios.get(collectorsEP).then((results)=>{

        let data = results.data;
        res.render('collectors', {data, member: req.session.sess_valid});  

    }).catch(err => {

        console.log("Error in collectors route: ", err.message);
        res.redirect('/?message=collectorsbug');

    });

});

app.get("/collector", (req, res)=>{

    let id = req.query.id;
    let sessionuserid = req.session.user_id;

    let collectorEP = `http://localhost:${API_PORT}/collector?id=${id}&sessionuserid=${sessionuserid}`;

    axios.get(collectorEP).then((results)=>{

        let data = results.data;

        if (data.user_id) {
            res.render('collector', {data, member: req.session.sess_valid});  
        } else {
            console.log("Collector route received no user data from the API.")
            console.log("Response:", data);
            res.redirect('/collectors');
        }

    }).catch(err => {

        console.log("Error in collector route: ", err.message);
        res.redirect('/collectors');

    });

});

app.use(globalErrHandler);

const server = app.listen(APP_PORT, () => {
    console.log(`App started at http://localhost:${server.address().port}/`);
}); 