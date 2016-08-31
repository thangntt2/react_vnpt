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

var _Metacontents = require('../apis/Metacontents');

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CreateMetacontent = function (_React$Component) {
  (0, _inherits3.default)(CreateMetacontent, _React$Component);

  function CreateMetacontent(props) {
    (0, _classCallCheck3.default)(this, CreateMetacontent);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(CreateMetacontent).call(this, props));

    _this.state = { search_term: "",
      url: '',
      image: '',
      category: 'Location',
      channel: '0'
    };
    _this._create_metacontent = _this._create_metacontent.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(CreateMetacontent, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.createMetacontent();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      console.log(this.props.data);
      this.setState({
        name: this.props.data.name,
        description: this.props.data.description
      });
    }
  }, {
    key: '_onChange',
    value: function _onChange(value) {
      var _this2 = this;

      this.setState({
        search_term: value
      });
      (0, _Metacontents.queryWikiMetacontents)(value.value).then(function (value) {
        _this2.setState({
          name: value.name,
          description: value.description,
          url: value.url,
          image: value.image
        });
      });
    }
  }, {
    key: '_getEntities',
    value: function _getEntities(inputText) {
      return (0, _Metacontents.searchWikiMetacontents)(inputText).then(function (res) {
        var ret = res.map(function (entity) {
          return { value: entity, label: entity };
        });
        return { options: ret };
      });
    }
  }, {
    key: '_setState',
    value: function _setState(field, event) {
      var object = {};
      if (field === 'channel') {
        object[field] = event.target.value;
      } else object[field] = event.target.value;
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
        _react2.default.createElement(_reactSelect2.default.Async, {
          value: self.state.search_term,
          ref: 'live_search_input',
          onChange: self._onChange.bind(self),
          loadOptions: self._getEntities.bind(self),
          minimumInput: 3,
          valueKey: 'value', labelKey: 'label',
          backspaceRemoves: false,
          ignoreAccents: false
        }),
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
              { value: 'Location' },
              'Địa danh'
            ),
            _react2.default.createElement(
              'option',
              { value: 'Person' },
              'Nhân vật'
            ),
            _react2.default.createElement(
              'option',
              { value: 'Organization' },
              'Tổ chức'
            ),
            _react2.default.createElement(
              'option',
              { value: 'Article' },
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
      );
    }
  }, {
    key: '_submit',
    value: function _submit() {
      var metacontent = {
        name: this.state.name,
        description: this.state.description,
        url: this.state.url,
        image: this.state.image,
        channel: this.mtChannel.props.children[this.state.channel].key,
        category: this.state.category
      };
      this.props.submitMetacontent(metacontent);
    }
  }, {
    key: 'render',
    value: function render() {
      return this._create_metacontent();
    }
  }]);
  return CreateMetacontent;
}(_react2.default.Component);

CreateMetacontent.propTypes = {
  data: _react2.default.PropTypes.object,
  dispatch: _react2.default.PropTypes.func,
  createMetacontent: _react2.default.PropTypes.func.isRequired,
  submitMetacontent: _react2.default.PropTypes.func.isRequired
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
  submitMetacontent: _actions.submitMetacontent
})(CreateMetacontent);

//# sourceMappingURL=CreateMetacontents-compiled.js.map