var Reflux = require('reflux');

var DirectoryActions = Reflux.createActions([
	'getDirectoryTitles',
	'getBook',
	'getFeaturedBooks',
	'getUpdatedBooks',
	'getPopularBooks',
	'getTrendingBooks',
	'searchBooks'
]);

module.exports = DirectoryActions;