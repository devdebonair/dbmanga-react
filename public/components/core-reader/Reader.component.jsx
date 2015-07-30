var React = require('react');
var Slider = require('nuka-carousel');
var Stylesheet = require('./reader.css');

module.exports = React.createClass({
	propTypes: {
		currentPage:	React.PropTypes.number,
		pages: 			React.PropTypes.arrayOf(React.PropTypes.string)
	},
	getDefaultProps: function()
	{
		return {
			currentPage: 0,
			pages: ['http://placehold.it/1000x400/ffffff/c0392b/&text=Loading...']
		};
	},
	render: function() 
	{
		var settings = {
			dots: false,
			infinite: false,
			speed: 100,
			initialSlide: 0,
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: true
		};
		return (
			<div>
				<Slider {...settings}>
					{this.props.pages.map(function(element, index){
						return(
							<div key={index} className="reader-image-wrapper"><img src={element} className="reader-image"></img></div>
						);
					})}
				</Slider>
			</div>
		);
	}
});