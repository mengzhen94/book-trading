'use strict';
const router = require('express').Router();
const Users = require('../model/user');

var books = require('google-books-search');

function search(req, res){
    let keywords = req.query.keyword;
	books.search(keywords, (error, results) => {
        if ( !error ) {
            console.log(results);
            res.json(results);
        } else {
            res.json({err:err.message});
        }
    });
};



module.exports = {
  search,
}
