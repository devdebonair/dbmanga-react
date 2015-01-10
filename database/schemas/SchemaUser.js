var Schema = require("mongoose").Schema;
var bcrypt = require("bcrypt");

var User = new Schema({
    username: { type: String, lowercase: true },
    password: String,
    email: { type: String, lowercase: true },
    avatar: String,
    dob: { type: Date, required: true },
    isPremium: { type: Boolean, default: false },
    isPublic: Boolean,
    library: [{
        id: String,
        bookmark: {
            chapter: Number,
            page: Number
        }
    }],
    preferences: {
        isDual: { type: Boolean, default: false }
    }
});

User.pre('save', function(next){
    var user = this;
    
    if(!user.isModified('password'))
    {
        next();
        return;
    }
    
    bcrypt.hash(user.password, 10, function(err, hash){
        if(err)
        {
            next(err);
            return;
        }
        user.password = hash;
        next();
    });
});

User.methods.validatePassword = function(password, callback)
{
    bcrypt.compare(password, this.password, function(err, result){
        if(err)
        {
            callback(err, false);
            return;
        }
        callback(null, result);
    });
};

module.exports = User;