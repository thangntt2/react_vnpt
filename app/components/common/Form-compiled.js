'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _ErrorMessage = require('./ErrorMessage');

var _ErrorMessage2 = _interopRequireDefault(_ErrorMessage);

var _LoadingButton = require('./LoadingButton');

var _LoadingButton2 = _interopRequireDefault(_LoadingButton);

var _actions = require('../../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Form = function (_Component) {
  (0, _inherits3.default)(Form, _Component);

  function Form(props) {
    (0, _classCallCheck3.default)(this, Form);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Form).call(this, props));

    _this._onSubmit = _this._onSubmit.bind(_this);
    _this._changeUsername = _this._changeUsername.bind(_this);
    _this._changePassword = _this._changePassword.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Form, [{
    key: 'render',
    value: function render() {
      var error = this.props.error;


      return _react2.default.createElement(
        'form',
        { className: 'form', onSubmit: this._onSubmit },
        error ? _react2.default.createElement(_ErrorMessage2.default, { error: error }) : null,
        _react2.default.createElement(
          'div',
          { className: 'form__field-wrapper' },
          _react2.default.createElement('input', {
            className: 'form__field-input',
            type: 'text',
            id: 'username',
            value: this.props.data.username,
            placeholder: 'frank.underwood',
            onChange: this._changeUsername,
            autoCorrect: 'off',
            autoCapitalize: 'off',
            spellCheck: 'false' }),
          _react2.default.createElement(
            'label',
            { className: 'form__field-label', htmlFor: 'username' },
            'Username'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'form__field-wrapper' },
          _react2.default.createElement('input', {
            className: 'form__field-input',
            id: 'password',
            type: 'password',
            value: this.props.data.password,
            placeholder: '••••••••••',
            onChange: this._changePassword }),
          _react2.default.createElement(
            'label',
            { className: 'form__field-label', htmlFor: 'password' },
            'Password'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'form__submit-btn-wrapper' },
          this.props.currentlySending ? _react2.default.createElement(_LoadingButton2.default, null) : _react2.default.createElement(
            'button',
            { className: 'form__submit-btn', type: 'submit' },
            this.props.btnText
          )
        )
      );
    }
  }, {
    key: '_changeUsername',
    value: function _changeUsername(event) {
      this._emitChange((0, _extends3.default)({}, this.props.data, { username: event.target.value }));
    }
  }, {
    key: '_changePassword',
    value: function _changePassword(event) {
      this._emitChange((0, _extends3.default)({}, this.props.data, { password: event.target.value }));
    }
  }, {
    key: '_emitChange',
    value: function _emitChange(newFormState) {
      this.props.dispatch((0, _actions.changeForm)(newFormState));
    }
  }, {
    key: '_onSubmit',
    value: function _onSubmit(event) {
      event.preventDefault();
      this.props.onSubmit(this.props.data.username, this.props.data.password);
    }
  }]);
  return Form;
}(_react.Component);

Form.propTypes = {
  dispatch: _react2.default.PropTypes.func,
  data: _react2.default.PropTypes.object,
  onSubmit: _react2.default.PropTypes.func,
  changeForm: _react2.default.PropTypes.func,
  btnText: _react2.default.PropTypes.string,
  error: _react2.default.PropTypes.string,
  currentlySending: _react2.default.PropTypes.bool
};

exports.default = Form;

//# sourceMappingURL=Form-compiled.js.map