var Schema = require("mongoose").Schema;

var Article = new Schema({
    title: { type: String, lowercase: true, trim: true },
    coverUrl: String,
    keywords: [String],
    author: { type: String, lowercase: true, trim: true },
    summary: String,
    markup: String,
    published: { type: Date, default: Date.now() },
    views: { type: Number, default: 0 },
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
        url: String
    }]
});

Article.statics.findRelated = function(limit, keywords, callback)
{
    var dataLimit = limit || 25;
    
    if(dataLimit < 1 || dataLimit > 25)
    {
        dataLimit = 25;
    }
    
    this.find({ keywords: { $in: keywords.split(' ')} }, null, { limit: dataLimit }, function(err, data){
        if(err)
        {
            callback(err);
            return;
        }
        callback(data);
    });
}

module.exports = Article;