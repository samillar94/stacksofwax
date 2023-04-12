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

    res.render('login', {member: false}); 

});

app.post('/login', (req, res) => { 

    console.log("logging in?");

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

        console.log(response.data);
        if (!req.session.user_id) req.session.user_id = response.data.respObj.id;
        res.redirect("/goodlogin");

    }).catch((err)=>{

        console.log(err.message);
        res.redirect("/"); 

    });
    
});

app.get('/goodlogin', (req, res) => {
    req.session.sess_valid = true;
    console.log("logged in");
    res.redirect('/'); 
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    console.log("logged out");
    res.redirect('/');
});

app.get('/membersonly', (req, res)=>{
    if (req.session.sess_valid) {
        res.render('membersonly', {member: req.session.sess_valid, user_id: req.session.user_id });
    } else {
        res.redirect('/');
    }
});

app.get("/vinyl", (req, res) => {

    let id = req.query.id;

    let vinylEP = `http://localhost:${API_PORT}/vinyl?id=${id}`;
    
    axios.get(vinylEP).then(results => {
        
        let data = results.data;
        res.render('vinyl', {data, member: req.session.sess_valid});

    }).catch(err => {
        console.log("Error: ", err.message);
    });

});

app.use(globalErrHandler);

/// const server = 
app.listen(APP_PORT, () => {
    console.log(`App started at http://localhost:${APP_PORT}/`);
}); 