var React = require('react');
var Reflux = require("reflux");
var DirectoryActions = require('../actions/Directory.action.jsx');
var MangaStore = require('../stores/Manga.store.jsx');

var Test = React.createClass({
	mixins: [Reflux.connect(MangaStore)],
	directory: function()
	{
		DirectoryActions.getDirectoryTitles();
	},
    search: function()
    {
        var data = {
            title: 'Na'
        }
        DirectoryActions.searchBooks(data);
    },
    popular: function()
    {
        DirectoryActions.getPopularBooks();
    },
    trending: function()
    {
        DirectoryActions.getTrendingBooks();
    },
    updated: function()
    {
        DirectoryActions.getUpdatedBooks();
    },
    book: function()
    {
        DirectoryActions.getBook('55141ca866fa200f2c4576ee');
    },
    render: function()
    {
        return(
            <div>
                <div><button onClick={this.directory}>Directory Titles</button></div>
                <div><button onClick={this.search}>Search Books</button></div>
                <div><button onClick={this.popular}>Popular Books</button></div>
                <div><button onClick={this.trending}>Trending Books</button></div>
                <div><button onClick={this.updated}>Updated Books</button></div>
                <div><button onClick={this.book}>Book</button></div>
            </div>
        );
    }
});

module.exports = Test;