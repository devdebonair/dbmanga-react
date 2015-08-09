var mongoose = require("mongoose");
var Manga = require("../database/models/ModelManga");
var Kissmanga = require("./manga-scraper").KissManga;
var title = 'Monster-Musume-no-Iru-Nichijou';

require("../database/db")(mongoose, function(err){
    if(err)
    {
        return console.log(err);
    }
    
    var scraper = new Kissmanga();

    scraper.series({mangaName: title}, function(err, data){
        if(err)
        {
            return console.log(err);
        }

        // check for incomplete chapters
        // for(var i = 0; i < data.chapters.length; i++)
        // {
        //     console.log(data.chapters[i]);
        //     if(!data.chapters[i].pages || data.chapters[i].pages.length === 0)
        //     {
        //         return console.log('removing chapter %d\n\n', data.chapters[i].number);
        //     }
        // }
        

        // create manga database object
        var databaseObject = new Manga();
        databaseObject.title = title.toLowerCase().replace(/-/g,' ');
        databaseObject.description = data.description;
        databaseObject.coverUrl = data.coverUrl;
        databaseObject.author = data.author;
        databaseObject.likes = Math.floor(Math.random() * (80000 - 0 + 1));

        var acceptedGenres = ['shounen','shoujo','slice of life', 'adventure', 'seinen', 'romance', 'ecchi', 'mature', 'harem'];

        databaseObject.genres = data.genres.map(function(str){
            return str.toLowerCase();
        }).filter( function( el ) {
            return acceptedGenres.indexOf( el ) > -1;
        });
        databaseObject.subgenres = data.genres.map(function(str){
            return str.toLowerCase();
        }).filter( function( el ) {
            return acceptedGenres.indexOf( el ) === -1;
        });

        databaseObject.numOfChapters = data.numOfChapters;
        databaseObject.status = data.status.toLowerCase();
        databaseObject.chapters = data.chapters;
        databaseObject.views['total'] = Math.floor(Math.random() * (1000000 - 0 + 1));
        databaseObject.views['currentMonth'] = Math.floor(Math.random() * (1000000 - 0 + 1));
        databaseObject.views['currentWeek'] = Math.floor(Math.random() * (1000000 - 0 + 1));




        // save to database
        databaseObject.save(function(err, data){
            if(err)
            {
                console.log(err);
            }
            console.log('%s saved.\n\n', databaseObject.title);
        });
    });
});



