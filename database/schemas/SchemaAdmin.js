var Schema = require("mongoose").Schema;

var Admin = new Schema({
    username: String,
    password: String,
    name: { first: String, last: String },
    email: String,
    access: Number,
    events: [{ start_date: Date, end_date: Date, title: String, description: String }],
    notifications: [{ title: String, message: String, type: { type: String }, status: String, date_created: { type: Date, default: Date.now()}}],
    todos: [{ title: String, description: String, status: String }]
});

Admin.methods.validatePassword = function(password){
    return (this.password === password);
};

module.exports = Admin;