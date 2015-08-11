var React 			= require('react');
var Reflux 			= require('reflux');
var MangaStore 		= require('../../stores/Manga.store.jsx');
var MangaActions 	= require('../../actions/Directory.action.jsx');
var ClientActions 	= require('../../actions/Client.action.jsx');

var Stylesheet 		= require('./home.css');
var Header 			= require('../../components/debonair-header/Header.component.jsx');
var BookList 		= require('../../components/debonair-book-list/BookList.component.jsx');
var BookOverlay 	= require('../../components/debonair-book-overlay/BookOverlay.component.jsx');
var Reader 			= require('../../components/core-reader/Reader.component.jsx');

module.exports = HomeView = React.createClass({
	mixins: [Reflux.connect(MangaStore, 'data')],
	getInitialState: function()
	{
		return {
			showOverlay: false,
			showReader: false,
			searchResultText: ''
		};
	},
	componentWillMount: function()
	{
		// set reader to defaults
		this.readerBook = this.state.data.selectedBook;
        this.readerChapter = this.state.data.selectedChapter;
	},
	componentDidMount: function()
	{
		if(this.props.query.title)
		{
			this.setState({
				searchResultText: ''
			});
		}
		else
		{
			MangaActions.getPopularBooks(5);
			MangaActions.getTrendingBooks(5);
			MangaActions.getUpdatedBooks(5);
			MangaActions.getCategory('Action-Packed Marathon', {genres: 'shounen', min: 150});
			MangaActions.getCategory('Hopeless Romantic', {genres: 'romance ecchi', max: 100});
			MangaActions.getCategory('Good luck catching up', {min: 500});
			MangaActions.getCategory('Ongoing Harems', {genres: 'harem', status: 'ongoing'});
			MangaActions.getCategory('It\'s done so now you can binge read.', {status: 'complete'});
		}
	},
	searchForBook: function(title)
	{
		MangaActions.searchBooks({title: title});
	},
	openOverlay: function()
	{
		this.setState({showOverlay: true}, function(){
			React.findDOMNode(this.refs.overlay).focus();
		});
		document.body.classList.add('no-scroll');
	},
	closeOverlay: function()
	{
		this.setState({showOverlay: false});
		document.body.classList.remove('no-scroll');
	},
	openReader: function()
	{
		this.setState({showReader: true}, function(){
			React.findDOMNode(this.refs.reader).focus();
		});
	},
	closeReader: function()
	{
		this.setState({showReader: false});
	},
	_getChapterPreview: function(chapter)
	{
		return chapter.map(function(element){
			return element.image;
		}).splice(0,4);
	},
	_getChapterPages: function(chapter)
	{
		return chapter.map(function(element){
			return element.image;
		});
	},
	_updateReader: function()
	{
		this.readerBook = this.state.data.selectedBook;
		this.readerChapter = this.state.data.selectedChapter;
	},
	handlerSearch: function(value)
	{
		this.setState({
			searchResultText: value
		});
		this.searchForBook(value);
	},
	handlerBookSelect: function(data)
	{
		// missing keys in data
        data.numOfChapters = data.length;
        data.chapters = [];

		MangaActions.getChapter(data.id, 1);
        ClientActions.setSelectedBook(data);
		this.openOverlay();
	},
	handlerChapterSelect: function(value)
	{
		MangaActions.getChapter(this.state.data.selectedBook.id, value);
		this._updateReader();
	},
	handlerOverlayReadClick: function()
	{
		this.closeOverlay();
		this._updateReader();
		this.openReader();
		window.scrollTo(0,0);
	},
	handlerOverlayCloseHandler: function()
	{
		this.closeOverlay();
		ClientActions.clearSelectedBook();
	},
	handlerOverlayEsc: function(e)
	{
		if(e.key === 'Escape')
		{
			this.handlerOverlayCloseHandler();
		}
	},
	handlerReaderEsc: function(e)
	{
		if(e.key === 'Escape')
		{
			this.closeReader();
		}
	},
	render: function()
	{
		var mangaStore = this.state.data;
		var selectedChapterPages = this._getChapterPages(this.readerChapter.pages);

		var reader = (
			<div className="home-reader-wrapper" tabIndex="1" onKeyUp={this.handlerReaderEsc}>
				<Reader ref="reader"
					pages={selectedChapterPages}
					onChapterSelect={this.handlerChapterSelect}
					chapterLength={this.readerBook.numOfChapters}
					currentChapterNumber={this.readerChapter.number} />
				<div className="home-reader-close"><span onClick={this.closeReader}>X</span></div>
			</div>
		);

		var overlay = (
			<div ref="overlay" className="home-overlay" tabIndex="1" onKeyUp={this.handlerOverlayEsc}>
				<div>
					<BookOverlay
						coverUrl={mangaStore.selectedBook.coverUrl}
						genres={mangaStore.selectedBook.genres}
						author={mangaStore.selectedBook.author}
						summary={mangaStore.selectedBook.description}
						views={mangaStore.selectedBook.views.total}
						length={mangaStore.selectedBook.numOfChapters}
						status={mangaStore.selectedBook.status}
						title={mangaStore.selectedBook.title}
						min={1}
						value={mangaStore.selectedBook.number}
						max={mangaStore.selectedBook.numOfChapters}
						onClose={this.handlerOverlayCloseHandler}
						images={this._getChapterPreview(mangaStore.selectedChapter.pages)}
						onSelect={this.handlerChapterSelect}
						onReadClick={this.handlerOverlayReadClick} />
				</div>
			</div>
		);

		var general = (
			<div className="home-manga-general">
				<div className="home-manga-general-category-title"><span>Most Popular Manga</span></div>
				<BookList books={mangaStore.popularBooks} onSelect={this.handlerBookSelect} />
				<div className="home-manga-general-category-title"><span>Hottest Manga This Week</span></div>
				<BookList books={mangaStore.trendingBooks} onSelect={this.handlerBookSelect} />
				<div className="home-manga-general-category-title"><span>Newest Updates</span></div>
				<BookList books={mangaStore.updatedBooks} onSelect={this.handlerBookSelect} />
				{mangaStore.categories.map(function(element, index){
					return(
						<div key={index}>
							<div className="home-manga-general-category-title"><span>{element.categoryDescription}</span></div>
							<BookList books={element.books} onSelect={this.handlerBookSelect} />
						</div>
					);
				}.bind(this))}
			</div>
		);
		
		var searchResults = (
			<div className="home-manga-general">
				<span className="home-manga-general-category-title">{mangaStore.searchResults.length !== 0 ? mangaStore.searchResults.length : 'No '} Search Results</span>
				<BookList books={mangaStore.searchResults} onSelect={this.handlerBookSelect} />
			</div>
		);

		return(
			<div id="home-wrapper">
				{this.state.showOverlay ? overlay : ''}
				
				{this.state.showReader ? reader : ''}

				<Header title="debonair manga" onDebounce={this.handlerSearch} autofocus={true} />

				<div className="home-tab-stuff">
					<span>Naruto</span>
					<span>One Piece</span>
					<span>Bleach</span>
					<span>Magi</span>
					<span>Boku no Hero</span>
					<span>Toriko</span>
					<span>Seven Deadly Sins</span>
				</div>

				<div className="container">
					{this.state.searchResultText.length !== 0 ? searchResults : general}
				</div>
			</div>
		);
	}
});