'use strict';

var path = process.cwd();

module.exports = function(app, passport){

    function isLoggedIn(req, res, next){
		//if the user has been verified, then carry on
		if(req.isAuthenticated()){
			return next();
		}else{
			res.redirect('/login');
		}
	}
    
    app.get('/api', (req, res) => {
        res.send('api works');
    });

    app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/'
		}));

	app.route('/auth/facebook')
    .get(passport.authenticate('facebook'));
    
    app.route('/auth/facebook/callback')
    .get(passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/'
    }));

    
};


