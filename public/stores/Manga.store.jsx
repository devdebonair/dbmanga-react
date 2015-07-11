var Reflux              = require('reflux');
var DirectoryActions    = require("../actions/Directory.action.jsx");

var MangaStore = Reflux.createStore({
    listenables: [DirectoryActions],
    onGetDirectoryTitlesCompleted: function(res)
    {
        console.log(res.body);
    },
    onSearchBooksCompleted: function(res)
    {
    	console.log(res.body);
    },
    onGetPopularBooksCompleted: function(res)
    {
    	console.log(res.body);
    },
    onGetTrendingBooksCompleted: function(res)
    {
    	console.log(res.body);
    },
    onGetUpdatedBooksCompleted: function(res)
    {
    	console.log(res.body);
    },
    onGetBookCompleted: function(res)
    {
    	console.log(res.body);
    }
});

module.exports = MangaStore;