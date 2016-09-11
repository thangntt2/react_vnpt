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

var EditMetacontent = function (_React$Component) {
  (0, _inherits3.default)(EditMetacontent, _React$Component);

  function EditMetacontent(props) {
    (0, _classCallCheck3.default)(this, EditMetacontent);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(EditMetacontent).call(this, props));

    _this.state = { search_term: "",
      name: '',
      description: '',
      url: '',
      image: '',
      channel: 0,
      category: 'location',
      last_search_us: Date.now(),
      live_search_typing: false,
      vne: true,
      dtri: false,
      vnn: true,
      thn: true
    };
    _this._edit_metacontent = _this._edit_metacontent.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(EditMetacontent, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.editMetacontent(this.props.params.metacontent_id);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var metacontent = nextProps.data.metacontent;

      if (metacontent) {
        this.setState({
          name: metacontent.name,
          description: metacontent.description,
          url: metacontent.url,
          image: metacontent.image,
          channel: metacontent.ChannelId,
          category: metacontent.category,
          search_term: ""
        });
      }
    }
  }, {
    key: '_setState',
    value: function _setState(field, event) {
      var object = {};
      object[field] = event.target.checked ? event.target.checked : event.target.value;
      this.setState(object);
    }
  }, {
    key: '_edit_metacontent',
    value: function _edit_metacontent() {
      var self = this;
      var channels = this.props.data.channels;

      return _react2.default.createElement(
        _reactBootstrap.Panel,
        { header: "Form" },
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
            _react2.default.createElement(_reactBootstrap.FormControl, { componentClass: 'textarea', ref: function ref(_ref) {
                return self.mtName = _ref;
              }, placeholder: 'Name',
              value: self.state.name, onChange: self._setState.bind(self, 'name') })
          ),
          _react2.default.createElement(
            _reactBootstrap.FormGroup,
            { controlId: 'formControlsTextarea' },
            _react2.default.createElement(
              _reactBootstrap.ControlLabel,
              null,
              'Description'
            ),
            _react2.default.createElement(_reactBootstrap.FormControl, { componentClass: 'textarea', ref: function ref(_ref2) {
                return self.mtDescription = _ref2;
              }, placeholder: 'Description',
              value: self.state.description, onChange: self._setState.bind(self, 'description') })
          ),
          _react2.default.createElement(
            _reactBootstrap.FormGroup,
            { controlId: 'formControlsTextarea' },
            _react2.default.createElement(
              _reactBootstrap.ControlLabel,
              null,
              'Image'
            ),
            _react2.default.createElement(_reactBootstrap.FormControl, { componentClass: 'textarea', ref: function ref(_ref3) {
                return self.mtImage = _ref3;
              }, placeholder: 'Image',
              value: self.state.image, onChange: self._setState.bind(self, 'image') })
          ),
          _react2.default.createElement(
            _reactBootstrap.FormGroup,
            { controlId: 'formControlsTextarea' },
            _react2.default.createElement(
              _reactBootstrap.ControlLabel,
              null,
              'URL'
            ),
            _react2.default.createElement(_reactBootstrap.FormControl, { componentClass: 'textarea', ref: function ref(_ref4) {
                return self.mtUrl = _ref4;
              }, placeholder: 'URL',
              value: self.state.url, onChange: self._setState.bind(self, 'url') })
          ),
          _react2.default.createElement(
            _reactBootstrap.ControlLabel,
            null,
            'Loại'
          ),
          _react2.default.createElement(
            _reactBootstrap.FormControl,
            { componentClass: 'select', bsStyle: 'primary', ref: function ref(_ref5) {
                return self.mtCate = _ref5;
              }, placeholder: 'Loại',
              onChange: self._setState.bind(self, 'category'), value: self.state.category },
            _react2.default.createElement(
              'option',
              { value: 'location' },
              'Địa danh'
            ),
            _react2.default.createElement(
              'option',
              { value: 'person' },
              'Nhân vật'
            ),
            _react2.default.createElement(
              'option',
              { value: 'organization' },
              'Tổ chức'
            ),
            _react2.default.createElement(
              'option',
              { value: 'article' },
              'Bài viết'
            )
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
              { componentClass: 'select', ref: function ref(_ref6) {
                  return self.mtChannel = _ref6;
                }, placeholder: 'Kênh',
                onChange: self._setState.bind(self, 'channel'), value: self.state.channel },
              !channels ? null : channels.map(function (channel, index) {
                return _react2.default.createElement(
                  'option',
                  { key: channel.id, value: channel.id },
                  channel.name
                );
              })
            )
          ),
          _react2.default.createElement(
            _reactBootstrap.Button,
            { bsStyle: 'primary', onClick: self._search_metacontents.bind(self) },
            'Submit'
          )
        )
      );
    }
  }, {
    key: '_search_metacontents',
    value: function _submit() {
      var _this2 = this;

      var metacontent = {
        id: this.props.data.metacontent.id,
        name: this.state.name,
        description: this.state.description,
        url: this.state.url,
        image: this.state.image,
        channel_id: this.mtChannel.props.children.filter(function (channel_option) {
          return channel_option.key == _this2.state.channel;
        })[0].key,
        category: this.state.category
      };
      this.props.putMetacontent(metacontent);
    }
  }, {
    key: 'render',
    value: function render() {
      return this._edit_metacontent();
    }
  }]);
  return EditMetacontent;
}(_react2.default.Component);

EditMetacontent.propTypes = {
  data: _react2.default.PropTypes.object,
  dispatch: _react2.default.PropTypes.func,
  createMetacontent: _react2.default.PropTypes.func.isRequired,
  putMetacontent: _react2.default.PropTypes.func.isRequired,
  editMetacontent: _react2.default.PropTypes.func.isRequired
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
  putMetacontent: _actions.putMetacontent,
  editMetacontent: _actions.editMetacontent
})(EditMetacontent);

//# sourceMappingURL=EditMetacontent-compiled.js.map
