var LocalStrategy = require("passport-local").Strategy;
var User = require("../../database/models/ModelUser");

exports.loginUser = new LocalStrategy(function(username, password, callback){
        
    User.findOne({ username: username }, function(err, user){
        if(err)
        {
            callback(err, null);
            return;
        }
        
        if(!user)
        {
            callback(null, null);
            return;
        }
        
        user.validatePassword(password, function(err, result){
            if(err)
            {
                callback(err, null);
                return;
            }
            
            if(!result)
            {
                callback(null, false);
                return;
            }
            
            callback(null, user);
        });
    });    
});