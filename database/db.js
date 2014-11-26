var mongoose = require("mongoose");
var db = mongoose.connection;
var config = require("../config");
var fs = require("fs");

mongoose.connect( config.database.connection );

db.once('open', function(){
    console.log('Connected to database.');
    return;
});

db.on('err', function( err ){
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