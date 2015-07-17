var React = require('react');
var Stylesheet = require('./button.css');

module.exports = React.createClass({
	propTypes: {
		title: React.PropTypes.string,
		size: React.PropTypes.number,
		onClick: React.PropTypes.func
	},
	getDefaultProps: function()
	{
		return {
			title: '',
			size: 12
		};
	},
	render: function()
	{
		return(
			<div>
				<button style={{fontSize: this.props.size}} onClick={this.props.onClick}><span>{this.props.title}</span></button>
			</div>
		);
	}
});