'use strict';
const router = require('express').Router();

const Users = require('../model/user');
const Book = require('../model/book');
const Request = require('../model/request');


function addRequest(req, res){
    let userID = req.user._id;
    console.log("userID: ",userID);
    let reqBook = req.body;
    console.log("reqBook: ",reqBook);


};

function getMybooks(req, res){
    //console.log("0!!");
    let userID = req.user._id;
    //console.log("userID: ", userID);
    let getBooks = [];
    Book.find({owner: userID})
        .then(books => {
            //console.log("books: ", books);
            if(books){
                res.json(books);
            }else{
                res.json();
            }
        })
        .catch(err => {
            res.json({err:err.message});
        })
};

function removeBook(req, res){
    let userID = req.user._id;
    console.log("req.body: ", req.body);
    let bookID = req.body._id;

    Book.remove({_id: bookID, owner: userID})
        .then(result => {
            return res.json();
        })
        .catch(err => {
            res.json({err:err.message});
        })
};




module.exports = {
  addRequest,
  getMybooks,
  removeBook,
}
