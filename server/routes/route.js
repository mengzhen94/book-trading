const router = require('express').Router();
var path = process.cwd();
const passport = require('passport');
    
router.route('/api').get(
	(req, res) => {
        res.send('api works');
    })

router.route('/signup')
	.post(passport.authenticate('signup'),
  		function(req, res) {
    		res.sendStatus(200);
  		})

module.exports = router;

    
