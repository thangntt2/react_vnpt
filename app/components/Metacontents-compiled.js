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

var Metacontent = function (_React$Component) {
  (0, _inherits3.default)(Metacontent, _React$Component);

  function Metacontent(props) {
    (0, _classCallCheck3.default)(this, Metacontent);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Metacontent).call(this, props));

    _this.state = { entity_type: 'Location', search_term: "",
      entity: {
        name: '',
        description: '',
        url: '',
        image: ''
      }
    };
    _this._show_metacontens = _this._show_metacontens.bind(_this);
    _this._create_metacontent = _this._create_metacontent.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Metacontent, [{
    key: '_show_metacontens',
    value: function _show_metacontens() {}
  }, {
    key: '_search_metacontents',
    value: function _search_metacontents() {
      var name = this.refs.search_entity.value;
      if (this.state.entity_type == 'Article') {
        (0, _Metacontents.searchNewsMetacontents)(name).then(function (metacontents) {});
      } else {
        (0, _Metacontents.searchWikiMetacontents)(name).then(function (metacontents) {});
      }
    }
  }, {
    key: '_handle',
    value: function _handle(event) {
      this.setState({ entity_type: event.target.value });
    }
  }, {
    key: '_onChange',
    value: function _onChange(value) {
      var _this2 = this;

      this.setState({
        search_term: value
      });
      (0, _Metacontents.queryWikiMetacontents)(value.value).then(function (value) {
        _this2.setState({ entity: value });
      });
    }
  }, {
    key: '_getEntities',
    value: function _getEntities(inputText) {
      return (0, _Metacontents.searchWikiMetacontents)(inputText).then(function (res) {
        console.log(res);
        var ret = res.map(function (entity) {
          return { value: entity, label: entity };
        });
        console.log(ret);
        return { options: ret };
      });
    }
  }, {
    key: '_create_metacontent',
    value: function _create_metacontent() {
      var self = this;
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
            _react2.default.createElement(_reactBootstrap.FormControl, { componentClass: 'textarea', ref: 'name', placeholder: 'Name',
              value: this.state.entity.name })
          ),
          _react2.default.createElement(
            _reactBootstrap.FormGroup,
            { controlId: 'formControlsTextarea' },
            _react2.default.createElement(
              _reactBootstrap.ControlLabel,
              null,
              'Description'
            ),
            _react2.default.createElement(_reactBootstrap.FormControl, { componentClass: 'textarea', ref: 'description', placeholder: 'Description',
              value: this.state.entity.description })
          ),
          _react2.default.createElement(
            _reactBootstrap.FormGroup,
            { controlId: 'formControlsTextarea' },
            _react2.default.createElement(
              _reactBootstrap.ControlLabel,
              null,
              'Image'
            ),
            _react2.default.createElement(_reactBootstrap.FormControl, { componentClass: 'textarea', ref: 'image', placeholder: 'Image',
              value: this.state.entity.image })
          ),
          _react2.default.createElement(
            _reactBootstrap.FormGroup,
            { controlId: 'formControlsTextarea' },
            _react2.default.createElement(
              _reactBootstrap.ControlLabel,
              null,
              'URL'
            ),
            _react2.default.createElement(_reactBootstrap.FormControl, { componentClass: 'textarea', ref: 'url', placeholder: 'URL',
              value: this.state.entity.url })
          ),
          _react2.default.createElement(
            _reactBootstrap.ControlLabel,
            null,
            'Loại'
          ),
          _react2.default.createElement(
            _reactBootstrap.FormControl,
            { componentClass: 'select', bsStyle: 'primary', ref: 'category', placeholder: 'Loại',
              onChange: self._handle.bind(self), value: self.state.entity_type },
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
              { componentClass: 'select', placeholder: 'Kênh' },
              _react2.default.createElement(
                'option',
                { value: 'VTV1' },
                'VTV1'
              ),
              _react2.default.createElement(
                'option',
                { value: 'VTV3' },
                'VTV3'
              ),
              _react2.default.createElement(
                'option',
                { value: 'VTV1 HD' },
                'VTV1 HD'
              ),
              _react2.default.createElement(
                'option',
                { value: 'VTV3 HD' },
                'VTV3 HD'
              )
            )
          ),
          _react2.default.createElement(
            _reactBootstrap.Button,
            { type: 'submit', bsStyle: 'primary', onClick: self._submit.bind(self) },
            'Submit'
          )
        )
      );
    }
  }, {
    key: '_submit',
    value: function _submit() {
      metacontent = {
        name: this.refs.name.value,
        description: this.refs.description.value,
        image: this.refs.image,
        url: this.refs.url,
        category: this.refs.category
      };

      (0, _actions.submitMetacontent)(metacontent);
    }
  }, {
    key: 'render',
    value: function render() {
      return this._create_metacontent();
    }
  }]);
  return Metacontent;
}(_react2.default.Component);

Metacontent.propTypes = {
  data: _react2.default.PropTypes.object,
  dispatch: _react2.default.PropTypes.func
};

// // Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
exports.default = (0, _reactRedux.connect)(select)(Metacontent);

//# sourceMappingURL=Metacontents-compiled.js.map