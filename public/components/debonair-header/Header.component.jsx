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
		title: 			React.PropTypes.string
	},
	getDefaultProps: function()
	{
		return {
			onDebounce: 	function(){},
			onChange: 		function(){},
			onTitleClick: 	function(){},
			onBrowseSelect: function(){},
			title: 			'TITLE'
		};
	},
	titleClickHandler: function()
	{
		this.refs.search.changeHandler({target: { value: ''}});
		this.props.onTitleClick();
	},
	items: [
		{label: 'Shounen', value: 'shounen'},
		{label: 'Sienen', value: 'sienen'},
		{label: 'Adventure', value: 'adventure'},
		{label: 'Slice of life', value: 'slice of life'},
		{label: 'Romance', value: 'romance'},
		{label: 'Harem', value: 'harem'},
		{label: 'Shoujo', value: 'shoujo'},
		{label: 'Ecchi', value: 'ecchi'},
		{label: 'Mature', value: 'mature'}
	],
	swagger: function(swagger)
	{
		console.log(swagger);
	},
	render: function()
	{
		return(
			<section id="home-header">
				<div className="home-browse">
					<Dropdown onSelect={this.swagger} title="browse" items={this.items} />
				</div>
				<div id="home-actions">
					<div id="home-title">
						<span onClick={this.titleClickHandler}>{this.props.title}</span>
					</div>
					<div id="home-search">
						<Search ref="search" placeholder="Search..." onChange={this.props.onChange} onDebounce={this.props.onDebounce} />
					</div>
				</div>
			</section>
		);
	}
});