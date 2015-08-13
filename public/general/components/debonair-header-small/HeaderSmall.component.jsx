var React = require('react');
var Stylesheet = require('./header-small.css');
var Search = require('../core-search-debounced/Search-Debounced.component.jsx');

module.exports = HeaderSmall = React.createClass({
	propTypes: {
		onDebounce: 	React.PropTypes.func,
		onChange: 		React.PropTypes.func,
		onTitleClick: 	React.PropTypes.func,
		title: 			React.PropTypes.string
	},
	getDefaultProps: function()
	{
		return {
			onDebounce: 	function(){},
			onChange: 		function(){},
			title: 			'TITLE',
			onTitleClick: 	function(){}
		};
	},
	titleClickHandler: function()
	{
		this.refs.search.changeHandler({target: { value: ''}});
		this.props.onTitleClick();
	},
	render: function()
	{
		return(
			<div className="header-small-wrapper">
				<span className="header-small-title">Debonair Manga</span>
				<div className="header-small-search-wrapper">
					<Search placeholder="Search..." onDebounce={this.props.onDebounce} onChange={this.props.onChange} />
				</div>
			</div>
		);
	}
});