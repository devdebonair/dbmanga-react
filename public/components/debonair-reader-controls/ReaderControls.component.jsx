var React 		= require('react');
var Stylesheet 	= require('./reader-controls.css');
var Range 		= require('../debonair-range/Range.component.jsx');
var Icon 		= require('../core-icon-font/IconFont.component.jsx');
var debounce 	= require('../../mixins/debounce');

module.exports = ReaderControls = React.createClass({
	propTypes: {
		min: 					React.PropTypes.number,
		max: 					React.PropTypes.number,
		currentChapterNumber: 	React.PropTypes.number,
		onFullscreen: 			React.PropTypes.func,
		onDayToggle: 			React.PropTypes.func,
		onPrevious: 			React.PropTypes.func,
		onNext: 				React.PropTypes.func,
		onPlay: 				React.PropTypes.func,
		onDual: 				React.PropTypes.func,
		onChapterSelect: 		React.PropTypes.func
	},
	getDefaultProps: function()
	{
		return {
			min: 1,
			max: 100,
			currentChapterNumber: 1,
			onFullscreen: function(){},
			onDayToggle: function(){},
			onPrevious: function(){},
			onNext: function(){},
			onPlay: function(){},
			onDual: function(){},
			onChapterSelect: function(){}
		};
	},
	getInitialState: function()
	{
		return {
			isChapterView: false,
			currentChapter: this.props.currentChapterNumber
		};
	},
	componentWillReceiveProps: function(nextProps)
	{
		if(this.props.currentChapterNumber !== nextProps.currentChapterNumber)
		{
			this.setState({currentChapter: nextProps.currentChapterNumber});
		}
	},
	chapterChangeHandler: function(value)
	{
		this.setState({
			currentChapter: value
		});
	},
	chapterSelectHandler: function(value)
	{
		this.props.onChapterSelect(value);
	},
	chapterClickHandler: function()
	{
		this.setState({
			isChapterView: !this.state.isChapterView
		});
	},
	getPreviousChapter: function()
	{
		var previousChapter = parseInt(this.state.currentChapter) - 1;
		this.chapterSelectHandler(previousChapter);
		this.setState({
			currentChapter: previousChapter
		});
	},
	getNextChapter: function()
	{
		var nextChapter = parseInt(this.state.currentChapter) + 1;
		this.chapterSelectHandler(nextChapter);
		this.setState({
			currentChapter: nextChapter
		});
	},

	render: function()
	{
		return(
			<div className="reader-controls-wrapper">
				<div className={'reader-controls-general' + (this.state.isChapterView ? ' no-display' : '')} >
					<div onClick={this.props.onFullscreen}><span className="reader-controls-icon"><Icon icon="fullscreen" color="#863D91" size={32}/></span></div>
					<div onClick={this.getPreviousChapter}><span className="reader-controls-icon"><Icon icon="skip_previous" color="#863D91" size={32}/></span></div>
					<div onClick={this.props.onPrevious}><span className="reader-controls-icon"><Icon icon="fast_rewind" color="#863D91" size={32}/></span></div>
					<div onClick={this.chapterClickHandler}><span className="reader-controls-icon">Chapter {this.state.currentChapter}</span></div>
					<div onClick={this.props.onNext}><span className="reader-controls-icon"><Icon icon="fast_forward" color="#863D91" size={32}/></span></div>
					<div onClick={this.getNextChapter}><span className="reader-controls-icon"><Icon icon="skip_next" color="#863D91" size={32}/></span></div>
					<div onClick={this.props.onDayToggle}><span className="reader-controls-icon"><Icon icon="brightness_5" color="#863D91" size={32}/></span></div>
				</div>
				<div className={'reader-controls-chapters' + (this.state.isChapterView ? '' : ' no-display')}>
					<div>
						<span>Chapter {this.state.currentChapter}</span>
					</div>
					<div>
						<Range min={this.props.min} max={this.props.max} value={this.state.currentChapterNumber} onChange={this.chapterChangeHandler} onDebounce={this.chapterSelectHandler} value={this.props.value} />
					</div>
					<div onClick={this.chapterClickHandler}><span className="reader-controls-icon"><Icon icon="keyboard_arrow_left" color="#863D91" size={32}/></span></div>
				</div>
			</div>
		);
	}
});