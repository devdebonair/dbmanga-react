module.exports = {
	context: __dirname + '/public',
	entry: './main.jsx',
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{ test: /\.jsx$/, loader: 'jsx-loader' },
			{ test: /\.css$/, loaders: ['style', 'css'] }
		]
	}
};