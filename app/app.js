/// installed modules
require('dotenv').config();
const express = require("express");
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const axios = require("axios");
const fs = require('fs');
// const bootstrap = require('bootstrap');

/// app and ports 
const app = express();
const APP_PORT = process.env.APP_PORT || 3000;

/// middleware 
const ninetyDays = 1000 * 60 * 60 * 24 * 90;
const globalErrHandler = require("./middleware/errorHandler");
app.use(express.static('static'));
app.set('view engine', 'ejs');
app.use(sessions({
    secret: 'fabsolutely abulous',
    saveUninitialized: false,
    // cookie: { 
    //     maxAge: ninetyDays,
    //     secure: true, // requires HTTPS
    //     httpOnly: true, // prevents JS access
    //     sameSite: 'Lax' // match domain
    // },
    resave: false
    })
);
app.use(express.urlencoded({extended: true})); 
// app.use(cookieParser());
app.use(function(req, res, next) {
    res.locals.user_id = req.session.user_id;
    res.locals.sess_valid = req.session.sess_valid;
    next();
}); // exposes session to ejs templates

/// route handler
const routeFiles = fs.readdirSync('./routes').filter(file => (
    file.endsWith('.js') && !file.startsWith('_')
));
for (const file of routeFiles) {
	const route = require(`./routes/${file}`);
    routePath = file.slice(0,-3);
    if (file=='home.js') routePath="";
	app.use(`/${routePath}`, route);
}
console.log("Routes:", routeFiles)
 
/// routes
// const home = require('./routes/home.js');
// app.use('/', home);
// const vinyls = require('./routes/vinyls.js');
// app.use('/vinyls', vinyls);
// const vinyl = require('./routes/vinyl.js');
// app.use('/vinyl', vinyl);
// const collectors = require('./routes/collectors.js');
// app.use('/collectors', collectors);
// const collector = require('./routes/collector.js');
// app.use('/collector', collector);
// const signup = require('./routes/signup.js');
// app.use('/signup', signup);
// const login = require('./routes/login.js');
// app.use('/login', login);
// const goodlogin = require('./routes/goodlogin.js');
// app.use('/goodlogin', goodlogin);
// const logout = require('./routes/logout.js');
// app.use('/logout', logout);
// const me = require('./routes/me.js');
// app.use('/me', me);
// const ihaveone = require('./routes/ihaveone.js');
// app.use('/ihaveone', ihaveone);
// const editcopy = require('./routes/editcopy.js');
// app.use('/editcopy', editcopy);
// const deletecopy = require('./routes/deletecopy.js');
// app.use('/deletecopy', deletecopy);
// const addjukebox = require('./routes/addjukebox.js');
// app.use('/addjukebox', addjukebox);
// const editjukebox = require('./routes/editjukebox.js');
// app.use('/editjukebox', editjukebox);
// const deletejukebox = require('./routes/deletejukebox.js');
// app.use('/deletejukebox', deletejukebox); 
// const popjukebox = require('./routes/popjukebox.js');
// app.use('/popjukebox', popjukebox);
// const deleteselection = require('./routes/deleteselection.js');
// app.use('/deleteselection', deleteselection);
// const jukeboxes = require('./routes/jukeboxes.js');
// app.use('/jukeboxes', jukeboxes);
// const jukebox = require('./routes/jukebox.js');
// app.use('/jukebox', jukebox);
// const addreview = require('./routes/addreview.js');
// app.use('/addreview', addreview);
// const searchvinyls = require('./routes/searchvinyls.js');
// app.use('/searchvinyls', searchvinyls);
// const togglelike = require('./routes/togglelike.js');
// app.use('/togglelike', togglelike);

/// more middleware
app.use(globalErrHandler);

/// server
const server = app.listen(APP_PORT, () => {
    console.log(`App started at http://localhost:${server.address().port}/`);
}); 