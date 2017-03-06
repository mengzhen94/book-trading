'use strict';
const router = require('express').Router();

const Users = require('../model/user');
const Book = require('../model/book');
const UserBook = require('../model/userbook');

const books = require('google-books-search');


function search(req, res){
    let keywords = req.query.keyword;
	books.search(keywords, (error, results) => {
        if ( !error ) {
            //console.log(results);
            res.json(results);
        } else {
            res.json({err:err.message});
        }
    });
};

function addBook(req, res){
    let userID = req.user._id;
    let reqBook = req.body;
    reqBook['owner'] = userID;
    let newbook = new Book(req.body);
    console.log("newbook: ", newbook);

    Book.create(newbook)
     .then(book => {
        res.json(201, book);
    })
    .catch(err => {
        res.json({err:err.message});
    });

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

/*
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

*/
function removeBook(req, res){
    let userID = req.user._id;
    console.log("req.body: ", req.body);
    let bookID = req.body._id;

    Book.findOne({_id: bookID, owner: userID})
        .then(book => {
            if(book.requested === false){
                Book.remove({_id: bookID, owner: userID})
                    .then(result => {
                        res.json();
                    })     
            }else{
                res.send(403);
            }
        })
        .catch(err => {
            res.json({err:err.message});
        })
};


function getAllBooks(req, res){
    Book.find()
        .then(result => {
            if(result){
                res.json(result);
            }else{
                res.json();
            }
        })
        .catch(err => {
            res.json({err:err.message});
        })
}



module.exports = {
  search,
  addBook,
  getMybooks,
  removeBook,
  getAllBooks,
}
