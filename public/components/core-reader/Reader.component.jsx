var React = require('react');
var Slider = require('nuka-carousel');
var Stylesheet = require('./reader.css');
var ReaderControls = require('../debonair-reader-controls/ReaderControls.component.jsx');

module.exports = React.createClass({
	mixins: [Slider.ControllerMixin],
	propTypes: {
		currentPage:		React.PropTypes.number,
		pages: 				React.PropTypes.arrayOf(React.PropTypes.string),
		chapterLength: 		React.PropTypes.number,
		onChapterSelect: 	React.PropTypes.func
 	},
	getDefaultProps: function()
	{
		return {
			currentPage: 0,
			isNight: false,
			onChapterSelect: function(){},
			pages: ['http://placehold.it/1000x400/ffffff/59488B/&text=Loading...']
		};
	},
	goToNextPage: function()
	{
		this.state.carousels.slider.nextSlide();
	},
	goToPreviousPage: function()
	{
		this.state.carousels.slider.previousSlide();
	},
	toggleNight: function()
	{
		this.setState({
			isNight: !this.state.isNight
		});
	},
	keyHandler: function(e)
	{
		if(e.key === 'ArrowRight')
		{
			return this.goToNextPage();
		}

		if(e.key === 'ArrowLeft')
		{
			return this.goToPreviousPage();
		}
	},
	onChapterSelectHandler: function(value)
	{
		this.props.onChapterSelect(value);
	},
	render: function() 
	{
		return (
			<div className={'reader-wrapper' + (this.state.isNight ? ' night' : '') } tabIndex="0" onKeyUp={this.keyHandler}>
				<Slider speed={100} ref="slider" data={this.setCarouselData.bind(this, 'slider')}>
					{this.props.pages.map(function(element, index){
						return(
							<div key={index} className="reader-image-wrapper"><img src={element} className="reader-image"></img></div>
						);
					}.bind(this))}
				</Slider>
				<div className="reader-controller-wrapper">
					<ReaderControls
						min={1}
						max={this.props.chapterLength}
						onPrevious={this.goToPreviousPage}
						onNext={this.goToNextPage}
						onPageSelect={this.goToPage}
						onDayToggle={this.toggleNight}
						onChapterSelect={this.onChapterSelectHandler} />
				</div>
			</div>
		);
	}
});