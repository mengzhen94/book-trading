'use strict';
const router = require('express').Router();
var async = require('async');

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
    console.log("req.body: ", req.body);
    let newbook = new Book(req.body);
    let newbookId = req.body.id;
     console.log("newbook: ", newbook);
    Book.findOne({id: newbookId})
        .then(book => {
            if(book){
                return book;
            }else{
                return newbook.save();
            }        
        })
        .then(newbook => {
            let newbookId = newbook._id;
            return UserBook.findOne({bookId: newbook._id});
        })
        .then(userbook => {
            if(!userbook){
                let newuserbook = new UserBook({
                    userId: userID,
                    bookId: newbook._id
                });
                return newuserbook.save();
            }else{
                res.json(userbook);
            }
        })
        .then(newUserbook => {
            res.json(newUserbook);
        })
        .catch(err => {
            res.json({err:err.message});
        });

};

function getMybooks(req, res){
    let userID = req.user._id;
    let getBooks = [];
    UserBook.find({userId: userID})
        .then(userbooks => {
            if(userbooks){
                //let gotBooks = [];
                let length = userbooks.length;
                let count = 0;
                userbooks.forEach(userbook => {
                    let bookId = userbook.bookId;
                    Book.findById(bookId)
                        .then(book => {
                            count ++;
                            if(book){
                                getBooks.push(book);
                                if(count === length){
                                    console.log("count: ", count);
                                    console.log("getBooks: ", getBooks);
                                    return res.json(getBooks);
                                }
                            }
                        })
                })
            }else{
                return res.json(getBooks);
            }
        })
        .catch(err => {
            res.json({err:err.message});
        });
};



module.exports = {
  search,
  addBook,
  getMybooks
}
