'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _LoadingIndicator = require('./LoadingIndicator');

var _LoadingIndicator2 = _interopRequireDefault(_LoadingIndicator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LoadingButton(props) {
  return _react2.default.createElement(
    'a',
    { href: '#', className: props.className + ' btn btn--loading', disabled: 'true' },
    _react2.default.createElement(_LoadingIndicator2.default, null)
  );
}

LoadingButton.propTypes = {
  className: _react2.default.PropTypes.string
};

exports.default = LoadingButton;

//# sourceMappingURL=LoadingButton-compiled.js.map