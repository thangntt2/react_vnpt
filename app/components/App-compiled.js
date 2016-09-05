'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Nav = require('./common/Nav');

var _Nav2 = _interopRequireDefault(_Nav);

var _Sidebar = require('./Sidebar');

var _Sidebar2 = _interopRequireDefault(_Sidebar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loader = require('react-loader');

var App = function (_Component) {
  (0, _inherits3.default)(App, _Component);

  function App() {
    (0, _classCallCheck3.default)(this, App);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(App).apply(this, arguments));
  }

  (0, _createClass3.default)(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'wrapper' },
        _react2.default.createElement(_Nav2.default, { loggedIn: this.props.data.loggedIn,
          currentlySending: this.props.data.currentlySending,
          history: this.props.history,
          dispatch: this.props.dispatch,
          location: this.props.location }),
        this.props.data.loggedIn ? _react2.default.createElement(
          'div',
          { className: 'Sidebar' },
          ' ',
          _react2.default.createElement(_Sidebar2.default, null),
          ' '
        ) : null,
        _react2.default.createElement(
          'div',
          { className: 'below_wrapper' },
          _react2.default.createElement(
            Loader,
            { loaded: !this.props.data.currentlySending },
            this.props.children
          )
        )
      );
    }
  }]);
  return App;
}(_react.Component);

App.propTypes = {
  data: _react2.default.PropTypes.object,
  history: _react2.default.PropTypes.object,
  location: _react2.default.PropTypes.object,
  children: _react2.default.PropTypes.object,
  dispatch: _react2.default.PropTypes.func
};

function select(state) {
  return {
    data: state
  };
}

exports.default = (0, _reactRedux.connect)(select)(App);

//# sourceMappingURL=App-compiled.js.map