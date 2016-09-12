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

var _actions = require('../actions');

var _reactHotkey = require('react-hotkey');

var _reactHotkey2 = _interopRequireDefault(_reactHotkey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReactDOM = require('react-dom');

var Loading = require('react-loading');
_reactHotkey2.default.activate();

var CreateMetacontent2 = function (_React$Component) {
  (0, _inherits3.default)(CreateMetacontent2, _React$Component);

  function CreateMetacontent2(props) {
    (0, _classCallCheck3.default)(this, CreateMetacontent2);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(CreateMetacontent2).call(this, props));

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
      thn: true,
      searching: false
    };
    _this._create_metacontent = _this._create_metacontent.bind(_this);
    _this.hotkeyHandler = _this.handleHotkey.bind(_this);
    _this.handleOptionChange = _this.handleOptionChange.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(CreateMetacontent2, [{
    key: 'handleHotkey',
    value: function handleHotkey(e) {
      if ((e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4') && e.ctrlKey) {
        switch (e.key) {
          case '1':
            this.setState({ category: 'location' });
            break;
          case '2':
            this.setState({ category: 'person' });
            break;
          case '3':
            this.setState({ category: 'organization' });
            break;
          case '4':
            this.setState({ category: 'article' });
            break;
          default:
            return;
        }
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _reactHotkey2.default.addHandler(this.hotkeyHandler);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _reactHotkey2.default.removeHandler(this.hotkeyHandler);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.createMetacontent();
    }
  }, {
    key: '_onChange',
    value: function _onChange(value) {
      var _this2 = this;

      this.setState({
        search_term: value
      });
      var self = this;
      if (this.state.category != 'article') {
        (0, _Metacontents.queryWikiMetacontents)(value.value).then(function (value) {
          _this2.setState({
            name: value.name,
            description: value.description,
            url: value.url,
            image: value.image
          });
          ReactDOM.findDOMNode(self.submit_button).focus();
        });
      } else {
        (0, _Metacontents.queryNewsMetacontents)(value.value).then(function (res) {
          _this2.setState({
            name: res.body.title,
            description: res.body.desc,
            url: value.value,
            image: res.body.image
          });
          ReactDOM.findDOMNode(self.submit_button).focus();
        });
      }
    }
  }, {
    key: '_getEntities',
    value: function _getEntities(inputText) {
      var self = this;

      if (Date.now() - this.state.last_search_us < 500) {
        this.state.search_fun.abort();
      }

      //get sites
      var sites = [];
      if (self.state.vne) sites.push('vnexpress');
      if (self.state.vnn) sites.push('vietnamnet');
      if (self.state.dtri) sites.push('dantri');
      if (self.state.thn) sites.push('thanhnien');
      //end
      return this.state.category != 'article' ? (0, _Metacontents.searchWikiMetacontents)(inputText)
      // : searchNewsMetacontents(inputText, sites, true)
      : (0, _Metacontents.searchNewsMetacontents)(inputText, sites, false);
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
    key: 'handleOptionChange',
    value: function handleOptionChange(event) {
      this.setState({ category: event.target.value.toString() });
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
          { header: "Tìm kiếm" },
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
            _reactBootstrap.ControlLabel,
            null,
            'Loại'
          ),
          _react2.default.createElement(
            _reactBootstrap.FormGroup,
            null,
            _react2.default.createElement(
              _reactBootstrap.Radio,
              { name: 'category', value: 'location', inline: true,
                checked: 'location' === self.state.category,
                onChange: self.handleOptionChange },
              'Địa danh'
            ),
            _react2.default.createElement(
              _reactBootstrap.Radio,
              { name: 'category', value: 'person', inline: true,
                checked: 'person' === self.state.category,
                onChange: self.handleOptionChange },
              'Nhân vật'
            ),
            _react2.default.createElement(
              _reactBootstrap.Radio,
              { name: 'category', value: 'organization', inline: true,
                checked: "organization" === self.state.category,
                onChange: self.handleOptionChange },
              'Tổ chức'
            ),
            _react2.default.createElement(
              _reactBootstrap.Radio,
              { name: 'category', value: 'article', inline: true,
                checked: "article" === self.state.category,
                onChange: self.handleOptionChange },
              'Bài viết'
            )
          ),
          self.state.category !== 'article' ? null : _react2.default.createElement(
            _reactBootstrap.FormGroup,
            null,
            _react2.default.createElement(
              _reactBootstrap.Checkbox,
              { inline: true, checked: self.state.vne, onChange: self._checkBoxChange.bind(self, 'vne') },
              'VnExpress'
            ),
            ' ',
            _react2.default.createElement(
              _reactBootstrap.Checkbox,
              { inline: true, checked: self.state.dtri, onChange: self._checkBoxChange.bind(self, 'dtri') },
              'Dantri'
            ),
            ' ',
            _react2.default.createElement(
              _reactBootstrap.Checkbox,
              { inline: true, checked: self.state.vnn, onChange: self._checkBoxChange.bind(self, 'vnn') },
              'Vietnamnet'
            ),
            _react2.default.createElement(
              _reactBootstrap.Checkbox,
              { inline: true, checked: self.state.thn, onChange: self._checkBoxChange.bind(self, 'thn') },
              'Thannien'
            )
          ),
          ' ',
          _react2.default.createElement(
            _reactBootstrap.FormGroup,
            { controlId: 'formControlsTextarea' },
            _react2.default.createElement(
              _reactBootstrap.ControlLabel,
              null,
              'Tìm kiếm'
            ),
            _react2.default.createElement(_reactBootstrap.FormControl, { type: 'text',
              placeholder: 'Nhập để tìm kiếm',
              value: this.state.search_term,
              onChange: self._setState.bind(self, 'search_term'),
              onKeyPress: function onKeyPress(e) {
                if (e.key === 'Enter') {
                  self._search_metacontents();
                }
              },
              autoFocus: true
            })
          ),
          _react2.default.createElement(
            _reactBootstrap.Button,
            { bsStyle: 'primary', ref: function ref(_ref2) {
                return self.submit_button = _ref2;
              },
              onClick: self._search_metacontents.bind(self),
              tabIndex: '1',
              disabled: self.state.searching
            },
            self.state.searching ? "Tìm kiếm..." : "Tìm kiếm"
          )
        ),
        !self.state.searchResults ? null : _react2.default.createElement(
          _reactBootstrap.Panel,
          null,
          _react2.default.createElement(
            _reactBootstrap.ListGroup,
            null,
            self.state.searchResults.map(function (metacontent) {
              return metacontent.loading ? _react2.default.createElement(Loading, { key: metacontent.url, type: 'bars', color: '#e3e3e3' }) : _react2.default.createElement(
                _reactBootstrap.ListGroupItem,
                {
                  key: metacontent.url,
                  onClick: self._submit.bind(self, metacontent)
                },
                _react2.default.createElement(
                  _reactBootstrap.Row,
                  { className: 'show-grid' },
                  _react2.default.createElement(
                    _reactBootstrap.Col,
                    { md: 1 },
                    _react2.default.createElement(_reactBootstrap.Image, {
                      src: !metacontent.image || metacontent.image.length == 0 ? "https://d13yacurqjgara.cloudfront.net/users/771923/screenshots/2390842/gif-1.gif" : metacontent.image })
                  ),
                  _react2.default.createElement(
                    _reactBootstrap.Col,
                    { md: 11 },
                    _react2.default.createElement(
                      'b',
                      null,
                      metacontent.name
                    ),
                    _react2.default.createElement('br', null),
                    metacontent.description
                  )
                )
              );
            })
          )
        )
      );
    }
  }, {
    key: '_submit',
    value: function _submit(metacontent) {
      metacontent.channel = this.mtChannel.props.children[this.state.channel].key;
      metacontent.category = this.state.category;
      this.props.submitMetacontent(metacontent);
    }
  }, {
    key: '_search_metacontents',
    value: function _search_metacontents() {
      var _this3 = this;

      this.setState({ searching: true });
      this._getEntities(this.state.search_term).then(function (articles) {
        articles = articles.body.map(function (article) {
          //get entity
          if (_this3.state.category != 'article') {
            article = { value: article };
            article.loading = true;
            (0, _Metacontents.queryWikiMetacontents)(article.value).then(function (value) {
              article.name = value.name;
              article.description = value.description;
              article.url = value.url;
              article.image = value.image;
              article.loading = false;
              _this3.setState({ searchResults: _this3.state.searchResults });
            });
          } else {
            article.loading = true;
            (0, _Metacontents.queryNewsMetacontents)(article.link).then(function (res) {
              article.name = res.body.title;
              article.description = res.body.desc;
              article.url = article.link;
              article.image = res.body.image;
              article.loading = false;
              _this3.setState({ searchResults: _this3.state.searchResults });
            });
          }
          //
          return article;
        });

        _this3.setState({ searching: false });
        _this3.setState({ searchResults: articles });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return this._create_metacontent();
    }
  }]);
  return CreateMetacontent2;
}(_react2.default.Component);

CreateMetacontent2.propTypes = {
  data: _react2.default.PropTypes.object,
  dispatch: _react2.default.PropTypes.func,
  createMetacontent: _react2.default.PropTypes.func.isRequired,
  submitMetacontent: _react2.default.PropTypes.func.isRequired,
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
  submitMetacontent: _actions.submitMetacontent,
  editMetacontent: _actions.editMetacontent
})(CreateMetacontent2);

//# sourceMappingURL=CreateMetacontent2-compiled.js.map