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

var _reactRouter = require('react-router');

var _actions = require('../../actions');

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Navibar = function (_Component) {
  (0, _inherits3.default)(Navibar, _Component);

  function Navibar(props) {
    (0, _classCallCheck3.default)(this, Navibar);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Navibar).call(this, props));

    _this._logout = _this._logout.bind(_this);
    _this._clearError = _this._clearError.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Navibar, [{
    key: 'render',
    value: function render() {
      var navButtons = this.props.loggedIn ? _react2.default.createElement(
        _reactBootstrap.Navbar.Collapse,
        null,
        _react2.default.createElement(
          _reactBootstrap.Nav,
          { pullLeft: true },
          _react2.default.createElement(
            _reactBootstrap.NavItem,
            { eventKey: 1, onClick: function onClick() {
                return _reactRouter.browserHistory.push("/metacontents");
              } },
            'Metacontents'
          ),
          _react2.default.createElement(
            _reactBootstrap.NavItem,
            { eventKey: 2, onClick: function onClick() {
                return _reactRouter.browserHistory.push("/channels");
              } },
            'Channel'
          ),
          _react2.default.createElement(
            _reactBootstrap.NavItem,
            { eventKey: 3, onClick: function onClick() {
                return _reactRouter.browserHistory.push("/keyword");
              } },
            'Keywords'
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.Nav,
          { pullRight: true },
          _react2.default.createElement(
            _reactBootstrap.NavDropdown,
            { eventKey: 3, id: 'create', title: _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'plus' }) },
            _react2.default.createElement(
              _reactBootstrap.MenuItem,
              { eventKey: 3.1,
                onClick: function onClick() {
                  return _reactRouter.browserHistory.push("/channels/create");
                }
              },
              'Channel'
            ),
            _react2.default.createElement(
              _reactBootstrap.MenuItem,
              { eventKey: 3.2,
                onClick: function onClick() {
                  return _reactRouter.browserHistory.push("/metacontents/create");
                }
              },
              'Metacontent'
            ),
            _react2.default.createElement(
              _reactBootstrap.MenuItem,
              { eventKey: 3.3,
                onClick: function onClick() {
                  return _reactRouter.browserHistory.push("/keyword/create");
                }
              },
              'Keyword'
            )
          ),
          _react2.default.createElement(
            _reactBootstrap.NavItem,
            { eventKey: 1, onClick: this._logout.bind(this) },
            'Logout'
          )
        )
      ) : _react2.default.createElement(
        _reactBootstrap.Navbar.Collapse,
        null,
        _react2.default.createElement(
          _reactBootstrap.Nav,
          { pullRight: true },
          _react2.default.createElement(
            _reactBootstrap.NavItem,
            { eventKey: 1, href: '/login' },
            'Login'
          )
        )
      );

      return _react2.default.createElement(
        _reactBootstrap.Navbar,
        { staticTop: true },
        _react2.default.createElement(
          _reactBootstrap.Navbar.Brand,
          null,
          _react2.default.createElement(
            'a',
            { href: '#' },
            'VNPT EPG'
          )
        ),
        navButtons
      );
    }
  }, {
    key: '_logout',
    value: function _logout() {
      this.props.dispatch((0, _actions.logout)());
    }
  }, {
    key: '_clearError',
    value: function _clearError() {
      this.props.dispatch((0, _actions.clearError)());
    }
  }]);
  return Navibar;
}(_react.Component);

Navibar.propTypes = {
  loggedIn: _react2.default.PropTypes.bool,
  currentlySending: _react2.default.PropTypes.bool,
  dispatch: _react2.default.PropTypes.func
};

exports.default = Navibar;

//# sourceMappingURL=Nav-compiled.js.map