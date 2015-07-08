var Reflux = require('reflux');

var DirectoryActions = reflux.createActions([
	'getDirectoryTitles',
	'getBook',
	'getFeaturedBooks',
	'getUpdatedBooks',
	'getPopularBooks',
	'getTrendingBooks',
	'searchBooks'
]);

module.exports = DirectoryActions;