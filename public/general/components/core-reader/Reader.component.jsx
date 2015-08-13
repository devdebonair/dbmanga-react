var React 			= require('react');
var Slider 			= require('nuka-carousel');
var Stylesheet 		= require('./reader.css');
var ReaderControls 	= require('../debonair-reader-controls/ReaderControls.component.jsx');
var ScreenFull 		= require('screenfull');

module.exports = React.createClass({
	mixins: [Slider.ControllerMixin],
	propTypes: {
		pages: 					React.PropTypes.arrayOf(React.PropTypes.string),
		chapterLength: 			React.PropTypes.number,
		onChapterSelect: 		React.PropTypes.func,
		currentChapterNumber: 	React.PropTypes.number
 	},
	getDefaultProps: function()
	{
		return {
			isNight: 				false,
			onChapterSelect: 		function(){},
			currentChapterNumber: 	0,
			pages: 					['http://placehold.it/1000x400/ffffff/59488B/&text=Loading...']
		};
	},
	componentDidMount: function()
	{
		React.findDOMNode(this.refs.reader).focus();
	},
	componentWillReceiveProps: function(swag, swagger)
	{
		this.goToPage(0);
	},
	goToNextPage: function()
	{
		this.state.carousels.slider.nextSlide();
	},
	goToPreviousPage: function()
	{
		this.state.carousels.slider.previousSlide();
	},
	goToPage: function(pageNumber)
	{
		this.state.carousels.slider.goToSlide(pageNumber);
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
		this.goToPage(0);
	},
	onFullscreenHandler: function()
	{
		if(ScreenFull.enabled)
		{
			ScreenFull.toggle(this.getDOMNode());
		}
	},
	render: function() 
	{
		return (
			<div ref="reader" className={'reader-wrapper' + (this.state.isNight ? ' night' : ' light') } tabIndex="0" onKeyDown={this.keyHandler}>
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
						onChapterSelect={this.onChapterSelectHandler}
						onFullscreen={this.onFullscreenHandler}
						currentChapterNumber={this.props.currentChapterNumber} />
				</div>
			</div>
		);
	}
});