var React = require('react');
var Stylesheet = require('./book.css');

module.exports = React.createClass({
	propTypes: {
		url: React.PropTypes.string,
		width: React.PropTypes.number
	},
	getDefaultProps: function()
	{
		return {
			url: '',
			width: 500
		};
	},
	render: function()
	{
		return(
			<div className="book" style={{width: this.props.width}}>
				<img src={this.props.url} />
			</div>
		);
	}
});