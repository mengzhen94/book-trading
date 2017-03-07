const router = require('express').Router();
const passport = require('passport');
var path = process.cwd();

var user = require('../controller/user.controller');
var book = require('../controller/book.controller');
var request = require('../controller/request.controller');

function isLoggedIn(req, res, next){
	//if the user has been verified, then carry on
	if(req.isAuthenticated()){
		return next();
	}else{
		res.sendStatus(401);
	}
}

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
/*
router.route('/profile').get(isLoggedIn, (req, res) => {
	user.getProfile;
});
*/

router.route('/profile').get(isLoggedIn, user.getProfile);

router.route('/changeProfile').post(isLoggedIn, user.changeProfile);    
router.route('/changePassword').post(isLoggedIn, user.changePassword); 

router.route('/book').get(book.getAllBooks);

router.route('/book/search').get(isLoggedIn, book.search);
router.route('/book/addbook').post(isLoggedIn, book.addBook);  
router.route('/book/mybooks').get(isLoggedIn, book.getMybooks);
router.route('/book/mybooks/removebook').post(isLoggedIn, book.removeBook);  

router.route('/request/addrequest').post(isLoggedIn, request.addRequest); 
router.route('/request').get(isLoggedIn, request.getRequest);
router.route('/request/reletemyrequest').post(isLoggedIn, request.deleteRequest); 

router.route('/requestToMe').get(isLoggedIn, request.getRequesttoMe);
router.route('/request/apprequest').post(isLoggedIn, request.apprRequeststoMe);

module.exports = router;

    
