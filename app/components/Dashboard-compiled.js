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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dashboard = function (_React$Component) {
  (0, _inherits3.default)(Dashboard, _React$Component);

  function Dashboard() {
    (0, _classCallCheck3.default)(this, Dashboard);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Dashboard).apply(this, arguments));
  }

  (0, _createClass3.default)(Dashboard, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'article',
        null,
        _react2.default.createElement(
          'section',
          { className: 'text-section' },
          _react2.default.createElement(
            'h1',
            null,
            'Dashboard'
          ),
          _react2.default.createElement(
            'p',
            null,
            'Welcome, you are logged in! To have a look at the code behind this application, go to ',
            _react2.default.createElement(
              'a',
              { href: 'https://github.com/sotojuan/saga-login-flow' },
              'Github'
            ),
            '.'
          )
        )
      );
    }
  }]);
  return Dashboard;
}(_react2.default.Component);

exports.default = Dashboard;

//# sourceMappingURL=Dashboard-compiled.js.map