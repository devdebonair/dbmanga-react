var Reflux              = require('reflux');
var Ajax                = require("../js/Ajax");
var $                   = new Ajax();
var DirectoryActions    = require("../actions/Directory.action.jsx");

var MangaStore = Reflux.creatStore({
    listenables: [DirectoryActions],
    onGetBook: function(book_id)
    {
        var url = '/api/v1/manga/'+ book_id; 
        $.get(url, function(err, data) {
            if(err)
            {
                console.log(err);
                return;
            }
            console.log(data);
        });
    },
    onGetFeaturedBooks: function()
    {
        $.get('/api/v1/manga/featured', function(err, data) {
            if(err)
            {
                console.log(err);
                return;
            }
            console.log(data);
        });
    },
    onGetUpdatedBooks: function()
    {
        $.get('/api/v1/manga/updated', function(err, data) {
            if(err)
            {
                console.log(err);
                return;
            }
            console.log(data);
        });
    },
    onGetPopularBooks: function()
    {
        $.get('/api/v1/manga/popular', function(err, data) {
            if(err)
            {
                console.log(err);
                return;
            }
            console.log(data);
        });
    },
    getTrendingBooks: function()
    {
        $.get('/api/v1/manga/trending', function(err, data) {
            if(err)
            {
                console.log(err);
                return;
            }
            console.log(data);
        });
    },
    getDirectoryTitles: function()
    {
        $.get('/api/v1/manga/directory', function(err, data){
            if(err)
            {
                console.log(err);
                return;
            }
            console.log(data);
        });
    },
    onSearchBooks: function(data)
    {
        var title = data.title || '';
        var status = data.status || 'ongoing';
        var genres = data.genres || [];
        var min = data.min || null;
        var max = data.max || null;
        
        var url = '/api/v1/manga/search?';
        url += 'title=' + title;
        url += 'genres=' + genres.join('+');
        url += 'status=' + status;
        url += 'min=' + min;
        url += 'max=' + max;
        
        $.get(url, function(err, data){
            if(err)
            {
                console.log(err);
                return;
            }
            console.log(data);
        });
    }
});

module.exports = MangaStore;