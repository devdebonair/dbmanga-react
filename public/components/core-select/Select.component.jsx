var React = require('react');
var Stylesheet = require('./select.css');

var Select = React.createClass({
	propTypes: {
		title: React.PropTypes.string,
		items: React.PropTypes.array,
		selected: React.PropTypes.object,
		closeOnSelect: React.PropTypes.bool,
		onSelectChange: React.PropTypes.func
	},
	getDefaultProps: function()
	{
		return {
			items: [],
			title: 'Dropdown',
			closeOnSelect: true,
			onSelectChange: function(){}
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
		this.props.onSelectChange(item, event);
		if(this.props.closeOnSelect)
		{
			this.close();
		}
	},
	onBlur: function()
	{
		this.close();
	},
	render: function()
	{
		return(
			<div tabIndex="1" onBlur={this.onBlur}>
				<div className="dropdown-trigger" onClick={this.toggle}>{this.props.title}</div>
				<div className={this.state.isOpen ? 'dropdown-menu' : 'no-display'}>
					<ul className="dropdown-list">
						{this.props.items.map(function(item, index){
							return <li key={index} onClick={this.clickSelectHandler.bind(null, {label: item.label, value: item.value})}>{item.label}</li>;
						}.bind(this))}
					</ul>
				</div>
			</div>
		);
	}
});

module.exports = Select;