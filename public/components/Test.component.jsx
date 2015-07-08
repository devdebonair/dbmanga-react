var React = require('react');
var Reflux = require("reflux");
var DirectoryActions = require('../actions/Directory.action.jsx');
var MangaStore = require('../stores/Manga.store.jsx');


React.createClass({
    render: function()
    {
        return(
            <div><button>Directory Titles</button></div>    
        );
    }
});