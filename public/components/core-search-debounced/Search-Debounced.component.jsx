var React = require('react');
var debounce = require('../../mixins/debounce');

module.exports = React.createClass({
	propTypes: {
		placeholder: 	React.PropTypes.string,
		value: 			React.PropTypes.string,
		onChange: 		React.PropTypes.func,
		onDebounce: 	React.PropTypes.func,
		delay: 			React.PropTypes.number,
		immediate: 		React.PropTypes.bool,
		autofocus: 		React.PropTypes.bool,
		value: 			React.PropTypes.string 
	},
	getDefaultProps: function()
	{
		return {
			placeholder: '',
			value: '',
			onChange: function(){},
			onDebounce: function(){},
			delay: 250,
			immediate: false,
			autofocus: false,
			value: ''
		};
	},
	componentWillMount: function()
	{
		this.debounceHandler = debounce(this.props.onDebounce, this.props.delay, this.props.immediate);
	},
	changeHandler: function(e)
	{
		var value = e.target.value
		this.props.onChange(value);
		this.debounceHandler(value);
	},
	focus: function()
	{
		React.findDOMNode(this.refs.search).focus();
	},
	render: function()
	{
		return(
			<div>
				<input ref="search" className="search-debounced" type="search" placeholder={this.props.placeholder} onChange={this.changeHandler} autoFocus={this.props.autofocus} value={this.props.value} />
			</div>
		);
	}
});