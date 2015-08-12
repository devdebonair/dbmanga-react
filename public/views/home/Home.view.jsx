var React 				= require('react');
var Reflux 				= require('reflux');
var ApplicationStore 	= require('../../stores/Application.store.jsx');
var ApplicationActions 	= require('../../actions/Application.action.jsx');
var Router				= require('react-router');

var Stylesheet 			= require('./home.css');
var Header 				= require('../../components/debonair-header/Header.component.jsx');
var BookList 			= require('../../components/debonair-book-list/BookList.component.jsx');
var BookOverlay 		= require('../../components/debonair-book-overlay/BookOverlay.component.jsx');
var Reader 				= require('../../components/core-reader/Reader.component.jsx');

module.exports = HomeView = React.createClass({
	mixins: [
		Reflux.connect(ApplicationStore, 'app'), 
		Router.State, 
		Router.Navigation
	],
	componentWillMount: function()
	{
		// set reader to defaults
		ApplicationActions.getPopularBooks(5);
		ApplicationActions.getTrendingBooks(5);
		ApplicationActions.getUpdatedBooks(5);
		ApplicationActions.getCategory('Action-Packed Marathon', {genres: 'shounen', min: 150});
		ApplicationActions.getCategory('Hopeless Romantic', {genres: 'romance ecchi', max: 100});
		ApplicationActions.getCategory('Good luck catching up', {min: 500});
		ApplicationActions.getCategory('Ongoing Harems', {genres: 'harem', status: 'ongoing'});
		ApplicationActions.getCategory('It\'s done so now you can binge read.', {status: 'complete'});
	},
	handlerSearchDebounce: function(value)
	{
		if(this.state.app.searchTerm !== '')
		{
			ApplicationActions.searchBooks({title: value});
		}
	},
	handlerSearchChange: function(value)
	{
		ApplicationActions.setSearchTerm(value);
	},
	handlerBookSelect: function(data)
	{
		data.chapters = [];
        ApplicationActions.setSelectedBook(data);
		ApplicationActions.selectChapter(data.id, 1);
	},
	handlerChapterSelect: function(value)
	{
		ApplicationActions.selectChapter(this.state.app.selectedBook.id, value);
	},
	handlerReaderChapterSelect: function(value)
	{
		ApplicationActions.getReaderChapter(this.state.app.readerBook.id, value);
	},
	handlerOverlayReadClick: function()
	{
		ApplicationActions.setReaderChapter(this.state.app.selectedChapter);
		ApplicationActions.setReaderBook(this.state.app.selectedBook);
		ApplicationActions.clearSelectedBook();
		window.scrollTo(0,0);
	},
	handlerOverlayCloseHandler: function()
	{
		ApplicationActions.clearSelectedBook();
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
			ApplicationActions.clearReaderBook();
		}
	},
	handlerHeaderTitleClick: function()
	{
		ApplicationActions.setSearchTerm('');
		ApplicationActions.clearSearchResults();
	},
	handlerReaderClose: function()
	{
		ApplicationActions.clearReaderBook();
		ApplicationActions.clearReaderChapter();
	},
	render: function()
	{
		var readerPages = this.state.app.readerChapter.pages.map(function(element){
			return element.image;
		});

		console.log(this.state.app.selectedChapter);
		var selectedChapterPreview = this.state.app.selectedChapter.pages.map(function(element){
			return element.image;
		}).slice(0,4);

		/********************
		 *
		 *	Components
		 *
		 ********************/
		var reader = (
			<div className="home-reader-wrapper" tabIndex="1" onKeyUp={this.handlerReaderEsc}>
				<Reader ref="reader"
					pages={readerPages}
					onChapterSelect={this.handlerReaderChapterSelect}
					chapterLength={this.state.app.readerBook.numOfChapters}
					currentChapterNumber={this.state.app.readerChapter.number} />
				<div className="home-reader-close"><span onClick={this.handlerReaderClose}>X</span></div>
			</div>
		);

		var overlay = (
			<div ref="overlay" className="home-overlay" tabIndex="1" onKeyUp={this.handlerOverlayEsc}>
				<div>
					<BookOverlay
						coverUrl={this.state.app.selectedBook.coverUrl}
						genres={this.state.app.selectedBook.genres}
						author={this.state.app.selectedBook.author}
						summary={this.state.app.selectedBook.description}
						views={this.state.app.selectedBook.views.total}
						numOfChapters={this.state.app.selectedBook.numOfChapters}
						status={this.state.app.selectedBook.status}
						title={this.state.app.selectedBook.title}
						min={1}
						value={this.state.app.selectedBook.number}
						max={this.state.app.selectedBook.numOfChapters}
						onClose={this.handlerOverlayCloseHandler}
						images={selectedChapterPreview}
						onSelect={this.handlerChapterSelect}
						onReadClick={this.handlerOverlayReadClick} />
				</div>
			</div>
		);

		var general = (
			<div className="home-manga-general">
				<div className="home-manga-general-category-title"><span>Most Popular Manga</span></div>
				<BookList books={this.state.app.popularBooks} onSelect={this.handlerBookSelect} />
				<div className="home-manga-general-category-title"><span>Hottest Manga This Week</span></div>
				<BookList books={this.state.app.trendingBooks} onSelect={this.handlerBookSelect} />
				<div className="home-manga-general-category-title"><span>Newest Updates</span></div>
				<BookList books={this.state.app.updatedBooks} onSelect={this.handlerBookSelect} />
				{this.state.app.categories.map(function(element, index){
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
				<span className="home-manga-general-category-title">{this.state.app.searchResults.length !== 0 ? this.state.app.searchResults.length : 'No '} Search Results</span>
				<BookList books={this.state.app.searchResults} onSelect={this.handlerBookSelect} />
			</div>
		);

		/********************
		 *
		 *	Render
		 *
		 ********************/
		return(
			<div id="home-wrapper">
				{this.state.app.selectedBook.id !== '' ? overlay : ''}
				
				{this.state.app.readerBook.id !== '' ? reader : ''}

				<Header 
					title="debonair manga" 
					onDebounce={this.handlerSearchDebounce} 
					onChange={ApplicationActions.setSearchTerm} 
					autofocus={true} 
					onTitleClick={this.handlerHeaderTitleClick}
					searchTerm={this.state.app.searchTerm} />

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
					{this.state.app.searchTerm !== '' ? searchResults : general}
				</div>
			</div>
		);
	}
});