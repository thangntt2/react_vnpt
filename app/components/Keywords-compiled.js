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

var _reactRedux = require('react-redux');

var _reactBootstrap = require('react-bootstrap');

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Keywords = function (_React$Component) {
  (0, _inherits3.default)(Keywords, _React$Component);

  function Keywords(props) {
    (0, _classCallCheck3.default)(this, Keywords);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Keywords).call(this, props));

    _this._create_del_button = _this._create_del_button.bind(_this);
    _this._create_edit_button = _this._create_edit_button.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Keywords, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.getAllKeywords();
    }
  }, {
    key: '_pre_image_loader',
    value: function _pre_image_loader() {
      return _react2.default.createElement('div', { className: 'uil-ring-css' });
    }
  }, {
    key: '_create_edit_button',
    value: function _create_edit_button(metacontent, i) {
      var data = {
        data: { i: i, metacontent: metacontent }
      };
      return _react2.default.createElement(
        _reactBootstrap.Button,
        (0, _extends3.default)({}, data, { bsStyle: 'primary', onClick: function onClick() {} }),
        'Edit'
      );
    }
  }, {
    key: '_create_del_button',
    value: function _create_del_button(metacontent) {
      var self = this;
      var data = {
        data: { metacontent: metacontent }
      };
      return _react2.default.createElement(
        _reactBootstrap.Button,
        (0, _extends3.default)({}, data, { bsStyle: 'danger', onClick: function onClick() {
            self.props.deleteKeyword(metacontent);
          } }),
        'Delete'
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props$data = this.props.data;
      var keywords = _props$data.keywords;
      var channels = _props$data.channels;

      var self = this;
      return _react2.default.createElement(
        'div',
        { className: 'box-body' },
        _react2.default.createElement(
          _reactBootstrap.Button,
          { bsStyle: 'primary', href: '/metacontents/create' },
          'Create'
        ),
        this.props.children ? null : _react2.default.createElement(
          _reactBootstrap.Table,
          { striped: true, bordered: true, condensed: true, hover: true, responsive: true },
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'th',
                null,
                'Created At'
              ),
              _react2.default.createElement(
                'th',
                null,
                'Keyword'
              ),
              _react2.default.createElement(
                'th',
                null,
                'Channel'
              ),
              _react2.default.createElement(
                'th',
                null,
                'Actions'
              )
            )
          ),
          _react2.default.createElement(
            'tbody',
            null,
            !keywords ? null : keywords.map(function (keyword, i) {
              return _react2.default.createElement(
                'tr',
                { key: keyword.id },
                _react2.default.createElement(
                  'td',
                  null,
                  !keyword.createdAt ? null : keyword.createdAt
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  !keyword.keyword ? null : keyword.keyword
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  channels ? channels.filter(function (channel) {
                    return channel.id === keyword.ChannelId;
                  })[0].name : null
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  self._create_edit_button(keyword, i),
                  self._create_del_button(keyword)
                )
              );
            })
          )
        ),
        this.props.children
      );
    }
  }]);
  return Keywords;
}(_react2.default.Component);

Keywords.propTypes = {
  data: _react2.default.PropTypes.object,
  dispatch: _react2.default.PropTypes.func,
  getAllKeywords: _react2.default.PropTypes.func.isRequired,
  deleteKeyword: _react2.default.PropTypes.func.isRequired,
  children: _react2.default.PropTypes.object
};

// // Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
exports.default = (0, _reactRedux.connect)(select, {
  getAllKeywords: _actions.getAllKeywords,
  deleteKeyword: _actions.deleteKeyword
})(Keywords);

//# sourceMappingURL=Keywords-compiled.js.map