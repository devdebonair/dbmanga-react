var mongoose = require("mongoose");
var ArticleSchema = require("../schemas/SchemaArticle");

module.exports = mongoose.model('Article', ArticleSchema);