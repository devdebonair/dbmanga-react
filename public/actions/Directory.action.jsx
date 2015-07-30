var Reflux = require('reflux');
var request = require('superagent');

var DirectoryActions = Reflux.createActions({
	'getBook':				{asyncResult: true},
	'searchBooks': 			{asyncResult: true},
	'getPopularBooks': 		{asyncResult: true},
	'getUpdatedBooks': 		{asyncResult: true},
	'getTrendingBooks': 	{asyncResult: true},
	'getFeaturedBooks': 	{asyncResult: true},
	'getDirectoryTitles': 	{asyncResult: true},
	'getChapter': 			{asyncResult: true}
});

function responseHandler(err, res)
{
	if(err)
	{
		return this.failed(err, res);
	}
	return this.completed(res);
}

DirectoryActions.getChapter.listen(function(book_id, chapter_number){
	request
		.get(('/api/v1/manga/' + book_id + '/chapters/' + chapter_number))
		.end(responseHandler.bind(this));
});

DirectoryActions.getBook.listen(function(book_id){
	request
		.get(('/api/v1/manga/' + book_id))
		.end(responseHandler.bind(this));
});

DirectoryActions.searchBooks.listen(function(data){
	data.title = data.title || '';
    data.status = data.status || '';
    data.genres = data.genres || [];
    data.min = data.min || null;
    data.max = data.max || null;

	request
		.get('/api/v1/manga/search')
		.query(data)
		.end(responseHandler.bind(this));
});

DirectoryActions.getPopularBooks.listen(function(){
	request
		.get('/api/v1/manga/popular/10')
		.end(responseHandler.bind(this));
});

DirectoryActions.getUpdatedBooks.listen(function(){
	request
		.get('/api/v1/manga/updated/10')
		.end(responseHandler.bind(this));
});

DirectoryActions.getTrendingBooks.listen(function(){
	request
		.get('/api/v1/manga/trending/10')
		.end(responseHandler.bind(this));
});

DirectoryActions.getDirectoryTitles.listen(function(){
	request
		.get('/api/v1/manga/directory')
		.end(responseHandler.bind(this));
});

DirectoryActions.getFeaturedBooks.listen(function(){
	console.log('not implemented yet.');
});

module.exports = DirectoryActions;