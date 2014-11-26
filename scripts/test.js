var KissManga = require("../scripts/manga-scraper").KissManga;
var Manga = require("../database/models/ModelManga");

require("../database/db");

var scraper = new KissManga();

scraper.series({ mangaName: 'Ansatsu-Kyoushitsu' }, function(err, manga){
    if(err)
    {
        console.log(err);
        return;
    }
    console.log(manga);
    
    var databaseObject = new Manga();
    
    databaseObject.title = manga.title;
    databaseObject.description = manga.description;
    databaseObject.coverUrl = manga.coverUrl;
    databaseObject.author = manga.author;
    databaseObject.artist = manga.artist;
    databaseObject.genres = manga.genres;
    databaseObject.numOfChapters = manga.numOfChapters;
    databaseObject.status = manga.status;
    databaseObject.sources = [];
    databaseObject.sources.push({ scanOrigin: manga.scanOrigin, chapters: manga.chapters });
    
    console.log('Saving...');
    
    databaseObject.save(function(){
        if(err)
        {
            return console.log(err);
        }
        console.log('Manga Saved.');
    });
});