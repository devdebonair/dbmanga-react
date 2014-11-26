var mongoose = require("mongoose");
var UserSchema = require("../schemas/SchemaUser");

module.exports = mongoose.model('User', UserSchema);