var React = require('react');
var Select = require('./components/select/Select.component.jsx');

React.render(<Select title="GENRES" items={[{label: 'Shounen', value: 'SHOUNEN'},{label: 'Harem', value: 'HAREM'},{label: 'Seinen', value: 'SEINEN'}]}/>, document.getElementById('app'));