var request = require('superagent');
var baseUrl = 'http://mcd.iosphe.re';

module.exports.directory = function(callback)
{
	request
		.get(baseUrl + '/api/v1/database/')
		.end(callback);
}

module.exports.search = function(title, callback)
{
	request
		.get(baseUrl + '/api/v1/search')
		.query({title: title})
		.end(callback);
}

module.exports.series = function(id, callback)
{
	request
		.get(baseUrl + '/api/v1/series/'+ id +'/')
		.end(callback);
}