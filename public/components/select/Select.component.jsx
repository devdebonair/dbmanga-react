var React = require('react');
var Stylesheet = require('./select.css');

var Select = React.createClass({
	propTypes: {
		items: React.PropTypes.array,
		selected: React.PropTypes.object
	},
	getDefaultProps: function()
	{
		return {
			items: [{label: 'option 1', value: 1},{label: 'option 2	', value: 2	},{label: 'option 3', value: 3}]
		};
	},
	getInitialState: function()
	{
		return {
			isOpen: false
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

	},
	render: function()
	{
		return(
			<div>
				<div className="dropdown-trigger" onClick={this.toggle}>Open</div>
				<div className={this.state.isOpen ? 'dropdown-menu' : 'no-display'}>
					<ul className="dropdown-list">
						{this.props.items.map(function(item, index){
							return <li key={index} value={item.value} onClick={clickSelectHandler}>{item.label}</li>;
						})}
					</ul>
				</div>
			</div>
		);
	}
});

module.exports = Select;