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
const vinyls = require('./routes/vinyls.js');
app.use('/vinyls', vinyls);
const vinyl = require('./routes/vinyl.js');
app.use('/vinyl', vinyl);
const signup = require('./routes/signup.js');
app.use('/signup', signup);
const login = require('./routes/login.js');
app.use('/login', login);
const collectors = require('./routes/collectors.js');
app.use('/collectors', collectors);
const collector = require('./routes/collector.js');
app.use('/collector', collector);
const ihaveone = require('./routes/ihaveone.js');
app.use('/ihaveone', ihaveone);
const myvinyls = require('./routes/myvinyls.js');
app.use('/myvinyls', myvinyls);
const updatecopy = require('./routes/updatecopy.js');
app.use('/updatecopy', updatecopy);

app.use(globalErrHandler);

const server = app.listen(API_PORT, () => {
    console.log(`API started at http://localhost:${server.address().port}/`);
});