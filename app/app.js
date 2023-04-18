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
const me = require('./routes/me.js');
app.use('/me', me);
const ihaveone = require('./routes/ihaveone.js');
app.use('/ihaveone', ihaveone);
const editcopy = require('./routes/editcopy.js');
app.use('/editcopy', editcopy);
const deletecopy = require('./routes/deletecopy.js');
app.use('/deletecopy', deletecopy);
const addjukebox = require('./routes/addjukebox.js');
app.use('/addjukebox', addjukebox);
const editjukebox = require('./routes/editjukebox.js');
app.use('/editjukebox', editjukebox);
const deletejukebox = require('./routes/deletejukebox.js');
app.use('/deletejukebox', deletejukebox); 
const jukeboxes = require('./routes/jukeboxes.js');
app.use('/jukeboxes', jukeboxes);

/// more middleware
app.use(globalErrHandler);

/// server
const server = app.listen(APP_PORT, () => {
    console.log(`App started at http://localhost:${server.address().port}/`);
}); 