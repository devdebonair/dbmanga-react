var React = require('react');
var debounce = require('../../mixins/debounce');

module.exports = React.createClass({
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
			onDebounce: function(){},
			delay: 250,
			immediate: false
		};
	},
	getInitialState: function()
	{
		return {
			text: ''
		};
	},
	componentWillMount: function()
	{
		this.setState({text:this.props.value});
		this.debounceHandler = debounce(this.props.onDebounce, this.props.delay, this.props.immediate);
	},
	changeHandler: function(e)
	{
		var value = e.target.value
		this.setText(value);
		this.props.onChange(value);
		this.debounceHandler(value);
	},
	setText: function(data)
	{
		this.setState({text:data});
	},
	render: function()
	{
		return(
			<div>
				<input className="search-debounced" type="search" placeholder={this.props.placeholder} onChange={this.changeHandler} value={this.state.text}  />
			</div>
		);
	}
});