var React = require('react');
var DebounceMixin = require('../../mixins/debounce.js');

module.exports = React.createClass({
	mixins: [DebounceMixin],
	propTypes: {
		placeholder: 	React.PropTypes.string,
		value: 			React.PropTypes.string,
		onChange: 		React.PropTypes.func,
		onDebounce: 	React.PropTypes.func,
		delay: 			React.PropTypes.number,
		immediate: 		React.PropTypes.bool
	},
	getDefaultProps: function()
	{
		return {
			placeholder: '',
			value: '',
			onChange: function(){},
			onDebounce: function(){}
		}
	},
	getInitialState: function()
	{
		return {
			text: ''
		}
	},
	componentWillMount: function()
	{
		this.setState({text:this.props.value});
	},
	changeHandler: function()
	{
		this.props.onChange();
		this.debounce(this.props.onDebounce, this.props.delay, this.props.immediate);
	},
	render: function()
	{
		return(
			<div>
				<input type="search" placeholder={this.props.placeholder} onChange:{this.changeHandler} value={this.props.value} />
			</div>
		);
	}
});