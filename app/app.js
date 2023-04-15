/// installed modules
require('dotenv').config();
const express = require("express");
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const axios = require("axios");

/// app and ports 
const app = express();
const APP_PORT = process.env.APP_PORT || 3000;

/// middleware 
const globalErrHandler = require("./middleware/errorHandler");
app.use(express.static('static'));
app.set('view engine', 'ejs');
app.use(sessions({
    secret: 'fabsolutely abulous',
    saveUninitialized: false,
    resave: false
    })
);
app.use(express.urlencoded({extended: true})); 
 
/// routes
const home = require('./routes/home.js');
app.use('/', home);
const vinyls = require('./routes/vinyls.js');
app.use('/vinyls', vinyls);
const vinyl = require('./routes/vinyl.js');
app.use('/vinyl', vinyl);
const collectors = require('./routes/collectors.js');
app.use('/collectors', collectors);
const collector = require('./routes/collector.js');
app.use('/collector', collector);
const signup = require('./routes/signup.js');
app.use('/signup', signup);
const login = require('./routes/login.js');
app.use('/login', login);
const goodlogin = require('./routes/goodlogin.js');
app.use('/goodlogin', goodlogin);
const logout = require('./routes/logout.js');
app.use('/logout', logout);
const membersonly = require('./routes/membersonly.js');
app.use('/membersonly', membersonly);
const ihaveone = require('./routes/ihaveone.js');
app.use('/ihaveone', ihaveone);

/// more middleware
app.use(globalErrHandler);

/// server
const server = app.listen(APP_PORT, () => {
    console.log(`App started at http://localhost:${server.address().port}/`);
}); 