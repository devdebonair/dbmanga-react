var React = require('react');
var Stylesheet = require('./select.css');
var Select = require('../core-select/Select.component.jsx');

module.exports = React.createClass({
	propTypes: {
		title: React.PropTypes.string,
		items: React.PropTypes.arrayOf(React.PropTypes.object)
	},
	getDefaultProps: function()
	{
		return {
			title: 'SELECT',
			items: []
		};
	},
	selectChanged: function(item)
	{
		console.log(item);
	},
	render: function()
	{
		return(
			<Select items={this.props.items} title={this.props.title} onSelectChange={this.selectChanged} />
		);
	}
});