var React = require('react');
var Select = require('./components/theme-select/Select.component.jsx');
var Search = require('./components/core-search/Search.component.jsx');

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

var change = function(val)
{
	console.log('Changed:\t%s', val);
}

var debounce = function(val)
{
	console.log('Debounced:\t%s', val);
}

React.render(<Search placeholder="Search..." onChange={change} onDebounce={debounce} />, document.getElementById('app'));