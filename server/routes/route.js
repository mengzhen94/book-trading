const router = require('express').Router();
var path = process.cwd();
const passport = require('passport');

var user = require('../controller/user.controller');
var book = require('../controller/book.controller');
var request = require('../controller/request.controller');
    
router.route('/api').get(
	(req, res) => {
        res.send('api works');
    })

router.route('/signup')
	.post(passport.authenticate('signup'),
  		(req, res) =>  {
    		res.sendStatus(200);
  		});

router.route('/login')
	.post(passport.authenticate('login'),
  		(req, res) => {
    		res.sendStatus(200);
  		});

router.route('/logout').post((req, res) => {
	req.logout();
  	res.sendStatus(200);
});

router.route('/profile').get(user.getProfile);
router.route('/changeProfile').post(user.changeProfile);    
router.route('/changePassword').post(user.changePassword); 

router.route('/book').get(book.getAllBooks);

router.route('/book/search').get(book.search);
router.route('/book/addbook').post(book.addBook);  
router.route('/book/mybooks').get(book.getMybooks);
router.route('/book/mybooks/removebook').post(book.removeBook);  

router.route('/request/addrequest').post(request.addRequest); 

module.exports = router;

    
