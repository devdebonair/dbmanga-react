var React = require('react');
var Stylesheet = require('./select.css');

var Select = React.createClass({
	propTypes: {
		title: React.PropTypes.string,
		items: React.PropTypes.array,
		selected: React.PropTypes.object
	},
	getDefaultProps: function()
	{
		return {
			items: [],
			title: 'Dropdown'
		};
	},
	getInitialState: function()
	{
		return {
			isOpen: false,
			selected: {label: '', value: ''}
		};
	},
	open: function()
	{
		this.setState({isOpen: true});
	},
	close: function()
	{
		this.setState({isOpen: false});
	},
	toggle: function()
	{
		this.setState({isOpen: !this.state.isOpen});
	},
	select: function(item)
	{
		for(var i = 0; i < this.props.items.length; i++)
		{
			if(this.props.items[i].value === item.value && this.props.items[i].label === item.label)
			{
				this.setState({selected: this.props.items[i]});
				break;
			}
		}
	},
	clickSelectHandler: function(item, event)
	{
		this.select(item);
	},
	render: function()
	{
		return(
			<div>
				<div className="dropdown-trigger" onClick={this.toggle}>{this.props.title}</div>
				<div className={this.state.isOpen ? 'dropdown-menu' : 'no-display'}>
					<ul className="dropdown-list">
						{this.props.items.map(function(item, index){
							return <li key={index} onClick={this.clickSelectHandler.bind(null, {label: item.label, value: item.value})}>{item.label}</li>;
						}.bind(this))}
					</ul>
				</div>
				<div>Selected: {this.state.selected.value}</div>
			</div>
		);
	}
});

module.exports = Select;