var React = require('react');
var Stylesheet = require('./featured-book.css');

module.exports = React.createClass({
	propTypes: {
		url: 			React.PropTypes.string,
		title: 			React.PropTypes.string,
		description: 	React.PropTypes.string
	},
	getDefaultProps: function()
	{
		return {
			url: '',
			title: '',
			description: ''
		};
	},
	render: function()
	{
		return(
			<div className="featured-book-wrapper">
				<div className="featured-book-image">
					<img src={this.props.url} />
				</div>
				<div className="featured-book-content">
					<span className="featured-book-title">{this.props.title}</span>
					<p className="featured-book-description">{this.props.description}</p>
				</div>
			</div>
		);
	}
});