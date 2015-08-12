var React = require('react');
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;

var Home = require('./views/home/Home.view.jsx');

var routes = (
	<Route>
		<Route name="home" path="/" handler={Home} />
		<Route name="search" path="search/:searchTerm" handler={Home} />
		<Route path="search/" handler={Home} />
		<Route name="manga" path="manga/:mangaId" handler={Home} />
		<Route name="chapter" path="manga/:mangaId/:chapterNumber" handler={Home} />
	</Route>
);
var App = React.createClass({
	render: function()
	{
		<ReactRouter.RouteHandler />
	}
});

ReactRouter.run(routes, ReactRouter.HistoryLocation, function(Root) {
    React.render(<Root/>, document.getElementById('app'));
});