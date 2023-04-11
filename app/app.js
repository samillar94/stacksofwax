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

/// custom HTTP response codes for redirects
const CHRC_login = 309;
const CHRC_logout = 389;
const CHRC_failed = 399;

/// custom modules
const globalErrHandler = require("./middleware/errorHandler");

app.set('view engine', 'ejs');

//middleware 
app.use(sessions({
    secret: 'thisisasecret',
    saveUninitialized: false,
    resave: false
    })
);
app.use(express.urlencoded({extended: true}));



/// test
let testEP = `http://localhost:${API_PORT}/vinyls`;
axios.get(testEP).then((response)=>{
    console.log(response.data.data[0]);  
});

/// routes
const homeRoute = require('./routes/home.js');
app.use('/', homeRoute);
const signupRoute = require('./routes/signup.js');
app.use('/signup', signupRoute);

app.get('/loginpage', (req, res) => {
    res.render('login', {member: false}); 
});

app.get('/login', (req, res) => {
    let sessionObj = req.session;
    sessionObj.sess_valid = true;
    console.log("logging in?");
    res.redirect('/'); 
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    console.log("logging out?");
    res.redirect('/');
});

app.get('/membersonly', (req, res)=>{
    let session_obj = req.session;
    if (session_obj.sess_valid) {
        res.render('membersonly', {member: true});
    } else {
        res.redirect('/');
    }
});

app.use(globalErrHandler);

// const server = 
app.listen(APP_PORT, () => {
    console.log(`App started at http://localhost:${APP_PORT}`);
}); 