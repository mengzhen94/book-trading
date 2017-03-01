'use strict';

var GitHubStrategy = require('passport-github').Strategy;
var FaceStrategy = require('passport-facebook').Strategy;
var User = require('../model/user');
var configAuth = require('./auth');

module.exports = function(passport){

	passport.serializeUser(function(user, done){
		done(null, user.id);
	});
	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});

	passport.use(new GitHubStrategy({
		clientID: configAuth.githubAuth.clientID,
		clientSecret: configAuth.githubAuth.clientSecret,
		callbackURL: configAuth.githubAuth.callbackURL
	 },
	    function(Token, refreshToken, profile, done) {
		    process.nextTick(function(){
			    User.findOne({'userId':profile.id}, function(err,user){
				    if(err)
					    return done(err);
				    if(user){
					    return done(null, user);
				    }else{
					    var newUser = new User();

					    newUser.userId = profile.id;
					    newUser.displayName = profile.displayName;
		
					    newUser.save(function(err){
						    if(err)
							    throw err;
						    return done(null, newUser);
					    });
				    }
			    });		
		    });
  	    }
	));

	passport.use(new FaceStrategy({
		clientID: configAuth.facebookAuth.clientID,
		clientSecret: configAuth.facebookAuth.clientSecret,
		callbackURL: configAuth.facebookAuth.callbackURL
	 },
	    function(Token, refreshToken, profile, done) {
		    process.nextTick(function(){
			    User.findOne({'userId':profile.id}, function(err,user){
				    if(err)
					    return done(err);
				    if(user){
					    return done(null, user);
				    }else{
					    var newUser = new User();

					    newUser.userId = profile.id;
					    newUser.displayName = profile.displayName;

					    newUser.save(function(err){
						    if(err)
							    throw err;
						    return done(null, newUser);
					    });
				    }
			    });		
		    });
  	    }
	));

};