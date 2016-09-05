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

var _reactBootstrap = require('react-bootstrap');

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CreateKeyword = function (_React$Component) {
  (0, _inherits3.default)(CreateKeyword, _React$Component);

  function CreateKeyword(props) {
    (0, _classCallCheck3.default)(this, CreateKeyword);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(CreateKeyword).call(this, props));

    _this.state = {
      channel: 0,
      search_term: '',
      name: ''
    };
    _this._create_metacontent = _this._create_metacontent.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(CreateKeyword, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.createMetacontent();
    }
  }, {
    key: '_setState',
    value: function _setState(field, event) {
      var object = {};
      object[field] = event.target.checked ? event.target.checked : event.target.value;
      this.setState(object);
    }
  }, {
    key: '_checkBoxChange',
    value: function _checkBoxChange(field) {
      var object = {};
      object[field] = !this.state[field];
      this.setState(object);
    }
  }, {
    key: '_create_metacontent',
    value: function _create_metacontent() {
      var self = this;
      var channels = this.props.data.channels;

      return _react2.default.createElement(
        'div',
        { className: 'box-body' },
        _react2.default.createElement(
          _reactBootstrap.Panel,
          { header: "Keyword" },
          _react2.default.createElement(
            _reactBootstrap.Form,
            null,
            _react2.default.createElement(
              _reactBootstrap.FormGroup,
              { controlId: 'formControlsTextarea' },
              _react2.default.createElement(
                _reactBootstrap.ControlLabel,
                null,
                'Name'
              ),
              _react2.default.createElement(_reactBootstrap.FormControl, { componentClass: 'textarea', placeholder: 'Name',
                value: self.state.name, onChange: self._setState.bind(self, 'name') })
            ),
            _react2.default.createElement(
              _reactBootstrap.FormGroup,
              { controlId: 'formControlsSelect' },
              _react2.default.createElement(
                _reactBootstrap.ControlLabel,
                null,
                'Kênh'
              ),
              _react2.default.createElement(
                _reactBootstrap.FormControl,
                { componentClass: 'select', ref: function ref(_ref) {
                    return self.mtChannel = _ref;
                  }, placeholder: 'Kênh',
                  onChange: self._setState.bind(self, 'channel'), value: self.state.channel },
                !channels ? null : channels.map(function (channel, index) {
                  return _react2.default.createElement(
                    'option',
                    { key: channel.id, value: index },
                    channel.name
                  );
                })
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.Button,
              { bsStyle: 'primary', onClick: self._submit.bind(self) },
              'Submit'
            )
          )
        )
      );
    }
  }, {
    key: '_submit',
    value: function _submit() {
      var keyword = {
        name: this.state.name,
        channel: this.mtChannel.props.children[this.state.channel].key
      };
      this.props.submitKeyword(keyword);
    }
  }, {
    key: 'render',
    value: function render() {
      return this._create_metacontent();
    }
  }]);
  return CreateKeyword;
}(_react2.default.Component);

CreateKeyword.propTypes = {
  data: _react2.default.PropTypes.object,
  dispatch: _react2.default.PropTypes.func,
  createMetacontent: _react2.default.PropTypes.func.isRequired,
  submitKeyword: _react2.default.PropTypes.func.isRequired
};

// // Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
exports.default = (0, _reactRedux.connect)(select, {
  createMetacontent: _actions.createMetacontent,
  submitKeyword: _actions.submitKeyword
})(CreateKeyword);

//# sourceMappingURL=CreateKeyword-compiled.js.map