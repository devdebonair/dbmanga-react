var React = require('react');
var debounce = require('../../mixins/debounce');

module.exports = React.createClass({
	propTypes: {
		value: React.PropTypes.number,
		max: React.PropTypes.number,
		min: React.PropTypes.number,
		step: React.PropTypes.number,
		onDebounce: React.PropTypes.func,
		onChange: React.PropTypes.func
	},
	getDefaultProps: function()
	{
		return {
			value: 50,
			max: 100,
			min: 0,
			step: 1
		};
	},
	getInitialState: function()
	{
		return {
			value: 0
		}
	},
	componentWillMount: function()
	{
		this.setState({value: this.props.value});
		this.debounceHandler = debounce(this.props.onDebounce, 250, false);
	},
	onChangeHandler: function(e)
	{
		var value = e.target.value
		this.setState({value: value});
		this.props.onChange(value);
		this.debounceHandler(value);
	},
	render: function()
	{
		return(
			<div>
				<input type="range" onChange={this.onChangeHandler} value={this.state.value} min={this.props.min} max={this.props.max} step={this.props.step} />
			</div>
		);
	}
});