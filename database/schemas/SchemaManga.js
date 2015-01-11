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
    }],
    views: { total: { type: Number, default: 0 }, currentMonth: { type: Number, default: 0 }, currentWeek: { type: Number, default: 0 } },
    updated_at: { type: Date, default: Date.now() }
});

Manga.statics.findUpdated = function(limit, callback)
{
    var dataLimit = limit || 25;
    if(dataLimit > 25 || dataLimit < 1)
    {
        dataLimit = 25;
    }
    this.find({}, '-sources', { limit: dataLimit, sort: { updated_at: -1 } }, function(err, data){
        if(err)
        {
            callback(err, null);
            return;
        }
        callback(null, data);
    });
};

Manga.statics.findPopular = function(limit, callback)
{
    var dataLimit = limit || 25;
    if(dataLimit > 25 || dataLimit < 1)
    {
        dataLimit = 25;
    }
    this.find(null, '-sources', { limit: dataLimit, sort: { 'views.currentMonth': -1 } }, function(err, data){
        if(err)
        {
            callback(err, null);
            return;
        }
        callback(null, data);
    });
};


Manga.statics.findTrending = function(limit, callback)
{
    var dataLimit = limit || 25;
    if(dataLimit > 25 || dataLimit < 1)
    {
        dataLimit = 25;
    }
    this.find(null, '-sources', { limit: dataLimit, sort: { 'views.currentWeek': -1 } }, function(err, data){
        if(err)
        {
            callback(err, null);
            return;
        }
        callback(null, data);
    });
};

module.exports = Manga;