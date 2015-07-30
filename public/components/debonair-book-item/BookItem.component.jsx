var React = require('react');
var Stylesheet = require('./book-item.css');

module.exports = BookItem = React.createClass({
	propTypes: {
		title: React.PropTypes.string,
		coverUrl: React.PropTypes.string,
		length: React.PropTypes.number,
		author: React.PropTypes.string,
		status: React.PropTypes.string,
		genres: React.PropTypes.arrayOf(React.PropTypes.string),
		id: React.PropTypes.string,
		views: React.PropTypes.object,
		chapters: React.PropTypes.arrayOf(React.PropTypes.object),
		description: React.PropTypes.string,
		onClick: React.PropTypes.func
	},
	getDefaultProps: function()
	{
		return {
			title: '',
			coverUrl: '',
			length: 0,
			author: '',
			status: '',
			genres: [],
			id: '',
			views: 0,
			chapters: [],
			onClick: function(){}
		};
	},
	onClickHandler: function()
	{
		this.props.onClick(this.props);
	},
	render: function()
	{
		return(
			<div onClick={this.onClickHandler} className="book-cover-wrapper"><img src={this.props.coverUrl} className="book-cover" /></div>
		);
	}
});