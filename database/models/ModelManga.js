var mongoose = require("mongoose");
var MangaSchema = require("../schemas/SchemaManga");

module.exports = mongoose.model('Manga', MangaSchema);