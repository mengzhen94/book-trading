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
    //console.log("req.body: ", req.body);
    let newbook = new Book(req.body);
    let newbookId;
     //console.log("newbook: ", newbook);
    Book.findOne({id: req.body.id})
        .then(book => {
            if(book){
                return book;
            }else{
                return newbook.save();
            }        
        })
        .then(newbook => {
            newbookId = newbook._id;
            //console.log("newbookId", newbookId)
            return UserBook.findOne({bookId: newbookId, userId: userID});
        })
        .then(userbook => {
            if(!userbook){
                let newuserbook = new UserBook({
                    userId: userID,
                    bookId: newbookId
                });
                //console.log("newuserbook", newuserbook)
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
    console.log("0!!");
    let userID = req.user._id;
    let getBooks = [];
    UserBook.find({userId: userID})
        .then(userbooks => {
            console.log("1!!");
            if(userbooks){
                let length = userbooks.length;
                let count = 0;
                console.log("2!!");
                userbooks.forEach(userbook => {
                    console.log("3!!");
                    let bookId = userbook.bookId;
                    Book.findById(bookId)
                        .then(book => {
                            console.log("4!!");
                            count ++;
                            if(book){
                                console.log("5!!");
                                getBooks.push(book);
                                if(count === length){
                                    console.log("getbook:", getBooks);
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

function removeBook(req, res){
    let userID = req.user._id;
    console.log("req.body: ", req.body);
    let bookID = req.body._id;
     
    UserBook.remove({bookId: bookID, userId: userID}, (err, result) => {
        //res.json();
        if(err) {
            res.json({err:err.message});
        }
        UserBook.find({bookId: bookID})
                .then(result => {
                    console.log("result:", result);
                    if(result.length === 0){
                        console.log("remove:", bookID);
                        Book.remove({_id: bookID}, (err, result) => {
                            if(err) {
                                res.json({err:err.message});
                            }
                            res.json();
                        });
                        
                    }
                })
    });
    res.json();
        //.then(success => {

           /* 
            UserBook.find({bookId: bookID})
                .then(result => {
                    console.log("result:", result);
                    if(!result){
                        Book.remove({_id: bookID});
                    }
                    res.json();
                })
            */
        //})

        //res.json();
/*
        .catch(err => {
            res.json({err:err.message});
        });
*/
};



module.exports = {
  search,
  addBook,
  getMybooks,
  removeBook,
}
