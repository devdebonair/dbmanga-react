var React = require('react');
var Reflux = require("reflux");
var DirectoryActions = require('../actions/Directory.action.jsx');
var MangaStore = require('../stores/Manga.store.jsx');

var Test = React.createClass({
	mixins: [Reflux.connect(MangaStore)],
	clickHandler: function()
	{
		DirectoryActions.getDirectoryTitles();
	},
    render: function()
    {
        return(
            <div><button onClick={this.clickHandler}>Directory Titles</button></div>    
        );
    }
});

module.exports = Test;