var React = require('react');
var Stylesheet = require('./home.css');
var Reflux = require('reflux');

var FeaturedBook = require('../../components/theme-featured-book/FeaturedBook.component.jsx');
var ReadingList = require('../../components/theme-reading-list/ReadingList.component.jsx');
var Dropdown = require('../../components/theme-select/Select.component.jsx');
var Search = require('../../components/theme-search-debounced/Search-Debounced.component.jsx');
var Button = require('../../components/theme-radial-button/Button.component.jsx');

var feature = {
	title: 'Naruto - The Seventh Hokage',
	description: 'Twelve years before the events at the focus of the series, the nine-tailed demon fox attacked Konohagakure. It was a powerful demon fox; a single swing of one of its nine tails would raise tsunamis and flatten mountains. It raised chaos and slaughtered many people, until the leader of the Leaf Village - the Fourth Hokage - defeated it by sacrificing his own life to seal the demon inside a newly-born child. That child\'s name was Naruto Uzumaki.',
	url: 'http://mangadoom.co/wp-content/manga/12804/2/50.jpg'
}

var bookmark = {
	title: 'BOOKMARK',
	items: [
		{ label:'ATTACK ON TITAN', value:'' },
		{ label:'DRAGON BALL', value:'' },
		{ label:'NARUTO - THE SEV...', value:'' }
	]
};


var trending = {
	title: 'TRENDING',
	items: [
		{ label:'ONE PIECE', value:'' },
		{ label:'BOKU NO HERO ACA...', value:'' },
		{ label:'NARUTO - THE SEV...', value:'' }
	]
};

var continue_reading = {
	title: 'CONTINUE READING',
	urlList: [
		'http://mcd.iosphe.re/n/47446/11/front/a/',
		'http://mcd.iosphe.re/t/3106/13/front/a/',
		'http://mangadoom.co/wp-content/manga/12804/2/50.jpg',
		'http://mcd.iosphe.re/n/16/1/front/a/',
		'http://mcd.iosphe.re/n/94802/1/front/a/'
	]
};

module.exports = React.createClass({
	render: function()
	{
		return(
			<div id="home-wrapper">
				<div id="home-container">
					<section id="home-toolbar">
						<div id="home-continue-button"><Button title="continue reading" size={14} /></div>
						<div id="home-browse-button"><Button title="browse manga" size={14} /></div>
						<div id="home-search"><Search placeholder="Search..." /></div>
					</section>
					<div id="home-content-wrapper">
						<section id="home-content">
							<div id="home-feature">
								<FeaturedBook title={feature.title} description={feature.description} url={feature.url} />
							</div>
							<div id="home-reading-list-continue">
								<ReadingList title={continue_reading.title} urlList={continue_reading.urlList} width={213} />
							</div>
						</section>
						<section id="home-quick-links">
							<div><Dropdown title={bookmark.title} items={bookmark.items} /></div>
							<div><Dropdown title={trending.title} items={trending.items} /></div>
						</section>
					</div>
				</div>
			</div>
		);
	}
});