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
    res.render('loginpage', {member: false}); 
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

        /// TODO use data when we see what it is
        console.log(response.data);
        let session_obj = req.session;
        if (!session_obj.user_id) session_obj.user_id = response.data.respObj.id;
        res.redirect("/goodlogin");

    }).catch((err)=>{

        console.log(err.message);
        res.redirect("/"); 

    });
    
});

app.get('/goodlogin', (req, res) => {
    let session_obj = req.session;
    session_obj.sess_valid = true;
    console.log("logged in");
    res.redirect('/'); 
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    console.log("logged out");
    res.redirect('/');
});

app.get('/membersonly', (req, res)=>{
    let session_obj = req.session;
    if (session_obj.sess_valid) {
        console.log(session_obj.user_id)
        res.render('membersonly', {member: true, user_id: session_obj.user_id });
    } else {
        res.redirect('/');
    }
});

app.use(globalErrHandler);

/// const server = 
app.listen(APP_PORT, () => {
    console.log(`App started at http://localhost:${APP_PORT}`);
}); 