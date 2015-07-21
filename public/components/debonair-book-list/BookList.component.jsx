var React = require('react');
var Stylesheet = require('./book-list.css');
var BookItem = require('../debonair-book-item/BookItem.component.jsx');

module.exports = React.createClass({
	propTypes: {
		images: React.PropTypes.arrayOf(React.PropTypes.string)
	},
	getDefaultProps: function()
	{
		return {
			books: []
		};
	},
	clickHandler: function(data)
	{
		console.log(data);
	},
	render: function()
	{
		return(
			<section id="home-directory">
				<div className="container">
					<div id="home-book-list">
						{this.props.books.map(function(element, index){
							return(
								<span className="book-item-wrapper" key={index}>
									<BookItem
										onClick={this.clickHandler}
										title={element.title}
										coverUrl={element.coverUrl}
										length={element.numOfChapters}
										author={element.author}
										status={element.status}
										genres={element.genres}
										id={element._id}
										views={element.views}
										chapters={element.chapters} />
								</span>
							);
						}.bind(this))}
					</div>
				</div>
			</section>
		);
	}
});