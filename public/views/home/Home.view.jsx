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
			showSmallHeader: true
		};
	},
	componentDidMount: function()
	{
		this.searchForBook('');
	},
	searchForBook: function(title)
	{
		MangaActions.searchBooks({title: title});
	},
	getChapter: function(id, chapterNumber)
	{
		MangaActions.getChapter(id, chapterNumber);
	},
	openOverlay: function()
	{
		this.setState({showOverlay: true});
		document.body.classList.add('no-scroll');
	},
	closeOverlay: function()
	{
		this.setState({showOverlay: false});
		document.body.classList.remove('no-scroll');
	},
	closeReader: function()
	{
		this.setState({showReader: false});
		ClientActions.clearSelectedBook();
	},
	getChapterPreview: function(chapters)
	{
		return chapters.map(function(element){
			return element.image;
		}).splice(0,4);
	},
	getChapterPages: function(chapter)
	{
		return chapter.map(function(element){
			return element.image;
		});
	},
	onSearchHandler: function(value)
	{
		this.searchForBook(value);
	},
	onBookSelectHandler: function(data)
	{
		var book = {
			id: data.id,
            coverUrl: data.coverUrl,
            genres: data.genres,
            author: data.author,
            description: data.description,
            views: data.views,
            numOfChapters: data.length,
            status: data.status,
            title: data.title,
            chapters: []
        };
        ClientActions.setSelectedBook(book);
		this.openOverlay();
		this.getChapter(data.id, 1);	
	},
	onChapterSelectHandler: function(value)
	{
		this.getChapter(this.state.data.selectedBook.id, value);
	},
	onReadClick: function()
	{
		this.closeOverlay();
		this.setState({showReader: true});
		window.scrollTo(0,0);
	},
	stickyHeaderHandler: function(shouldBeSticky)
	{
		if(shouldBeSticky)
		{
			return this.setState({showSmallHeader: true});
		}
		this.setState({showSmallHeader: false});
	},
	onOverlayCloseHandler: function()
	{
		this.closeOverlay();
		ClientActions.clearSelectedBook();
	},
	render: function()
	{
		var defaultStuff = {
            coverUrl: '',
            genres: [],
            author: '',
            summary: '',
            views: 0,
            length: 0,
            status: '',
            title: '',
            chapters: []
        };
        var data = this.state.data || {books:[], selectedBook: defaultStuff, selectedChapter: { number: 0, pages: [], title: ''}};
        var selectedChapter = data.selectedChapter;
		var selectedBook = data.selectedBook;
		var books = data.books;
		var selectedChapterPages = this.getChapterPages(selectedChapter.pages);
		if(selectedChapterPages.length === 0)
		{
			selectedChapterPages = ['http://placehold.it/1000x400/ffffff/59488B/&text=Loading...'];
		}

		var reader = (
			<div className="home-reader-wrapper">
				<Reader pages={selectedChapterPages} onChapterSelect={this.onChapterSelectHandler} chapterLength={selectedBook.numOfChapters} />
				<div className="home-reader-close"><span onClick={this.closeReader}>X</span></div>
			</div>
		);

		var overlay = (
			<div className="home-overlay">
				<div>
					<BookOverlay
						coverUrl={selectedBook.coverUrl}
						genres={selectedBook.genres}
						author={selectedBook.author}
						summary={selectedBook.description}
						views={selectedBook.views.total}
						length={selectedBook.numOfChapters}
						status={selectedBook.status}
						title={selectedBook.title}
						min={1}
						value={selectedChapter.number}
						max={selectedBook.numOfChapters}
						onClose={this.onOverlayCloseHandler}
						images={this.getChapterPreview(selectedChapter.pages)}
						onSelect={this.onChapterSelectHandler}
						onReadClick={this.onReadClick} />
				</div>
			</div>
		);

		return(
			<div id="home-wrapper">
				{this.state.showOverlay ? overlay : ''}
				
				{this.state.showReader ? reader : ''}

				<Header title="debonair manga" onDebounce={this.onSearchHandler} />

				<div className="container">
					<BookList books={books} onSelect={this.onBookSelectHandler} />
				</div>

			</div>
		);
	}
});