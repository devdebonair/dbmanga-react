var React = require('react');
var Stylesheet = require('./dropdown.css');
var Dropdown = require('../core-dropdown/Dropdown');
var DropdownTrigger = Dropdown.DropdownTrigger;
var DropdownContent = Dropdown.DropdownContent;
var Icon = require('../core-icon-font/IconFont.component.jsx');

module.exports = DBDropdown = React.createClass({
	propTypes: {
		items: React.PropTypes.arrayOf(React.PropTypes.object),
		onSelect: React.PropTypes.func,
		title: React.PropTypes.string
	},
	getDefaultProps: function()
	{
		return {
			items: [],
			onSelect: function(){}
		};
	},
	onClickHandler: function(e)
	{
		this.props.onSelect(e.target.getAttribute('value'));
		this.refs.dropdown.hide();	
	},
	render: function()
	{
		return(
			<div className="dropdown">
				<Dropdown ref="dropdown">
					<DropdownTrigger>
						<span>{this.props.title}</span>
						<span className="dropdown-icon"><Icon icon="keyboard_arrow_down" color="#FFF" size={12} /></span>
					</DropdownTrigger>
					<DropdownContent>
						<ul>
							{this.props.items.map(function(item, index){
								return (
									<li onClick={this.onClickHandler} key={index} value={item.value}>{item.label}</li>
								);
							}.bind(this))}
						</ul>
					</DropdownContent>
				</Dropdown>
			</div>
		);
	}
});