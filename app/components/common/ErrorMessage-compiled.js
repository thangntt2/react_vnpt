'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ErrorMessage(props) {
  return _react2.default.createElement(
    'div',
    { className: 'form__error-wrapper js-form__err-animation' },
    _react2.default.createElement(
      'p',
      { className: 'form__error' },
      props.error
    )
  );
}

ErrorMessage.propTypes = {
  error: _react2.default.PropTypes.string
};

exports.default = ErrorMessage;

//# sourceMappingURL=ErrorMessage-compiled.js.map