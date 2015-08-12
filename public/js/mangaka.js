var request = require('superagent');

module.exports.getChapter = function(book_id, chapter_number, callback){
	request
		.get(('/api/v1/manga/' + book_id + '/chapters/' + chapter_number))
		.end(callback);
},

module.exports.getBook = function(book_id, callback){
	request
		.get(('/api/v1/manga/' + book_id))
		.query({select: '-chapters'})
		.end(callback);
},

module.exports.searchBooks = function(data, callback){
	data.title = data.title || '';
    data.status = data.status || '';
    data.genres = data.genres || [];
    data.min = data.min || null;
    data.max = data.max || null;

	request
		.get('/api/v1/manga/search')
		.query(data)
		.end(callback);
},

module.exports.getCategory = function(description, data, callback){
	data.title = data.title || '';
    data.status = data.status || '';
    data.genres = data.genres || [];
    data.min = data.min || null;
    data.max = data.max || null;

    // { categoryDescription: description, books: res.body }

	request
		.get('/api/v1/manga/search')
		.query(data)
		.end(callback);
},

module.exports.getPopularBooks = function(limit, callback){
	limit = limit || 10;
	request
		.get('/api/v1/manga/popular/'+limit)
		.end(callback);
},

module.exports.getUpdatedBooks = function(limit, callback){
	limit = limit || 10;
	request
		.get('/api/v1/manga/updated/'+limit)
		.end(callback);
},

module.exports.getTrendingBooks = function(limit, callback){
	limit = limit || 10;
	request
		.get('/api/v1/manga/trending/'+limit)
		.end(callback);
},

module.exports.getFeaturedBooks = function(limit, callback){
	console.log('not implemented yet.');
},

module.exports.getDirectoryTitles = function(limit, callback){
	request
		.get('/api/v1/manga/directory')
		.end(callback);
}