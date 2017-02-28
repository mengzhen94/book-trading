'use strict';

var path = process.cwd();

module.exports = function(app){
    
    app.get('/api', (req, res) => {
        res.send('api works');
    });

    
};


