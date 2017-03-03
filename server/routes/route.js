const router = require('express').Router();
var path = process.cwd();
const passport = require('passport');
    
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

module.exports = router;

    