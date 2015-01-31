var fs = require("fs");
var router = require("express").Router();

module.exports = function(app)
{
    var directory = fs.readdirSync(__dirname);

    directory.forEach( function(file){
        
        if(file === 'index.js')
        {
            return;    
        }
        require("./" + file)(router);
    });
    
    app.use('/v1/api', router);
};
