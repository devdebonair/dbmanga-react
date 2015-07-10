var Reflux              = require('reflux');
var DirectoryActions    = require("../actions/Directory.action.jsx");

var MangaStore = Reflux.createStore({
    listenables: [DirectoryActions],
    onGetDirectoryTitlesCompleted: function(err, res)
    {
        console.log(res.body);
    }
});

module.exports = MangaStore;