var Schema = require("mongoose").Schema;

var News = new Schema({
    title: { type: String, lowercase: true, trim: true },
    coverUrl: String,
    keywords: [String],
    author: { type: String, lowercase: true, trim: true },
    summary: String,
    markup: String,
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
    },
    links: [{
        id: String,
        text: String,
        url: String
    }]
});