/// installed modules
require('dotenv').config();
const express = require("express");
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const axios = require("axios");

/// app and ports 
const app = express();
const APP_PORT = process.env.APP_PORT || 3000;

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
const vinylsRoute = require('./routes/vinyls.js');
app.use('/vinyls', vinylsRoute);
const vinylRoute = require('./routes/vinyl.js');
app.use('/vinyl', vinylRoute);
const collectorsRoute = require('./routes/collectors.js');
app.use('/collectors', collectorsRoute);
const collectorRoute = require('./routes/collector.js');
app.use('/collector', collectorRoute);
const signupRoute = require('./routes/signup.js');
app.use('/signup', signupRoute);
const loginRoute = require('./routes/login.js');
app.use('/login', loginRoute);
const goodloginRoute = require('./routes/goodlogin.js');
app.use('/goodlogin', goodloginRoute);
const logoutRoute = require('./routes/logout.js');
app.use('/logout', logoutRoute);
const membersonlyRoute = require('./routes/membersonly.js');
app.use('/membersonly', membersonlyRoute);

app.use(globalErrHandler);

const server = app.listen(APP_PORT, () => {
    console.log(`App started at http://localhost:${server.address().port}/`);
}); 