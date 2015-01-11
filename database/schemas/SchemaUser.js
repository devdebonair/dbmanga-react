var Schema = require("mongoose").Schema;
var bcrypt = require("bcrypt");

var User = new Schema({
    username: { type: String, unique: true },
    password: { type: String, required: true, match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/ },
    email: { type: String, lowercase: true },
    avatar: String,
    isPremium: { type: Boolean, default: false, required: true },
    isPublic: { type: Boolean, default: true, required: true },
    library: [{
        book_id: { type: String, required: true },
        bookmark: {
            chapter: { type: Number, default: 0 },
            page: { type: Number, default: 0 }
        }
    }]
});

User.pre('save', function(next){
    var user = this;
    
    if(!user.isModified('password'))
    {
        next();
        return;
    }
    
    if(user.password.length >= 8)
    {
        bcrypt.hash(user.password, 10, function(err, hash){
            if(err)
            {
                next(err);
                return;
            }
            user.password = hash;
            next();
        });
    }
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