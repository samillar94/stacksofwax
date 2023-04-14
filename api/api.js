require('dotenv').config();
const express = require("express");

const app = express();
const API_PORT = process.env.API_PORT || 4000;

/// their middleware
app.use(express.urlencoded({extended: true}));

/// my middleware
const connection = require("./connection.js")
const globalErrHandler = require("./middleware/errorHandler");

/// db connection
connection.getConnection((err)=>{
    if(err) return console.log(err.message);
    console.log("The API has connected to the stacksofwax database.");
});

/// routes
const vinylsRoute = require('./routes/vinyls.js');
app.use('/vinyls', vinylsRoute);
const vinylRoute = require('./routes/vinyl.js');
app.use('/vinyl', vinylRoute);
const signupRoute = require('./routes/signup.js');
app.use('/signup', signupRoute);
const loginRoute = require('./routes/login.js');
app.use('/login', loginRoute);
const collectorsRoute = require('./routes/collectors.js');
app.use('/collectors', collectorsRoute);
const collectorRoute = require('./routes/collector.js');
app.use('/collector', collectorRoute);

app.use(globalErrHandler);

const server = app.listen(API_PORT, () => {
    console.log(`API started at http://localhost:${server.address().port}/`);
});