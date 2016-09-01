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

var _reactImageloader = require('react-imageloader');

var _reactImageloader2 = _interopRequireDefault(_reactImageloader);

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Channels = function (_React$Component) {
	(0, _inherits3.default)(Channels, _React$Component);

	function Channels(props) {
		(0, _classCallCheck3.default)(this, Channels);

		var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Channels).call(this, props));

		_this._create_edit_button = _this._create_edit_button.bind(_this);
		_this._pre_image_loader = _this._pre_image_loader.bind(_this);
		_this._show_channels_component = _this._show_channels_component.bind(_this);
		return _this;
	}

	(0, _createClass3.default)(Channels, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.props.getChannelsList();
		}
	}, {
		key: '_create_edit_button',
		value: function _create_edit_button(channel, i) {
			var data = {
				data: { i: i, channel: channel }
			};
			return _react2.default.createElement(
				_reactBootstrap.Button,
				(0, _extends3.default)({}, data, { bsStyle: 'primary', onClick: function onClick() {} }),
				'Edit'
			);
		}
	}, {
		key: '_create_del_button',
		value: function _create_del_button(channel, i) {
			var data = {
				data: { i: i, channel: channel }
			};
			return _react2.default.createElement(
				_reactBootstrap.Button,
				(0, _extends3.default)({}, data, { bsStyle: 'danger', onClick: function onClick() {} }),
				'Delete'
			);
		}
	}, {
		key: '_pre_image_loader',
		value: function _pre_image_loader() {
			return _react2.default.createElement('div', { className: 'uil-ring-css' });
		}
	}, {
		key: '_show_channels_component',
		value: function _show_channels_component() {
			var channels_list = this.props.data.channels_list;

			var self = this;
			return _react2.default.createElement(
				'div',
				{ className: 'box-body' },
				_react2.default.createElement(
					_reactBootstrap.Button,
					{ bsStyle: 'primary' },
					'Create'
				),
				_react2.default.createElement(
					_reactBootstrap.Table,
					{ striped: true, bordered: true, condensed: true, hover: true },
					_react2.default.createElement(
						'thead',
						null,
						_react2.default.createElement(
							'tr',
							null,
							_react2.default.createElement(
								'th',
								null,
								'ID'
							),
							_react2.default.createElement(
								'th',
								null,
								'Kênh'
							),
							_react2.default.createElement(
								'th',
								null,
								'Icon'
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
						!channels_list ? null : channels_list.map(function (channel, i) {
							return _react2.default.createElement(
								'tr',
								{ key: channel.id },
								_react2.default.createElement(
									'td',
									null,
									channel.id
								),
								_react2.default.createElement(
									'td',
									null,
									channel.name
								),
								_react2.default.createElement(
									'td',
									null,
									_react2.default.createElement(
										_reactImageloader2.default,
										{
											src: channel.icon,
											wrapper: _react2.default.DOM.div,
											preloader: self._pre_image_loader },
										self._pre_image_loader
									)
								),
								_react2.default.createElement(
									'td',
									null,
									self._create_edit_button(channel, i),
									self._create_del_button(channel, i)
								)
							);
						})
					)
				)
			);
		}
	}, {
		key: '_create_channel_component',
		value: function _create_channel_component() {
			return _react2.default.createElement(
				'div',
				{ className: 'box-body' },
				_react2.default.createElement(
					'form',
					null,
					_react2.default.createElement(
						_reactBootstrap.FormGroup,
						{
							controlId: 'formBasicText'
						},
						_react2.default.createElement(
							_reactBootstrap.ControlLabel,
							null,
							' Channel Name '
						),
						_react2.default.createElement(_reactBootstrap.FormControl, {
							type: 'text'
							// value={this.state.value}
							, placeholder: 'Enter channel name'
						}),
						_react2.default.createElement(_reactBootstrap.FormControl.Feedback, null)
					)
				)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			return this._show_channels_component();
		}
	}]);
	return Channels;
}(_react2.default.Component);

Channels.propTypes = {
	data: _react2.default.PropTypes.object,
	dispatch: _react2.default.PropTypes.func,
	getChannelsList: _react2.default.PropTypes.func.isRequired
};

// // Which props do we want to inject, given the global state?
function select(state) {
	return {
		data: state
	};
}

// Wrap the component to inject dispatch and state into it
exports.default = (0, _reactRedux.connect)(select, {
	getChannelsList: _actions.getChannelsList
})(Channels);

//# sourceMappingURL=Channels-compiled.js.map