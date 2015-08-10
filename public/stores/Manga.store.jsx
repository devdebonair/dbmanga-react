var Reflux              = require('reflux');
var DirectoryActions    = require("../actions/Directory.action.jsx");
var ClientActions       = require('../actions/Client.action.jsx');

var MangaStore = Reflux.createStore({
    listenables: [DirectoryActions, ClientActions],
    init: function()
    {
        this.data = {
            searchResults: [],
            selectedBook: {
                id: '',
                coverUrl: '',
                genres: [],
                author: '',
                summary: '',
                views: { currentWeek: 0, currentMonth: 0, total: 0 },
                length: 0,
                status: '',
                title: '',
                chapters: []
            },
            selectedChapter: {
                number: 0,
                pages: [],
                title: ''
            },
            popularBooks: [],
            updatedBooks: [],
            trendingBooks: []
        };
    },
    getInitialState: function()
    {
        return this.data;
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
        this.data.searchResults = res.body;
    	this.trigger(this.data);
    },
    onGetPopularBooksCompleted: function(res)
    {
    	this.data.popularBooks = res.body;
        this.trigger(this.data);
    },
    onGetTrendingBooksCompleted: function(res)
    {
    	this.data.trendingBooks = res.body;
        this.trigger(this.data);
    },
    onGetUpdatedBooksCompleted: function(res)
    {
    	this.data.updatedBooks = res.body;
        this.trigger(this.data);
    },
    onGetBookCompleted: function(res)
    {
        this.data.selectedBook = res.body;
    	this.trigger(this.data);
    }
});

module.exports = MangaStore;