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

var _reactImageloader = require('react-imageloader');

var _reactImageloader2 = _interopRequireDefault(_reactImageloader);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Metacontents = function (_React$Component) {
  (0, _inherits3.default)(Metacontents, _React$Component);

  function Metacontents(props) {
    (0, _classCallCheck3.default)(this, Metacontents);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Metacontents).call(this, props));

    _this._create_del_button = _this._create_del_button.bind(_this);
    _this._create_edit_button = _this._create_edit_button.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Metacontents, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.getAllMetacontents();
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
        (0, _extends3.default)({}, data, { bsStyle: 'primary', onClick: function onClick() {
            _reactRouter.browserHistory.push('/metacontents/' + metacontent.id);
          } }),
        _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'pencil' })
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
            self.props.deleteMetacontent(metacontent);
          } }),
        _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'minus' })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props$data = this.props.data;
      var metacontents = _props$data.metacontents;
      var channels = _props$data.channels;

      var self = this;
      return _react2.default.createElement(
        _reactBootstrap.Panel,
        null,
        _react2.default.createElement(
          _reactBootstrap.Button,
          { bsStyle: 'primary', onClick: function onClick() {
              _reactRouter.browserHistory.push("/metacontents/create");
            } },
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
                { className: 'col-md-2' },
                'Name'
              ),
              _react2.default.createElement(
                'th',
                { className: 'col-md-5' },
                'Description'
              ),
              _react2.default.createElement(
                'th',
                { className: 'col-md-1' },
                'Image'
              ),
              _react2.default.createElement(
                'th',
                { className: 'col-md-1' },
                'Channel'
              ),
              _react2.default.createElement(
                'th',
                { className: 'col-md-1' },
                'Category'
              ),
              _react2.default.createElement(
                'th',
                { className: 'col-md-2' },
                'Actions'
              )
            )
          ),
          _react2.default.createElement(
            'tbody',
            null,
            !metacontents ? null : metacontents.map(function (metacontent, i) {
              return _react2.default.createElement(
                'tr',
                { key: metacontent.id },
                _react2.default.createElement(
                  'td',
                  null,
                  metacontent.name
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  !metacontent.description ? null : metacontent.description
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(
                    _reactImageloader2.default,
                    {
                      src: !metacontent.image ? "https://d13yacurqjgara.cloudfront.net/users/771923/screenshots/2390842/gif-1.gif" : metacontent.image,
                      wrapper: _react2.default.DOM.div,
                      preloader: self._pre_image_loader.bind(self) },
                    self._pre_image_loader.bind(self)
                  )
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  !channels ? null : channels.filter(function (channel) {
                    return channel.id === metacontent.ChannelId;
                  })[0].name
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  !metacontent.category ? null : metacontent.category
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  self._create_edit_button(metacontent, i),
                  self._create_del_button(metacontent)
                )
              );
            })
          )
        ),
        this.props.children
      );
    }
  }]);
  return Metacontents;
}(_react2.default.Component);

Metacontents.propTypes = {
  data: _react2.default.PropTypes.object,
  dispatch: _react2.default.PropTypes.func,
  getAllMetacontents: _react2.default.PropTypes.func.isRequired,
  deleteMetacontent: _react2.default.PropTypes.func.isRequired,
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
  getAllMetacontents: _actions.getAllMetacontents,
  deleteMetacontent: _actions.deleteMetacontent
})(Metacontents);

//# sourceMappingURL=Metacontents-compiled.js.map