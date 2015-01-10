var config = require("../config");
var fs = require("fs");

module.exports = function(mongoose)
{
    var db = mongoose.connection;
    
    mongoose.connect( config.database.connectionString );
    
    db.once('open', function(){
        console.log('Connected to database.');
        return;
    });
    
    db.on('error', function( err ){
        console.log( err );
        return;
    });
    
    fs.readdir(__dirname + '/models', function(err, files){
        if(err)
        {
            console.log(err);
            return;
        }
        
        files.forEach( function( element ){
            require(__dirname + '/models/' + element);
        });
        return;
    });
};
