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
    let newrequest = new Request({
        book: reqBook.title,
        booklink: reqBook.link,
        bookimg: reqBook.thumbnail,
        bookid: reqBook._id,
        ownerid: reqBook.owner,
        requesterid: userID,
        approved: false,
    });
    console.log("newrequest: ",newrequest);
    newrequest.save()
        .then(success => {
            return Book.findOneAndUpdate({_id:reqBook._id},{requested:true})
        })
        .then(success => {
            res.json();
        })
        .catch(err => {
            res.json({err:err.message});
        })

};

function getRequest(req, res){
    let userID = req.user._id;
    console.log("userID: ", userID);
    Request.find({requesterid: userID})
        .then(requests => {
            //console.log("requests: ", requests);
            if(requests){
                res.json(requests);
            }else{
                res.json();
            }
        })
        .catch(err => {
            res.json({err:err.message});
        })
};

function deleteRequest(req, res){
    let userID = req.user._id;
    console.log("req.body: ", req.body);

    Request.remove({_id: req.body._id})
        .then(sucess => {
            return Book.findOneAndUpdate({_id:req.body.bookid},{requested:false})
        })
        .then(success => {
            res.json();
        })
        .catch(err => {
            res.json({err:err.message});
        })


};




module.exports = {
  addRequest,
  getRequest,
  deleteRequest,
}
