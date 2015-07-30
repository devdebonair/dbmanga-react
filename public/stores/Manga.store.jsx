var Reflux              = require('reflux');
var DirectoryActions    = require("../actions/Directory.action.jsx");
var ClientActions       = require('../actions/Client.action.jsx');

var MangaStore = Reflux.createStore({
    listenables: [DirectoryActions, ClientActions],
    init: function()
    {
        this.data = {
            books: [],
            selectedBook: {
                id: '',
                coverUrl: '',
                genres: [],
                author: '',
                summary: '',
                views: 0,
                length: 0,
                status: '',
                title: '',
                chapters: []
            },
            selectedChapter: {
                number: 0,
                pages: [],
                title: ''
            }
        };
    },
    onSetSelectedBook: function(data)
    {
        this.data.selectedBook = data;
        this.trigger(this.data);
    },
    onClearSelectedBook: function()
    {
        this.data.selectedBook = {
            coverUrl: '',
            genres: [],
            author: '',
            summary: '',
            views: 0,
            length: 0,
            status: '',
            title: '',
            chapters: []
        };
        
        this.data.selectedChapter = {
            number: 0,
            pages: [],
            title: ''
        };

        this.trigger(this.data);
    },
    onGetChapterCompleted: function(res)
    {
        this.data.selectedChapter = res.body;
        this.trigger(this.data);
    },
    onGetDirectoryTitlesCompleted: function(res)
    {
        console.log(res.body);
    },
    onSearchBooksCompleted: function(res)
    {
        this.data.books = res.body;
    	this.trigger(this.data);
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
        this.data.selectedBook = res.body;
    	this.trigger(this.data);
    },
    getDefaultData: function()
    {
        return this.data;
    }
});

module.exports = MangaStore;