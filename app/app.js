const express = require("express");
const app = express();
const APP_PORT = process.env.APP_PORT || 3000;
const API_PORT = process.env.API_PORT || 4000;
const axios = require("axios");

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));

//app.get...