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

var _Form = require('./common/Form');

var _Form2 = _interopRequireDefault(_Form);

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Login = function (_Component) {
  (0, _inherits3.default)(Login, _Component);

  function Login(props) {
    (0, _classCallCheck3.default)(this, Login);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Login).call(this, props));

    _this._login = _this._login.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Login, [{
    key: 'render',
    value: function render() {
      var dispatch = this.props.dispatch;
      var _props$data = this.props.data;
      var formState = _props$data.formState;
      var currentlySending = _props$data.currentlySending;
      var error = _props$data.error;


      return _react2.default.createElement(
        'div',
        { className: 'form-page__wrapper' },
        _react2.default.createElement(
          'div',
          { className: 'form-page__form-wrapper' },
          _react2.default.createElement(
            'div',
            { className: 'form-page__form-header' },
            _react2.default.createElement(
              'h2',
              { className: 'form-page__form-heading' },
              'Login'
            )
          ),
          _react2.default.createElement(_Form2.default, { data: formState, dispatch: dispatch, history: this.props.history, onSubmit: this._login, btnText: 'Login', error: error, currentlySending: currentlySending })
        )
      );
    }
  }, {
    key: '_login',
    value: function _login(username, password) {
      this.props.dispatch((0, _actions.loginRequest)({ username: username, password: password }));
    }
  }]);
  return Login;
}(_react.Component);

Login.propTypes = {
  data: _react2.default.PropTypes.object,
  history: _react2.default.PropTypes.object,
  dispatch: _react2.default.PropTypes.func
};

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
exports.default = (0, _reactRedux.connect)(select)(Login);

//# sourceMappingURL=Login-compiled.js.map