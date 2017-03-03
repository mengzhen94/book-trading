'use strict';
const router = require('express').Router();
const Users = require('../model/user');

function getProfile(req, res){
	console.log("req", req.user);
	Users.findById(req.user._id)
		.select('username city state')
		.then(
			user => {
				if(user){
					console.log("mongo", user);
					res.json(user);
				}
		}
	).catch(err => {
		res.json(err.message);
	});
};



module.exports = {
  getProfile
  
}
