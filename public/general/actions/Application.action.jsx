var Reflux = require('reflux');
var Mangaka = require('../js/mangaka');

var ApplicationActions = Reflux.createActions({
	'searchBooks': 			{asyncResult: true},
	'getPopularBooks': 		{asyncResult: true},
	'getTrendingBooks': 	{asyncResult: true},
	'getUpdatedBooks': 		{asyncResult: true},
	'getCategory': 			{asyncResult: true},
	'selectBook': 			{asyncResult: true},
	'selectChapter': 		{asyncResult: true},
	'getReaderChapter': 	{asyncResult: true},
	'setSearchTerm': 		{asyncResult: false},
	'setSelectedBook': 		{asyncResult: false},
	'clearSelectedBook': 	{asyncResult: false},
	'setReaderBook': 		{asyncResult: false},
	'setReaderChapter': 	{asyncResult: false},
	'clearReaderBook': 		{asyncResult: false},
	'clearSearchResults': 	{asyncResult: false}
});

function responseHandler(err, res)
{
	if(err)
	{
		return this.failed(err);
	}
	return this.completed(res.body);
}

ApplicationActions.selectChapter.listen(function(bookId, chapterNumber){
	Mangaka.getChapter(bookId, chapterNumber, responseHandler.bind(this));
});

ApplicationActions.getReaderChapter.listen(function(bookId, chapterNumber){
	Mangaka.getChapter(bookId, chapterNumber, responseHandler.bind(this));
});

ApplicationActions.searchBooks.listen(function(criteria){
	Mangaka.searchBooks(criteria, responseHandler.bind(this));
});

ApplicationActions.selectBook.listen(function(bookId){
	Mangaka.getBook(bookId, responseHandler.bind(this));
});

ApplicationActions.getPopularBooks.listen(function(limit){
	Mangaka.getPopularBooks(limit, responseHandler.bind(this));
});

ApplicationActions.getTrendingBooks.listen(function(limit){
	Mangaka.getTrendingBooks(limit, responseHandler.bind(this));
});

ApplicationActions.getUpdatedBooks.listen(function(limit){
	Mangaka.getUpdatedBooks(limit, responseHandler.bind(this));
});

ApplicationActions.getCategory.listen(function(description, criteria){
	Mangaka.getCategory(description, criteria, function(err, res){
		if(err)
		{
			return this.failed(err);
		}
		return this.completed({ categoryDescription: description, books: res.body });
	}.bind(this));
});

module.exports = ApplicationActions;