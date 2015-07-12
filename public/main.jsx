var React = require('react');
var Select = require('./components/select/Select.component.jsx');

React.render(
	<Select>
		<a onClick={function(){console.log('swagger')}} className="dropdown-trigger">Toggle</a>
		<ul className="dropdown-menu">
			<li>Item 1</li>
			<li>Item 2</li>
			<li>Item 3</li>
		</ul>
	</Select>, document.getElementById('app'));