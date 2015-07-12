var React = require('react');
var Stylesheets = require('./select.css');
var $ = require('react-query');

var Select = React.createClass({
	getInitialState: function()
	{
		return {
			isOpen: false
		}
	},
	componentWillMount: function()
	{
		var self = this;
		this.remappedChildren = React.Children.map(this.props.children, function(child){
			if(child.props.className === 'dropdown-trigger')
			{
				return React.cloneElement(child, {onClick: self.toggle});	
			}
			if(child.props.className === 'dropdown-menu')
			{
				return React.cloneElement(child, {className: (self.state.isOpen ? 'dropdown-menu' : 'no-display')});
			}
			return child;
		});
	},
	open: function()
	{
		this.setState({ isOpen: true });
	},
	close: function()
	{
		this.setState({ isOpen: false });
	},
	toggle: function()
	{
		this.setState({ isOpen: !this.state.isOpen });
		console.log(!this.state.isOpen);
	},
	render: function()
	{
		return(<div className="wrapper">{this.remappedChildren}</div>);
	}
});

module.exports = Select;