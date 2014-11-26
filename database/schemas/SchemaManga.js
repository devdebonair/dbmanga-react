var Schema = require("mongoose").Schema;

var Manga = new Schema({
    title: String,
    description: String,
    coverUrl: String,
    author: String,
    artist: String,
    genres: [String],
    numOfChapters: Number,
    status: String,
    sources: [{
        scanOrigin: String,
        chapters: [ {
            number: Number,
            title: String,
            pages: [{
                number: Number,
                image: String
            }]
        }]
    }]
});

module.exports = Manga;