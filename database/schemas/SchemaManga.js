var Schema = require("mongoose").Schema;

var Manga = new Schema({
    title: {type: String, lowercase: true, trim: true},
    description: String,
    coverUrl: String,
    author: String,
    artist: String,
    genres: [String],
    subgenres: [String],
    numOfChapters: Number,
    status: {type: String, lowercase: true, trim: true},
    sources: [{
        scanOrigin: String,
        chapters: [{
            number: Number,
            title: String,
            pages: [{
                number: Number,
                image: String,
            }],
        }]
    }]
});

module.exports = Manga;