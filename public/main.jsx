var React = require('react');
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;

var Home = require('./views/home/Home.view.jsx');

var routes = (
	<Route>
		<Route name="home" path="/" handler={Home} />
		<Route path="search" handler={Home} />
	</Route>
);
var App = React.createClass({
	render: function()
	{
		<ReactRouter.RouteHandler />
	}
});

ReactRouter.run(routes, function(Root) {
    React.render(<Root/>, document.getElementById('app'));
});