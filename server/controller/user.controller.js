'use strict';
const router = require('express').Router();
const Users = require('../model/user');

function getProfile(req, res){
	Users.findById(req.user._id)
		.select('username city state')
		.then(
			user => {
				if(user){
					//console.log("mongo", user);
					res.json(user);
				}
		}
	).catch(err => {
		res.json(err.message);
	});
};

function changeProfile(req, res){
	let update = {};
	Object.keys(req.body).forEach( 
		key => {
			if(req.body[key] !== ''){
				update[key] = req.body[key];
			}
		}
	)
	Users.findOneAndUpdate({_id:req.user._id}, update, {new:true})
		.then(
			user => {
				if(user){
					console.log("user: ",user);
					res.json(user);
				}
		}
	).catch(err => {
		res.json(err.message);
	});
};

function changePassword(req, res){
	let currentPass = req.body.oldpassword;
	let newPass = req.body.newpassword;

	Users.findById({_id:req.user._id})
		.then(
			user => {
				//console.log("user: ", user);
				if(user.validPassword(currentPass)){
					return user;
				}else{
					throw {status: 401, message: "Wrong PassWord!!"}
				}
			})
		.then(
			foundUser => {
				//console.log("foundUser: ", foundUser);
				foundUser.password = foundUser.generateHash(newPass);
				return foundUser.save();
			}
		)
		.then(
			changedUser => {
				//console.log("changedUser: ", changedUser);
				res.json(changedUser);
			}
		)
		.catch(err => {
			if(err.status){
				res.status(err.status).json({err:err.message});
			}else{
				res.json(err.message);
			}
	});
};


module.exports = {
  getProfile,
  changeProfile,
  changePassword
}
