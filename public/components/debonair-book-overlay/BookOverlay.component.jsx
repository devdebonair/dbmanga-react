var React = require('react');
var Stylesheet = require('./book-overlay.css');
var IconText = require('../debonair-icon-text/IconText.component.jsx');
var Range = require('../debonair-range/Range.component.jsx');

function formatNumberWithCommas(number)
{
	return (number + '').replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}

module.exports = BookOverlay = React.createClass({
	propTypes: {
		min: 			React.PropTypes.number,
		max: 			React.PropTypes.number,
		images: 		React.PropTypes.arrayOf(React.PropTypes.string),
		coverUrl: 		React.PropTypes.string,
		genres: 		React.PropTypes.arrayOf(React.PropTypes.string),
		author: 		React.PropTypes.string,
		views: 			React.PropTypes.number,
		length: 		React.PropTypes.number,
		status: 		React.PropTypes.string,
		title: 			React.PropTypes.string,
		summary: 		React.PropTypes.string,
		onClose: 		React.PropTypes.func,
		onSelect: 		React.PropTypes.func,
		onChange: 		React.PropTypes.func,
		onReadClick:	React.PropTypes.func,
		value: 			React.PropTypes.number
	},
	getInitialState: function()
	{
		return {
			chapter: 1,
			isChapter: false
		};
	},
	showChapterSection: function()
	{
		this.setState({isChapter: true});
	},
	closeChapterSection: function()
	{
		this.setState({isChapter: false});
	},
	changeHandler: function(value)
	{
		this.setState({chapter: value});
	},
	debounceHandler: function(value)
	{
		this.props.onSelect(value);
	},
	closeHandler: function()
	{
		this.closeChapterSection();
		this.props.onClose();
	},
	render: function()
	{
		return(
			<section className="book-overlay-wrapper">
				
				<div className="book-overlay-image">
					<img src={this.props.coverUrl} />
				</div>

				<div>
					<div className="book-overlay-details">
					<section className={this.state.isChapter ? 'no-display' : ''} >

						<div className="book-overlay-title">{this.props.title}</div>

						<div className="book-overlay-genres">
							{this.props.genres.map(function(element, index){
								return(
									<span key={index}>{element}</span>
								);
							}.bind(this))}
						</div>

						<div className="book-overlay-content">
							<div className="book-overlay-summary-icons">
								<div>
									<IconText icon="face" iconColor="#FFF" text={this.props.author} iconSize={24} />
								</div>
								<div>
									<IconText icon="remove_red_eye" iconColor="#FFF" text={formatNumberWithCommas(this.props.views) + ' Views'} iconSize={24} />
								</div>
								<div>
									<IconText icon="book" iconColor="#FFF" text={this.props.length + ' Chapters'} iconSize={24} />
								</div>
								<div>
									<IconText icon="autorenew" iconColor="#FFF" text={this.props.status + ' Status'} iconSize={24} />
								</div>
							</div>

							<div className="book-overlay-summary">
								<div className="book-overlay-summary-description">
									{this.props.summary}
								</div>
							</div>
						</div>

						<div className="book-overlay-button-wrapper">
							<button className="book-overlay-button" onClick={this.props.onReadClick}>Read Now</button>
							<button className="book-overlay-button" onClick={this.showChapterSection}>Chapters</button>
						</div>
					</section>

					<section className={this.state.isChapter ? "book-overlay-chapter-preview" : 'no-display'}>
						<span className="book-overlay-chapter-preview-title">Chapter {this.state.chapter}</span>
						<div className="book-overlay-chapter-preview-image-wrapper">
							{this.props.images.map(function(element, index){
								return(
									<img key={index} className="book-overlay-chapter-preview-image" src={element} />
								);
							})}
						</div>
						<div><Range min={1} max={this.props.length} onChange={this.changeHandler} onDebounce={this.debounceHandler} value={1} /></div>
					</section>
				</div>

				</div>
				<div className="book-overlay-close"><span onClick={this.closeHandler}>X</span></div>
			</section>
		);
	}
});