var React = require('react');
var Range = require('../core-range/Range.component.jsx');
var Stylesheet = require('./range.css');

module.exports = DBRange = React.createClass({
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
			step: 1,
			onDebounce: function(){},
			onChange: function(){}
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
	},
	render: function()
	{
		return(
			<div>
				<Range className="range" onChange={this.props.onChange} onDebounce={this.props.onDebounce} value={this.state.value} min={this.props.min} max={this.props.max} step={this.props.step} />
			</div>
		);
	}
});