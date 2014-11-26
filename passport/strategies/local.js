var LocalStrategy = require("passport-local").Strategy;
var User = require("../../database/models/ModelUser");
var Admin = require("../../database/models/ModelAdmin");

exports.loginUser = new LocalStrategy(function(req, username, password, callback){
        
        User.findOne({ username: username }, function(err, user){
            if(err)
            {
                callback(err, null);
                return;
            }
            
            if(!user || !user.validatePassword(password))
            {
                callback(null, false);
                return;
            }
            
            callback(null, user);
        });    
});

exports.loginAdmin = new LocalStrategy(function(username, password, callback){
        
        Admin.findOne({ username: username }, function(err, admin){
            if(err)
            {
                callback(err, null);
                return;
            }
            
            if(!admin || !admin.validatePassword(password))
            {
                callback(null, false);
                return;
            }
            
            callback(null, admin);
        });    
});