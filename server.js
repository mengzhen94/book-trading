'use strict';
const express = require("express"),
			mongoose = require("mongoose"),
			passport = require('passport'),
			session = require('express-session'),
			bodyParser = require('body-parser'),
			path = require('path');

var app = express();
require('dotenv').load();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGO_URI);

let connection = mongoose.connection;
connection.on('error',()=>{
  console.log(`Error on connecting`);
});
connection.once('open',()=>{
  console.log(`My app is using `);
});
connection.on('disconnected',()=>{
  console.log(`Successfully disconnected from `);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Point static path to dist => angular
app.use(express.static(path.join(__dirname, 'dist')));

app.use(session({
	secret:'secretBook',
	resave:false,
	saveUnintialized:true
}));

app.use(passport.initialize());
app.use(passport.session());

require('./server/config/passport');

let routes = require('./server/routes/route');

app.use('/api', routes);


var port = process.env.PORT || 8080;
app.listen(port, function(){
	console.log("Listening on port" + port + '...');
});