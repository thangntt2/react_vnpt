'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _constants = require('../actions/constants');

var _auth = require('../auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// The initial application state
/*
 * The reducer takes care of state changes in our app through actions
 */

var initialState = {
  formState: {
    username: '',
    password: ''
  },
  error: '',
  currentlySending: false,
  loggedIn: _auth2.default.loggedIn()
};

// Takes care of changing the application state
function reducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case _constants.CHANGE_FORM:
      return (0, _extends3.default)({}, state, { formState: action.newFormState });
    case _constants.SET_AUTH:
      return (0, _extends3.default)({}, state, { loggedIn: action.newAuthState });
    case _constants.SENDING_REQUEST:
      return (0, _extends3.default)({}, state, { currentlySending: action.sending });
    case _constants.CHANNEL_RECV:
      return (0, _extends3.default)({}, state, { channels_list: action.channels });
    case _constants.REQUEST_ERROR:
      return (0, _extends3.default)({}, state, { error: action.error });
    case _constants.CLEAR_ERROR:
      return (0, _extends3.default)({}, state, { error: '' });
    case _constants.CREATE_METACONTENT_READY:
      return (0, _extends3.default)({}, state, { channels: action.channels });
    case _constants.SUBMIT_METACONTENT_OK:
      return (0, _extends3.default)({}, state, { metacontent: {
          name: '',
          description: '',
          url: '',
          image: '',
          category: 'Location',
          channel: '0'
        } });
    case _constants.METACONTENT_RECV:
      return (0, _extends3.default)({}, state, { metacontents: action.metacontents });
    case _constants.DELETE_METACONTENT_OK:
      state.metacontents.splice(action.index, 1);
      return (0, _extends3.default)({}, state);
    default:
      return state;
  }
}

exports.default = reducer;

//# sourceMappingURL=index-compiled.js.map