var fs = require("fs");
var router = require("express").Router();
var manga = require("./database/models/ModelManga");
var user = require("./database/models/ModelUser");

module.exports = function(app, passport)
{
    var directory = fs.readdirSync(__dirname);

    directory.forEach( function(file){
        
        if(file === 'index.js')
        {
            return;    
        }
        require("./" + file)(router, passport, manga, user);
    });
    
    app.use('/', router);
};
