var React = require('react');
var Select = require('./components/theme-select/Select.component.jsx');
var Search = require('./components/theme-search-debounced/Search-Debounced.component.jsx');
var Book = require('./components/theme-book/Book.component.jsx');
var Range = require('./components/theme-range/Range.component.jsx');
var Button = require('./components/theme-radial-button/Button.component.jsx');
var ReadingList = require('./components/theme-reading-list/ReadingList.component.jsx');
var FeaturedBook = require('./components/theme-featured-book/FeaturedBook.component.jsx');

var genres = [
	{label: 'Shounen', value: 'SHOUNEN'},
	{label: 'Seinen', value: 'SEINEN'},
	{label: 'Adventure', value: 'ADVENTURE'},
	{label: 'Romance', value: 'ROMANCE'},
	{label: 'Shoujo', value: 'SHOUJO'},
	{label: 'Harem', value: 'HAREM'},
	{label: 'Slice of Life', value: 'SLICE OF LIFE'},
	{label: 'Ecchi', value: 'ECCHI'},
	{label: 'Mature', value: 'MATURE'}
];

var urlList = [
	'http://mcd.iosphe.re/n/3106/13/front/a/',
	'http://mcd.iosphe.re/n/87515/1/front/a/',
	'http://mcd.iosphe.re/n/15/68/front/a/',
	'http://mcd.iosphe.re/n/75929/2/front/a/',
	'http://mcd.iosphe.re/n/76715/1/front/a/',
	'http://mcd.iosphe.re/n/3106/13/front/a/',
	'http://mcd.iosphe.re/n/87515/1/front/a/'
];

var feature = {
	title: 'naruto - the seventh hokage',
	description: 'Twelve years before the events at the focus of the series, the nine-tailed demon fox attacked Konohagakure. It was a powerful demon fox; a single swing of one of its nine tails would raise tsunamis and flatten mountains. It raised chaos and slaughtered many people, until the leader of the Leaf Village - the Fourth Hokage - defeated it by sacrificing his own life to seal the demon inside a newly-born child. That child\'s name was Naruto Uzumaki.',
	url: 'http://mcd.iosphe.re/n/3106/13/front/a/'
};

React.render(<FeaturedBook title={feature.title} description={feature.description} url={feature.url}  />, document.getElementById('app'));