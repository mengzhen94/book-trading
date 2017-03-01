'use strict';
var express = require("express"),
	routes = require("./server/routes/index.js"),
	mongoose = require("mongoose"),
	passport = require('passport'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
    path = require('path');;

var app = express();
require('dotenv').load();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI);

app.use(bodyParser.urlencoded())

// Point static path to dist => angular
app.use(express.static(path.join(__dirname, 'dist')));

/*
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/common', express.static(process.cwd() + '/app/common'));
*/

app.use(session({
	secret:'secretBook',
	resave:false,
	saveUnintialized:true
}));

require('./server/config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(8080, function(){
	console.log("Listening on port" + port + '...');
});