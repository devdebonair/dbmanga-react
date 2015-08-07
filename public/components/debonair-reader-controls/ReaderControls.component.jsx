var React = require('react');
var Stylesheet = require('./reader-controls.css');
var Range = require('../debonair-range/Range.component.jsx');
var Icon = require('../core-icon-font/IconFont.component.jsx');

module.exports = ReaderControls = React.createClass({
	propTypes: {
		min: 				React.PropTypes.number,
		max: 				React.PropTypes.number,
		value: 				React.PropTypes.number,
		onFullscreen: 		React.PropTypes.func,
		onDayToggle: 		React.PropTypes.func,
		onPrevious: 		React.PropTypes.func,
		onNext: 			React.PropTypes.func,
		onPlay: 			React.PropTypes.func,
		onDual: 			React.PropTypes.func,
		onChapterSelect: 	React.PropTypes.func
	},
	getDefaultProps: function()
	{
		return {
			min: 1,
			max: 100,
			value: 1,
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
			currentChapter: 1
		};
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
	render: function()
	{
		return(
			<div className="reader-controls-wrapper">
				<div className={'reader-controls-general' + (this.state.isChapterView ? ' no-display' : '')} >
					<div onClick={this.props.onFullscreen}><span className="reader-controls-icon"><Icon icon="fullscreen" color="#863D91" size={32}/></span></div>
					<div onClick={this.props.onDayToggle}><span className="reader-controls-icon"><Icon icon="brightness_5" color="#863D91" size={32}/></span></div>
					<div onClick={this.props.onPrevious}><span className="reader-controls-icon"><Icon icon="fast_rewind" color="#863D91" size={32}/></span></div>
					<div onClick={this.chapterClickHandler}><span className="reader-controls-icon">Chapter {this.state.currentChapter}</span></div>
					<div onClick={this.props.onNext}><span className="reader-controls-icon"><Icon icon="fast_forward" color="#863D91" size={32}/></span></div>
					<div onClick={this.props.onPlay}><span className="reader-controls-icon"><Icon icon="play_arrow" color="#863D91" size={32}/></span></div>
					<div onClick={this.props.onDual}><span className="reader-controls-icon"><Icon icon="chrome_reader_mode" color="#863D91" size={32}/></span></div>
				</div>
				<div className={'reader-controls-chapters' + (this.state.isChapterView ? '' : ' no-display')}>
					<div>
						<span>Chapter {this.state.currentChapter}</span>
					</div>
					<div>
						<Range min={this.props.min} max={this.props.max} value={this.props.value} onChange={this.chapterChangeHandler} onDebounce={this.chapterSelectHandler} value={this.props.value} />
					</div>
					<div onClick={this.chapterClickHandler}><span className="reader-controls-icon"><Icon icon="keyboard_arrow_left" color="#863D91" size={32}/></span></div>
				</div>
			</div>
		);
	}
});