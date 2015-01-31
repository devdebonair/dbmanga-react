var Manga = require('../database/models/ModelManga');
var Article = require('../database/models/ModelArticle');

var Recommendation = function(keywords)
{
    this.keywords = keywords.split(' ');
    var regexString = '(';
    for(var i = 0; i < this.keywords.length; i++)
    {
        if(i !== 0)
        {
            regexString += '|'
        }
        regexString += '\\b' + this.keywords[i].replace(/_/g, ' ') + '\\b';
    }
    regexString += ')';
    this.pattern = new RegExp(regexString, 'gi');
    this.pattern_strict = new RegExp('^' + regexString + '$', 'gi');
};

Recommendation.prototype = {
    
    getManga: function(fields, cb)
    {
        var dataFields = null;
        var callback = cb || null;
        
        if(typeof fields === 'function')
        {
            dataFields = 'title';
            callback = fields;
        }
        else
        {
            dataFields = fields;
        }
        
        Manga.find( 
            { $or: [ {title: this.pattern_strict}, {author: this.pattern} ] }, 
            dataFields, 
            { sort: { likes: -1, 'views.total': -1, 'views.currentMonth': -1}}, 
            callback
        );
    },
    
    getArticles: function(fields, cb)
    {
        var dataFields = null;
        var callback = cb || null;
        
        if(typeof fields === 'function')
        {
            dataFields = 'title';
            callback = fields;
        }
        else
        {
            dataFields = fields;
        }
        
        Article.find(
            { $or: [{ content: this.pattern_strict }, { keywords: this.pattern_strict }] },
            fields,
            {sort: { published: -1 }},
            callback
        );
        
    }
};