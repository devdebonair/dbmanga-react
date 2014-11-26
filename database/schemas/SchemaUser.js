var Schema = require("mongoose").Schema;

var User = new Schema({
    username: String,
    password: String,
    email: String,
    avatar: String
});

User.methods.validatePassword = function(password)
{
    return (this.password === password);
};

module.exports = User;