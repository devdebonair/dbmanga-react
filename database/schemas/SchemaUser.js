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
        title: { type: String, required: true },
        coverUrl: { type: String, required: true },
        bookmark: {
            chapter: {
                number: { type: Number, required: true, default: 1 },
                pages: [{
                    number: { type: Number, required: true },
                    image: { type: String, required: true }
                }]
            },
            page: { type: Number, default: 1 }
        }
    }],
    history: [{
        manga_id: { type: String, required: true },
        title: { type: String, required: true },
        date: { type: Date, required: true, default: Date.now() },
        coverUrl: { type: String, required: true }
    }],
    recommendations: [{
        title: String,
        manga_id: String
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