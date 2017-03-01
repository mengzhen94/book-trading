'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
	userId: String,
	displayName: String,
	city: String,
	state: String
});

module.exports = mongoose.model('User', User);

