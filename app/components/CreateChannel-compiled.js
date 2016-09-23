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

var _reactBootstrap = require('react-bootstrap');

var _reactRedux = require('react-redux');

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CreateChannel = function (_React$Component) {
  (0, _inherits3.default)(CreateChannel, _React$Component);

  function CreateChannel(props) {
    (0, _classCallCheck3.default)(this, CreateChannel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(CreateChannel).call(this, props));

    _this.state = {
      name: '',
      icon: '',
      channel: ''
    };
    return _this;
  }

  (0, _createClass3.default)(CreateChannel, [{
    key: '_setState',
    value: function _setState(field, event) {
      var object = {};
      object[field] = event.target.checked ? event.target.checked : event.target.value;
      this.setState(object);
    }
  }, {
    key: '_submit',
    value: function _submit() {
      var channel = {
        icon: this.state.icon,
        name: this.state.name,
        channel: this.state.channel
      };
      this.props.submitChannel(channel);
    }
  }, {
    key: 'render',
    value: function render() {
      var self = this;
      return _react2.default.createElement(
        _reactBootstrap.Panel,
        null,
        _react2.default.createElement(
          _reactBootstrap.FormGroup,
          { controlId: 'formControlsSelect' },
          _react2.default.createElement(
            _reactBootstrap.ControlLabel,
            null,
            'Tên'
          ),
          _react2.default.createElement(_reactBootstrap.FormControl, { type: 'text', placeholder: 'Tên của kênh',
            onChange: self._setState.bind(self, 'name'), value: self.state.name })
        ),
        _react2.default.createElement(
          _reactBootstrap.FormGroup,
          { controlId: 'formControlsSelect' },
          _react2.default.createElement(
            _reactBootstrap.ControlLabel,
            null,
            'Số kênh'
          ),
          _react2.default.createElement(_reactBootstrap.FormControl, { type: 'text', placeholder: 'Số của kênh',
            onChange: self._setState.bind(self, 'channel'), value: self.state.channel })
        ),
        _react2.default.createElement(
          _reactBootstrap.FormGroup,
          { controlId: 'formControlsSelect' },
          _react2.default.createElement(
            _reactBootstrap.ControlLabel,
            null,
            'Biểu tượng kênh'
          ),
          _react2.default.createElement(_reactBootstrap.FormControl, { type: 'text', placeholder: 'Biểu tượng của kênh',
            onChange: self._setState.bind(self, 'icon'), value: self.state.icon })
        ),
        _react2.default.createElement(
          _reactBootstrap.Button,
          { bsStyle: 'primary', onClick: self._submit.bind(self) },
          'Submit'
        )
      );
    }
  }]);
  return CreateChannel;
}(_react2.default.Component);

// // Which props do we want to inject, given the global state?


function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
exports.default = (0, _reactRedux.connect)(select, {
  submitChannel: _actions.submitChannel
})(CreateChannel);

//# sourceMappingURL=CreateChannel-compiled.js.map