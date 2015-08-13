var React = require('react');
var Stylesheet = require('./icon-text.css');
var IconFont = require('../core-icon-font/IconFont.component.jsx');

module.exports = IconText = React.createClass({
	propTypes: {
		text: React.PropTypes.string,
		icon: React.PropTypes.string,
		iconColor: React.PropTypes.string,
		iconSize: React.PropTypes.number
	},
	getDefaultProps: function()
	{
		return {
			text: '',
			icon: '',
			iconColor: 'black',
			iconSize: 24
		};
	},
	render: function()
	{
		return(
			<div className="icon-text-wrapper">
				<div className="icon-text-icon"><IconFont icon={this.props.icon} size={this.props.iconSize} color={this.props.iconColor} /></div>
				<div className="icon-text-text">{this.props.text}</div>
			</div>
		);
	}
});