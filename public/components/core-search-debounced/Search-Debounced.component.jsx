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
		autofocus: 		React.PropTypes.bool
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
			autofocus: false
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
				<input ref="search" className="search-debounced" type="search" placeholder={this.props.placeholder} onChange={this.changeHandler} value={this.props.value}  autoFocus={this.props.autofocus} />
			</div>
		);
	}
});