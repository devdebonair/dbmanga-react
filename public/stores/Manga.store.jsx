var Reflux              = require('reflux');
var Ajax                = require("../js/Ajax");
var $                   = new Ajax();
var DirectoryActions    = require("../actions/Directory.action.jsx");

var MangaStore = Reflux.creatStore({
    listenables: [DirectoryActions],
    onGetBook: function()
    {
        
    },
    onGetFeaturedBooks: function()
    {
        
    },
    onGetUpdatedBooks: function()
    {
        
    },
    onGetPopularBooks: function()
    {
        
    },
    getTrendingBooks: function()
    {
        
    },
    getDirectoryTitles: function()
    {
        
    },
    onSearchBooks: function()
    {
        
    }
});

module.exports = MangaStore;