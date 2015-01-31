var User = require("../database/models/ModelUser");
var strategy = require("./strategies/local");

module.exports = function(passport)
{
    passport.serializeUser(function(user, callback){
        var serialUser = {};
        serialUser.id = user.id;
        
        callback(null, serialUser);
        return;
    });
    
    passport.deserializeUser(function(serialUser, callback){

        User.findById( serialUser.id, function(err, user){
            callback(err, user);
            return;
        });
    });
    
    passport.use('local-login-user', strategy.loginUser);
};