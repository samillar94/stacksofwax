/// imports
require('dotenv').config();
const express = require("express");
const sessions = require('express-session');
const fs = require('fs');
// const cookieParser = require('cookie-parser');

/// app and ports 
const app = express();
const APP_PORT = process.env.APP_PORT || 3000;

/// their middleware 
app.use(express.static('static'));
app.set('view engine', 'ejs');
// const ninetyDays = 1000 * 60 * 60 * 24 * 90;
app.use(sessions({
    secret: process.env.SESSIONS_SECRET,
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

/// my middleware
app.use((req, res, next) => {
    res.locals.user_id = req.session.user_id;
    res.locals.sess_valid = req.session.sess_valid;
    next();
}); /// exposes session to ejs templates
const globalErrHandler = require("./middleware/errorHandler");

/// route handler
const routeFiles = fs.readdirSync('./routes')
    .filter(file => ( file.endsWith('.js') && !file.startsWith('_') ));
for (const file of routeFiles) {
	const route = require(`./routes/${file}`);
    routePath = file.slice(0,-3);
    if (file=='home.js') routePath="";
	app.use(`/${routePath}`, route);
}
// console.log("Routes:", routeFiles);
 
/// more middleware
app.use(globalErrHandler);

/// server
const server = app.listen(APP_PORT, () => {
    console.log(`App started at http://localhost:${server.address().port}/`);
}); 