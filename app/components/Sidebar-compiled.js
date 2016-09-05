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

var _reactSidenav = require('react-sidenav');

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sidebar = function (_React$Component) {
		(0, _inherits3.default)(Sidebar, _React$Component);

		function Sidebar(props) {
				(0, _classCallCheck3.default)(this, Sidebar);

				var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Sidebar).call(this, props));

				_this.state = { selectedSB: props.selectedSB };
				_this.updateSelection = _this.updateSelection.bind(_this);
				return _this;
		}

		(0, _createClass3.default)(Sidebar, [{
				key: 'updateSelection',
				value: function updateSelection(selection) {
						this.setState({ selectedSB: selection.id });
						switch (selection.id) {
								case 'channels':
										_reactRouter.browserHistory.push('/channels');
										break;
								case 'metacontents_show':
										_reactRouter.browserHistory.push('/metacontents');
										break;
								case 'metacontents_create':
										_reactRouter.browserHistory.push('/metacontents/create');
										break;
								case 'dashboard':
										_reactRouter.browserHistory.push('/dashboard');
										break;
								case 'keyword_show':
										_reactRouter.browserHistory.push('/keyword');
										break;
								case 'keyword_create':
										_reactRouter.browserHistory.push('/keyword/create');
										break;
						}
				}
		}, {
				key: 'render',
				value: function render() {
						var navi = [{ id: 'dashboard', text: 'Home' }, { id: 'channels', text: 'Kênh' }, {
								id: 'metacontents', text: 'Metacontents',
								navlist: [{ id: 'metacontents_show', text: 'Show' }, { id: 'metacontents_create', text: 'Create' }]
						}, { id: 'keywords', text: 'Keyword',
								navlist: [{ id: 'keyword_show', text: 'Show' }, { id: 'keyword_create', text: 'Create' }]
						}];
						return _react2.default.createElement(
								'div',
								{ className: 'sidebar_wrapper' },
								_react2.default.createElement(_reactSidenav.SideNav, {
										selected: this.state.selectedSB,
										navs: navi,
										onSelection: this.updateSelection })
						);
				}
		}]);
		return Sidebar;
}(_react2.default.Component);

;

Sidebar.propTypes = {
		selectedSB: _react2.default.PropTypes.object,
		dispatch: _react2.default.PropTypes.func
};

// Which props do we want to inject, given the global state?
function select(state) {
		return {
				data: state
		};
}

// Wrap the component to inject dispatch and state into it
exports.default = (0, _reactRedux.connect)(select)(Sidebar);

//# sourceMappingURL=Sidebar-compiled.js.map