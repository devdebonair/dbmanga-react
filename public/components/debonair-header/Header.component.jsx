var React = require('react');
var Stylesheet = require('./header.css');
var Search = require('../core-search-debounced/Search-Debounced.component.jsx');
var Dropdown = require('../debonair-dropdown/Dropdown.component.jsx');

module.exports = Header = React.createClass({
	propTypes: {
		onDebounce: 	React.PropTypes.func,
		onChange: 		React.PropTypes.func,
		onTitleClick: 	React.PropTypes.func,
		onBrowseSelect: React.PropTypes.func,
		title: 			React.PropTypes.string,
		autofocus: 		React.PropTypes.bool
	},
	getDefaultProps: function()
	{
		return {
			onDebounce: 	function(){},
			onChange: 		function(){},
			onTitleClick: 	function(){},
			onBrowseSelect: function(){},
			title: 			'TITLE',
			autofocus: false
		};
	},
	titleClickHandler: function()
	{
		this.refs.search.changeHandler({target: { value: ''}});
		this.props.onTitleClick();
		this.refs.search.focus();
	},
	render: function()
	{
		return(
			<section id="home-header">
				<div id="home-actions">
					<div id="home-title">
						<span onClick={this.titleClickHandler}>{this.props.title}</span>
					</div>
					<div id="home-search">
						<Search ref="search" placeholder="Search..." onChange={this.props.onChange} onDebounce={this.props.onDebounce} autofocus={this.props.autofocus} />
					</div>
				</div>
			</section>
		);
	}
});