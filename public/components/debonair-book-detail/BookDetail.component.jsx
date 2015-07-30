var React = require('react');
var Stylesheet = require('./book-detail.css');

module.exports = BookDetail = React.createClass({
	render: function()
	{
		return(
			<div className="book-detail-wrapper">
				<div className="book-detail-cover">
					<img src={this.props.coverUrl} />
				</div>
				<div className="book-detail-detail">
					<div className="book-detail-title">{this.props.title}</div>
					<div className="book-detail-summary">{this.props.summary}</div>
				</div>
			</div>
		);
	}
});