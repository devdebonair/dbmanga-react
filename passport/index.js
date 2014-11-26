var User = require("../database/models/ModelUser");
var Admin = require("../database/models/ModelAdmin");
var strategy = require("./strategies/local");

module.exports = function(passport)
{
    passport.serializeUser(function(user, callback){
        var serialUser = {};
        serialUser.id = user.id;
        serialUser.isAdmin = false;

        if(user.toObject().hasOwnProperty('access'))
        {
            serialUser.isAdmin = true;
        }
        
        callback(null, serialUser);
        return;
    });
    
    passport.deserializeUser(function(serialUser, callback){
        if(serialUser.isAdmin)
        {
            Admin.findById( serialUser.id, function(err, user){
                callback(err, user);
                return;
            });
            return;
        }
        User.findById( serialUser.id, function(err, user){
            callback(err, user);
            return;
        });
    });
    
    passport.use('local-login-user', strategy.loginUser);
    passport.use('local-login-admin', strategy.loginAdmin);
};