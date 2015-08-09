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
		if(this.props.query.title)
		{
			this.searchForBook(this.props.query.title);
		}
		else
		{
			MangaActions.getPopularBooks(5);
			MangaActions.getTrendingBooks(5);
			MangaActions.getUpdatedBooks(5);
		}
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
	getChapterPreview: function(chapter)
	{
		return chapter.map(function(element){
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
		var mangaStore = this.state.data;
		var selectedChapterPages = this.getChapterPages(mangaStore.selectedChapter.pages);
		if(selectedChapterPages.length === 0)
		{
			selectedChapterPages = ['http://placehold.it/1000x400/ffffff/59488B/&text=Loading...'];
		}

		var reader = (
			<div className="home-reader-wrapper">
				<Reader pages={selectedChapterPages} onChapterSelect={this.onChapterSelectHandler} chapterLength={mangaStore.selectedBook.numOfChapters} currentChapterNumber={mangaStore.selectedChapter.number} />
				<div className="home-reader-close"><span onClick={this.closeReader}>X</span></div>
			</div>
		);

		console.log(mangaStore.selectedBook);

		var overlay = (
			<div className="home-overlay">
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
						onClose={this.onOverlayCloseHandler}
						images={this.getChapterPreview(mangaStore.selectedChapter.pages)}
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
					<div>
						<div><span>Popular</span></div>
						<BookList books={this.state.data.popularBooks} onSelect={this.onBookSelectHandler} />
						<div><span>Trending</span></div>
						<BookList books={this.state.data.trendingBooks} onSelect={this.onBookSelectHandler} />
						<div><span>Updated</span></div>
						<BookList books={this.state.data.updatedBooks} onSelect={this.onBookSelectHandler} />
					</div>
				</div>

			</div>
		);
	}
});