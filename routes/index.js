var fs = require("fs");

module.exports = function(app, passport)
{
    var directory = fs.readdirSync(__dirname);

    directory.forEach( function(file){
        var path = __dirname + '/' + file;
        
        if( fs.lstatSync(path).isDirectory() )
        {
            require("./" + file)(app, passport);
        }
    });
};