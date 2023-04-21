require('dotenv').config();
const express = require("express");

const app = express();
const API_PORT = process.env.API_PORT || 4000;

/// their middleware
app.use(express.urlencoded({extended: true}));

/// my middleware
const connection = require("./connection.js");
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
const popjukebox = require('./routes/popjukebox.js');
app.use('/popjukebox', popjukebox);
const deleteselection = require('./routes/deleteselection.js');
app.use('/deleteselection', deleteselection);
const jukeboxes = require('./routes/jukeboxes.js');
app.use('/jukeboxes', jukeboxes);
const jukebox = require('./routes/jukebox.js');
app.use('/jukebox', jukebox);
const jukevinyls = require('./routes/jukevinyls.js');
app.use('/jukevinyls', jukevinyls);
const addreview = require('./routes/addreview.js');
app.use('/addreview', addreview);
const reviews = require('./routes/reviews.js');
app.use('/reviews', reviews);
const searchvinyls = require('./routes/searchvinyls.js');
app.use('/searchvinyls', searchvinyls);


app.use(globalErrHandler);

const server = app.listen(API_PORT, () => {
    console.log(`API started at http://localhost:${server.address().port}/`);
});