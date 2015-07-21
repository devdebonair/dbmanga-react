var React = require('react');
var Stylesheet = require('./book-list.css');

module.exports = React.createClass({
	propTypes: {
		images: React.PropTypes.arrayOf(React.PropTypes.string)
	},
	getDefaultProps: function()
	{
		return {
			images: []
		};
	},
	render: function()
	{
		return(
			<section id="home-directory">
				<div className="container">
					<div id="home-book-list">
						{this.props.images.map(function(element, index){
							return(
								<div key={index} className="home-book-cover-wrapper"><img src={element} className="home-book-cover" /></div>
							);
						})}
					</div>
				</div>
			</section>
		);
	}
});