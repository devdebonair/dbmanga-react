var React = require('react');
var Stylesheet = require('./header.css');
var Search = require('../core-search-debounced/Search-Debounced.component.jsx');

module.exports = React.createClass({
	propTypes: {
		onDebounce: React.PropTypes.func,
		onChange: 	React.PropTypes.func,
		title: 		React.PropTypes.string
	},
	getDefaultProps: function()
	{
		return {
			onDebounce: function(){},
			onChange: 	function(){},
			title: 		'TITLE'
		};
	},
	render: function()
	{
		return(
			<section id="home-header">
				<div id="home-actions">
					<div id="home-title">
						<span>{this.props.title}</span>
					</div>
					<div id="home-search">
						<Search placeholder="Search..." onChange={this.props.onChange} onDebounce={this.props.onDebounce} />
					</div>
				</div>
			</section>
		);
	}
});