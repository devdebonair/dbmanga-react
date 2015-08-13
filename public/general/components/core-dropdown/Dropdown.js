var React = require('react');
var cx = require('../../mixins/classnames');
var Stylesheets = require('./Dropdown.css');

var DropdownTrigger = require('./DropdownTrigger.js');
var DropdownContent = require('./DropdownContent.js');

var Dropdown = React.createClass({
    getInitialState: function(){
        return {
            active: false
        };
    },
    componentDidMount: function () {
        window.addEventListener( 'click', this._onWindowClick );
    },
    componentWillUnmount: function () {
        window.removeEventListener( 'click', this._onWindowClick );
    },
    render: function () {
        // create component classes
        var active = this.isActive();
        var dropdown_classes = cx({
            dropdown: true,
            'dropdown--active': active
        });
        dropdown_classes += ' ' + this.props.className;
        // stick callback on trigger element
        var children = React.Children.map( this.props.children, function( child ){
            if( child.type === DropdownTrigger ){
                child = React.cloneElement( child, {
                    ref: 'trigger',
                    onClick: this._onToggleClick
                });
            }
            return child;
        }, this);
        return React.createElement('div', {
            className: dropdown_classes
        }, children);
    },
    isActive: function(){
        return ( typeof this.props.active === 'boolean' ) ?
            this.props.active :
            this.state.active;
    },
    hide: function(){
        this.setState({
            active: false
        });
        if( this.props.onHide ){
            this.props.onHide();
        }
    },
    show: function(){
        this.setState({
            active: true
        });
        if( this.props.onShow ){
            this.props.onShow();
        }
    },
    _onWindowClick: function( event ){
        var dropdown_element = this.getDOMNode();
        if( event.target !== dropdown_element && !dropdown_element.contains( event.target ) && this.isActive() ){
            this.hide();
        }
    },
    _onToggleClick: function( event ){
        event.preventDefault();
        if( this.isActive() ){
            this.hide();
        } else {
            this.show();
        }
    }
});

module.exports = Dropdown;
module.exports.DropdownTrigger = DropdownTrigger;
module.exports.DropdownContent = DropdownContent;