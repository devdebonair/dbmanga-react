var mongoose = require("mongoose");
var SchemaAdmin = require("../schemas/SchemaAdmin");

module.exports = mongoose.model('Admin', SchemaAdmin);