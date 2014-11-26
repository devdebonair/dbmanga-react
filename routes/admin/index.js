var fs = require("fs");
var router = require("express").Router();

router.get('/', function(req, res){
    res.redirect(301, '/admin/login');    
});

module.exports = function(app, passport)
{
    var directory = fs.readdirSync(__dirname);
    
    directory.forEach( function(file){
        
        if(file === 'index.js')
        {
            return;    
        }
        require("./" + file)(router, passport);
    });
    
    app.use('/admin', router);
};
