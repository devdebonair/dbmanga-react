var React = require('react');
var Stylesheet = require('./icon-font.css');

module.exports = React.createClass({
	propTypes: {
		icon: React.PropTypes.string,
		size: React.PropTypes.number,
		color: React.PropTypes.string
	},
	getDefaultProps: function()
	{
		return {
			icon: 'face',
			size: 24,
			color: 'black'
		};
	},
	render: function()
	{
		var style = {
			fontSize: this.props.size,
			color: this.props.color
		};

		return(
			<i className={"icon-font material-icons"} style={style}>{this.props.icon}</i>
		);
	}
});