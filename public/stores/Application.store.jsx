var Reflux = require('reflux');
var ApplicationActions = require('../actions/Application.action.jsx');

module.exports = Reflux.createStore({
	listenables: ApplicationActions,
	init: function()
	{
		this.data = this.getDefaults();
	},
	getInitialState: function()
	{
		return this.getDefaults();
	},
	onGetChapterCompleted: function(data)
    {
        this.data.selectedChapter = data;
        this.trigger(this.data);
    },
    onSearchBooksCompleted: function(data)
    {
        this.data.searchResults = data;
    	this.trigger(this.data);
    },
    onGetPopularBooksCompleted: function(data)
    {
    	this.data.popularBooks = data;
        this.trigger(this.data);
    },
    onGetTrendingBooksCompleted: function(data)
    {
    	this.data.trendingBooks = data;
        this.trigger(this.data);
    },
    onGetUpdatedBooksCompleted: function(data)
    {
    	this.data.updatedBooks = data;
        this.trigger(this.data);
    },
    onSelectBookCompleted: function(data)
    {
        this.data.selectedBook = data;
    	this.trigger(this.data);
    },
    onGetCategoryCompleted: function(data)
    {
        this.data.categories = this.data.categories.concat(data);
        this.trigger(this.data);
    },
    onSelectChapterCompleted: function(data)
    {
    	this.data.selectedChapter = data;
    	this.trigger(this.data);
    },
    onGetReaderChapterCompleted: function(data)
    {
    	this.data.readerChapter = data;
    	this.trigger(this.data);
    },
    onSetSelectedBook: function(data)
    {
    	this.data.selectedBook = data;
    	this.trigger(this.data);
    },
    onSetReaderBook: function(data)
    {
    	this.data.readerBook = data;
    	this.trigger(this.data);
    },
    onSetReaderChapter: function(data)
    {
    	this.data.readerChapter = data;
    	this.trigger(this.data);
    },
    onSetSearchTerm: function(newTerm)
    {
    	this.data.searchTerm = newTerm;
    	this.trigger(newTerm);
    },
    onClearSelectedBook: function()
    {
    	this.data.selectedBook = this.getDefaults().selectedBook;
    	this.data.selectedChapter = this.getDefaults().selectedChapter;
    	this.trigger(this.data);
    },
    onClearReaderBook: function()
    {
    	this.data.readerBook = this.getDefaults().readerBook;
    	this.data.readerChapter = this.getDefaults().readerChapter;
    	this.trigger(this.data);
    },
    onClearSearchResults: function()
    {
    	this.data.searchResults = this.getDefaults().searchResults;
    },
	getDefaults: function()
	{
		return {
			searchResults: [],
            popularBooks: [],
            updatedBooks: [],
            trendingBooks: [],
            categories: [],
            searchTerm: '',
            selectedBook: {
                id: '',
                coverUrl: '',
                genres: [],
                author: '',
                summary: '',
                views: { currentWeek: 0, currentMonth: 0, total: 0 },
                numOfChapters: 0,
                status: '',
                title: ''
            },
            readerBook: {
                id: '',
                coverUrl: '',
                genres: [],
                author: '',
                summary: '',
                views: { currentWeek: 0, currentMonth: 0, total: 0 },
                numOfChapters: 0,
                status: '',
                title: ''
            },
            selectedChapter: {
                number: 0,
                pages: [],
                title: ''
            },
            readerChapter: {
            	number: 0,
                pages: [],
                title: ''
            }
		};
	}
});