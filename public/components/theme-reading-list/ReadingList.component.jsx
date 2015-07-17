var React = require('react');
var Book = require('../theme-book/Book.component.jsx');
var Stylesheet = require('./reading-list.css');

module.exports = React.createClass({
	propTypes: {
		title: 		React.PropTypes.string,
		urlList: 	React.PropTypes.arrayOf(React.PropTypes.string),
		width: 		React.PropTypes.number
	},
	getDefaultProps: function()
	{
		return {
			title: '',
			urlList: [],
			width: 250
		};
	},
	render: function()
	{
		return(
			<div>
				<div className="reading-list-title">{this.props.title}</div>
				<div className="seperator">
					<hr />
				</div>
				<div className="book-list">
					{this.props.urlList.map(function(item, index){
						return(
							<div key={index} className="reading-list-book">
								<Book url={item} width={this.props.width} style={{display: 'block-inline'}} />
							</div>
						);
					}.bind(this))}
				</div>
			</div>
		);
	}
});