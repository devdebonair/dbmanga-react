var Schema = require("mongoose").Schema;

var Article = new Schema({
    title: { type: String, lowercase: true, trim: true },
    coverUrl: String,
    keywords: [String],
    author: { type: String, lowercase: true, trim: true },
    summary: String,
    markup: String,
    published: { type: Date, default: Date.now() },
    media: {
        images: [{
            url: String,
            text: String,
            id: String
        }],
        video: [{
            host: String,
            url: String
        }],
        audio: [{
            host: String,
            url: String
        }]
    },
    links: [{
        id: String,
        text: String,
        url: String
    }],
    sources: [{
        host: String,
        link: String
    }]
});

module.exports = Article;