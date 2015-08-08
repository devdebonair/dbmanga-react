var React = require('react');

var DropdownContent = React.createClass({
    render: function(){
        var dropdown_content_classes = 'dropdown__content ' + this.props.className;
        return React.createElement( 'div', {
            className: dropdown_content_classes
        }, this.props.children );
    }
});

module.exports = DropdownContent;