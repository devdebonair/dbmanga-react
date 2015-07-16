var React = require('react');
var SearchDebounced = require('../core-search-debounced/Search-Debounced.component.jsx');
var Stylesheet = require('./search-debounced.css');

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
			<SearchDebounced 
				placeholder={this.props.placeholder} 
				value={this.state.text} 
				onChange={this.props.onChange} 
				onDebounce={this.props.onDebounce} 
				delay={this.props.delay} 
				immediate={this.props.immediate} />
		);
	}
});