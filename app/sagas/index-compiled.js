'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.authorize = authorize;
exports.logout = logout;
exports.getChannelsList = getChannelsList;
exports.channelsFlow = channelsFlow;
exports.loginFlow = loginFlow;
exports.logoutFlow = logoutFlow;
exports.getAllMetacontents = getAllMetacontents;
exports.submitMetacontent = submitMetacontent;
exports.submitMetacontentFlow = submitMetacontentFlow;
exports.putMetacontent = putMetacontent;
exports.putMetacontentFlow = putMetacontentFlow;
exports.createMetacontentFlow = createMetacontentFlow;
exports.metacontentsFlow = metacontentsFlow;
exports.deleteMetacontent = deleteMetacontent;
exports.deleteMetacontentFlow = deleteMetacontentFlow;
exports.submitKeyword = submitKeyword;
exports.submitKeywordFlow = submitKeywordFlow;
exports.getAllKeywords = getAllKeywords;
exports.keywordsFlow = keywordsFlow;
exports.getMetacontent = getMetacontent;
exports.editMetacontentFlow = editMetacontentFlow;
exports.searchFullDetailNews = searchFullDetailNews;
exports.default = root;

var _reactRouter = require('react-router');

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

var _auth = require('../auth');

var _auth2 = _interopRequireDefault(_auth);

var _constants = require('../actions/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [authorize, logout, getChannelsList, channelsFlow, loginFlow, logoutFlow, getAllMetacontents, submitMetacontent, submitMetacontentFlow, putMetacontent, putMetacontentFlow, createMetacontentFlow, metacontentsFlow, deleteMetacontent, deleteMetacontentFlow, submitKeyword, submitKeywordFlow, getAllKeywords, keywordsFlow, getMetacontent, editMetacontentFlow, searchFullDetailNews, root].map(_regenerator2.default.mark); // This file contains the sagas used for async actions in our app. It's divided into
// "effects" that the sagas call (`authorize` and `logout`) and the actual sagas themselves,
// which listen for actions.

// Sagas help us gather all our side effects (network requests in this case) in one place

var Channels = require('../apis/Channels');
var Metacontents = require('../apis/Metacontents');
var Keyword = require('../apis/Keyword');

/**
 * Effect to handle authorization
 * @param  {string} username               The username of the user
 * @param  {string} password               The password of the user
 * @param  {object} options                Options
 * @param  {boolean} options.isRegistering Is this a register request?
 */
function authorize(_ref) {
  var username = _ref.username;
  var password = _ref.password;
  var isRegistering = _ref.isRegistering;
  var response;
  return _regenerator2.default.wrap(function authorize$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.put)({ type: _constants.SENDING_REQUEST, sending: true });

        case 2:
          _context.prev = 2;
          response = void 0;
          _context.next = 6;
          return (0, _effects.call)(_auth2.default.login, username, password);

        case 6:
          response = _context.sent;
          return _context.abrupt('return', response);

        case 10:
          _context.prev = 10;
          _context.t0 = _context['catch'](2);

          console.log('hi');
          // If we get an error we send Redux the appropiate action and return
          _context.next = 15;
          return (0, _effects.put)({ type: _constants.REQUEST_ERROR, error: _context.t0.message });

        case 15:
          return _context.abrupt('return', false);

        case 16:
          _context.prev = 16;
          _context.next = 19;
          return (0, _effects.put)({ type: _constants.SENDING_REQUEST, sending: false });

        case 19:
          return _context.finish(16);

        case 20:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this, [[2, 10, 16, 20]]);
}

/**
 * Effect to handle logging out
 */
function logout() {
  var response;
  return _regenerator2.default.wrap(function logout$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.put)({ type: _constants.SENDING_REQUEST, sending: true });

        case 2:
          _context2.next = 4;
          return (0, _reduxSaga.delay)(3000);

        case 4:
          _context2.prev = 4;
          _context2.next = 7;
          return (0, _effects.call)(_auth2.default.logout);

        case 7:
          response = _context2.sent;
          _context2.next = 10;
          return (0, _effects.put)({ type: _constants.SENDING_REQUEST, sending: false });

        case 10:
          return _context2.abrupt('return', response);

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2['catch'](4);
          _context2.next = 17;
          return (0, _effects.put)({ type: _constants.REQUEST_ERROR, error: _context2.t0.message });

        case 17:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this, [[4, 13]]);
}

function getChannelsList() {
  var response;
  return _regenerator2.default.wrap(function getChannelsList$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _effects.put)({ type: _constants.SENDING_REQUEST, sending: true });

        case 2:
          _context3.prev = 2;
          _context3.next = 5;
          return (0, _effects.call)(Channels.getChannelsList);

        case 5:
          response = _context3.sent;
          _context3.next = 8;
          return (0, _effects.put)({ type: _constants.SENDING_REQUEST, sending: false });

        case 8:
          return _context3.abrupt('return', response);

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3['catch'](2);
          _context3.next = 15;
          return (0, _effects.put)({ type: _constants.REQUEST_ERROR, error: _context3.t0.message });

        case 15:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked[2], this, [[2, 11]]);
}

function channelsFlow() {
  var request, response;
  return _regenerator2.default.wrap(function channelsFlow$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (!true) {
            _context4.next = 12;
            break;
          }

          _context4.next = 3;
          return (0, _effects.take)(_constants.CHANNEL_LIST);

        case 3:
          request = _context4.sent;
          _context4.next = 6;
          return (0, _effects.call)(getChannelsList);

        case 6:
          response = _context4.sent;
          _context4.next = 9;
          return (0, _effects.put)({ type: _constants.CHANNEL_RECV, channels: response });

        case 9:
          forwardTo('/channels');
          _context4.next = 0;
          break;

        case 12:
        case 'end':
          return _context4.stop();
      }
    }
  }, _marked[3], this);
}

/**
 * Log in saga
 */
function loginFlow() {
  var request, _request$data, username, password, winner;

  return _regenerator2.default.wrap(function loginFlow$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          if (!true) {
            _context5.next = 26;
            break;
          }

          _context5.next = 3;
          return (0, _effects.take)(_constants.LOGIN_REQUEST);

        case 3:
          request = _context5.sent;
          _request$data = request.data;
          username = _request$data.username;
          password = _request$data.password;

          // A `LOGOUT` action may happen while the `authorize` effect is going on, which may
          // lead to a race condition. This is unlikely, but just in case, we call `race` which
          // returns the "winner", i.e. the one that finished first

          _context5.next = 9;
          return (0, _effects.race)({
            auth: (0, _effects.call)(authorize, { username: username, password: password, isRegistering: false }),
            logout: (0, _effects.take)(_constants.LOGOUT)
          });

        case 9:
          winner = _context5.sent;

          if (!winner.auth) {
            _context5.next = 18;
            break;
          }

          _context5.next = 13;
          return (0, _effects.put)({ type: _constants.SET_AUTH, newAuthState: true });

        case 13:
          _context5.next = 15;
          return (0, _effects.put)({ type: _constants.CHANGE_FORM, newFormState: { username: '', password: '' } });

        case 15:
          // Clear form
          forwardTo('/dashboard'); // Go to dashboard page
          // If `logout` won...
          _context5.next = 24;
          break;

        case 18:
          if (!winner.logout) {
            _context5.next = 24;
            break;
          }

          _context5.next = 21;
          return (0, _effects.put)({ type: _constants.SET_AUTH, newAuthState: false });

        case 21:
          _context5.next = 23;
          return (0, _effects.call)(logout);

        case 23:
          // Call `logout` effect
          forwardTo('/'); // Go to root page

        case 24:
          _context5.next = 0;
          break;

        case 26:
        case 'end':
          return _context5.stop();
      }
    }
  }, _marked[4], this);
}

/**
 * Log out saga
 * This is basically the same as the `if (winner.logout)` of above, just written
 * as a saga that is always listening to `LOGOUT` actions
 */
function logoutFlow() {
  return _regenerator2.default.wrap(function logoutFlow$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          if (!true) {
            _context6.next = 10;
            break;
          }

          _context6.next = 3;
          return (0, _effects.take)(_constants.LOGOUT);

        case 3:
          _context6.next = 5;
          return (0, _effects.put)({ type: _constants.SET_AUTH, newAuthState: false });

        case 5:
          _context6.next = 7;
          return (0, _effects.call)(logout);

        case 7:
          forwardTo('/');
          _context6.next = 0;
          break;

        case 10:
        case 'end':
          return _context6.stop();
      }
    }
  }, _marked[5], this);
}

function getAllMetacontents() {
  var response;
  return _regenerator2.default.wrap(function getAllMetacontents$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return (0, _effects.put)({ type: _constants.SENDING_REQUEST, sending: true });

        case 2:
          _context7.prev = 2;
          _context7.next = 5;
          return (0, _effects.call)(Metacontents.getAllMetacontents);

        case 5:
          response = _context7.sent;
          _context7.next = 8;
          return (0, _effects.put)({ type: _constants.SENDING_REQUEST, sending: false });

        case 8:
          return _context7.abrupt('return', response);

        case 11:
          _context7.prev = 11;
          _context7.t0 = _context7['catch'](2);
          _context7.next = 15;
          return (0, _effects.put)({ type: _constants.REQUEST_ERROR, error: _context7.t0.message });

        case 15:
        case 'end':
          return _context7.stop();
      }
    }
  }, _marked[6], this, [[2, 11]]);
}

function submitMetacontent(metacontent) {
  var response;
  return _regenerator2.default.wrap(function submitMetacontent$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return (0, _effects.put)({ type: _constants.SENDING_REQUEST, sending: true });

        case 2:
          _context8.prev = 2;
          _context8.next = 5;
          return (0, _effects.call)(Metacontents.submitMetacontent, metacontent);

        case 5:
          response = _context8.sent;
          _context8.next = 8;
          return (0, _effects.put)({ type: _constants.SENDING_REQUEST, sending: false });

        case 8:
          return _context8.abrupt('return', response);

        case 11:
          _context8.prev = 11;
          _context8.t0 = _context8['catch'](2);
          _context8.next = 15;
          return (0, _effects.put)({ type: _constants.REQUEST_ERROR, error: _context8.t0.message });

        case 15:
        case 'end':
          return _context8.stop();
      }
    }
  }, _marked[7], this, [[2, 11]]);
}

function submitMetacontentFlow() {
  var request, response;
  return _regenerator2.default.wrap(function submitMetacontentFlow$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          if (!true) {
            _context9.next = 11;
            break;
          }

          _context9.next = 3;
          return (0, _effects.take)(_constants.SUBMIT_METACONTENT);

        case 3:
          request = _context9.sent;
          _context9.next = 6;
          return (0, _effects.call)(submitMetacontent, request.metacontent);

        case 6:
          response = _context9.sent;
          _context9.next = 9;
          return (0, _effects.put)({ type: _constants.SUBMIT_METACONTENT_OK });

        case 9:
          _context9.next = 0;
          break;

        case 11:
        case 'end':
          return _context9.stop();
      }
    }
  }, _marked[8], this);
}

function putMetacontent(metacontent) {
  var response;
  return _regenerator2.default.wrap(function putMetacontent$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return (0, _effects.put)({ type: _constants.SENDING_REQUEST, sending: true });

        case 2:
          _context10.prev = 2;
          _context10.next = 5;
          return (0, _effects.call)(Metacontents.putMetacontent, metacontent);

        case 5:
          response = _context10.sent;
          _context10.next = 8;
          return (0, _effects.put)({ type: _constants.SENDING_REQUEST, sending: false });

        case 8:
          return _context10.abrupt('return', response);

        case 11:
          _context10.prev = 11;
          _context10.t0 = _context10['catch'](2);
          _context10.next = 15;
          return (0, _effects.put)({ type: _constants.REQUEST_ERROR, error: _context10.t0.message });

        case 15:
        case 'end':
          return _context10.stop();
      }
    }
  }, _marked[9], this, [[2, 11]]);
}

function putMetacontentFlow() {
  var request, response;
  return _regenerator2.default.wrap(function putMetacontentFlow$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          if (!true) {
            _context11.next = 12;
            break;
          }

          _context11.next = 3;
          return (0, _effects.take)("PUT_METACONTENT");

        case 3:
          request = _context11.sent;
          _context11.next = 6;
          return (0, _effects.call)(putMetacontent, request.metacontent);

        case 6:
          response = _context11.sent;
          _context11.next = 9;
          return (0, _effects.put)({ type: "PUT_METACONTENT_OK" });

        case 9:
          forwardTo('/metacontents');
          _context11.next = 0;
          break;

        case 12:
        case 'end':
          return _context11.stop();
      }
    }
  }, _marked[10], this);
}

function createMetacontentFlow() {
  var channels;
  return _regenerator2.default.wrap(function createMetacontentFlow$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          if (!true) {
            _context12.next = 10;
            break;
          }

          _context12.next = 3;
          return (0, _effects.take)(_constants.CREATE_METACONTENT);

        case 3:
          _context12.next = 5;
          return (0, _effects.call)(getChannelsList);

        case 5:
          channels = _context12.sent;
          _context12.next = 8;
          return (0, _effects.put)({ type: _constants.CREATE_METACONTENT_READY, channels: channels });

        case 8:
          _context12.next = 0;
          break;

        case 10:
        case 'end':
          return _context12.stop();
      }
    }
  }, _marked[11], this);
}

function metacontentsFlow() {
  var metacontents, channels;
  return _regenerator2.default.wrap(function metacontentsFlow$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          if (!true) {
            _context13.next = 13;
            break;
          }

          _context13.next = 3;
          return (0, _effects.take)(_constants.METACONTENT_ALL);

        case 3:
          _context13.next = 5;
          return (0, _effects.call)(getAllMetacontents);

        case 5:
          metacontents = _context13.sent;
          _context13.next = 8;
          return (0, _effects.call)(getChannelsList);

        case 8:
          channels = _context13.sent;
          _context13.next = 11;
          return (0, _effects.put)({ type: _constants.METACONTENT_RECV, metacontents: metacontents, channels: channels });

        case 11:
          _context13.next = 0;
          break;

        case 13:
        case 'end':
          return _context13.stop();
      }
    }
  }, _marked[12], this);
}

function deleteMetacontent(metacontent) {
  var response;
  return _regenerator2.default.wrap(function deleteMetacontent$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.next = 2;
          return (0, _effects.put)({ type: _constants.SENDING_REQUEST, sending: true });

        case 2:
          _context14.prev = 2;
          _context14.next = 5;
          return (0, _effects.call)(Metacontents.deleteMetacontent, metacontent);

        case 5:
          response = _context14.sent;
          _context14.next = 8;
          return (0, _effects.put)({ type: _constants.SENDING_REQUEST, sending: false });

        case 8:
          return _context14.abrupt('return', response);

        case 11:
          _context14.prev = 11;
          _context14.t0 = _context14['catch'](2);
          _context14.next = 15;
          return (0, _effects.put)({ type: _constants.REQUEST_ERROR, error: _context14.t0.message });

        case 15:
        case 'end':
          return _context14.stop();
      }
    }
  }, _marked[13], this, [[2, 11]]);
}

function deleteMetacontentFlow() {
  var request, response;
  return _regenerator2.default.wrap(function deleteMetacontentFlow$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          if (!true) {
            _context15.next = 11;
            break;
          }

          _context15.next = 3;
          return (0, _effects.take)(_constants.DELETE_METACONTENT);

        case 3:
          request = _context15.sent;
          _context15.next = 6;
          return (0, _effects.call)(deleteMetacontent, request.metacontent);

        case 6:
          response = _context15.sent;
          _context15.next = 9;
          return (0, _effects.put)({ type: _constants.DELETE_METACONTENT_OK, deleted_id: request.metacontent.id });

        case 9:
          _context15.next = 0;
          break;

        case 11:
        case 'end':
          return _context15.stop();
      }
    }
  }, _marked[14], this);
}

function submitKeyword(keyword) {
  var response;
  return _regenerator2.default.wrap(function submitKeyword$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.next = 2;
          return (0, _effects.put)({ type: _constants.SENDING_REQUEST, sending: true });

        case 2:
          _context16.prev = 2;
          _context16.next = 5;
          return (0, _effects.call)(Keyword.submitKeyword, keyword);

        case 5:
          response = _context16.sent;
          _context16.next = 8;
          return (0, _effects.put)({ type: _constants.SENDING_REQUEST, sending: false });

        case 8:
          return _context16.abrupt('return', response);

        case 11:
          _context16.prev = 11;
          _context16.t0 = _context16['catch'](2);
          _context16.next = 15;
          return (0, _effects.put)({ type: _constants.REQUEST_ERROR, error: _context16.t0.message });

        case 15:
        case 'end':
          return _context16.stop();
      }
    }
  }, _marked[15], this, [[2, 11]]);
}

function submitKeywordFlow() {
  var request, response;
  return _regenerator2.default.wrap(function submitKeywordFlow$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          if (!true) {
            _context17.next = 12;
            break;
          }

          _context17.next = 3;
          return (0, _effects.take)(_constants.SUBMIT_KEYWORD);

        case 3:
          request = _context17.sent;
          _context17.next = 6;
          return (0, _effects.call)(submitKeyword, request.keyword);

        case 6:
          response = _context17.sent;
          _context17.next = 9;
          return (0, _effects.put)({ type: _constants.SUBMIT_KEYWORD_OK });

        case 9:
          forwardTo('/keyword/create');
          _context17.next = 0;
          break;

        case 12:
        case 'end':
          return _context17.stop();
      }
    }
  }, _marked[16], this);
}

function getAllKeywords() {
  var response;
  return _regenerator2.default.wrap(function getAllKeywords$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.next = 2;
          return (0, _effects.put)({ type: _constants.SENDING_REQUEST, sending: true });

        case 2:
          _context18.prev = 2;
          _context18.next = 5;
          return (0, _effects.call)(Keyword.getAllKeywords);

        case 5:
          response = _context18.sent;
          _context18.next = 8;
          return (0, _effects.put)({ type: _constants.SENDING_REQUEST, sending: false });

        case 8:
          return _context18.abrupt('return', response);

        case 11:
          _context18.prev = 11;
          _context18.t0 = _context18['catch'](2);
          _context18.next = 15;
          return (0, _effects.put)({ type: _constants.REQUEST_ERROR, error: _context18.t0.message });

        case 15:
        case 'end':
          return _context18.stop();
      }
    }
  }, _marked[17], this, [[2, 11]]);
}

function keywordsFlow() {
  var keywords, channels;
  return _regenerator2.default.wrap(function keywordsFlow$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          if (!true) {
            _context19.next = 13;
            break;
          }

          _context19.next = 3;
          return (0, _effects.take)(_constants.KEYWORD_ALL);

        case 3:
          _context19.next = 5;
          return (0, _effects.call)(getAllKeywords);

        case 5:
          keywords = _context19.sent;
          _context19.next = 8;
          return (0, _effects.call)(getChannelsList);

        case 8:
          channels = _context19.sent;
          _context19.next = 11;
          return (0, _effects.put)({ type: _constants.KEYWORD_RECV, keywords: keywords, channels: channels });

        case 11:
          _context19.next = 0;
          break;

        case 13:
        case 'end':
          return _context19.stop();
      }
    }
  }, _marked[18], this);
}

function getMetacontent(id) {
  var response;
  return _regenerator2.default.wrap(function getMetacontent$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          _context20.next = 2;
          return (0, _effects.put)({ type: _constants.SENDING_REQUEST, sending: true });

        case 2:
          _context20.prev = 2;
          _context20.next = 5;
          return (0, _effects.call)(Metacontents.getMetacontent, id);

        case 5:
          response = _context20.sent;
          _context20.next = 8;
          return (0, _effects.put)({ type: _constants.SENDING_REQUEST, sending: false });

        case 8:
          return _context20.abrupt('return', response);

        case 11:
          _context20.prev = 11;
          _context20.t0 = _context20['catch'](2);
          _context20.next = 15;
          return (0, _effects.put)({ type: _constants.REQUEST_ERROR, error: _context20.t0.message });

        case 15:
        case 'end':
          return _context20.stop();
      }
    }
  }, _marked[19], this, [[2, 11]]);
}

function editMetacontentFlow() {
  var request, metacontent, channels;
  return _regenerator2.default.wrap(function editMetacontentFlow$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          if (!true) {
            _context21.next = 14;
            break;
          }

          _context21.next = 3;
          return (0, _effects.take)(_constants.EDIT_METACONTENT);

        case 3:
          request = _context21.sent;
          _context21.next = 6;
          return (0, _effects.call)(getMetacontent, request.metacontent_id);

        case 6:
          metacontent = _context21.sent;
          _context21.next = 9;
          return (0, _effects.call)(getChannelsList);

        case 9:
          channels = _context21.sent;
          _context21.next = 12;
          return (0, _effects.put)({ type: "EDIT_METACONTENT_OK", metacontent: metacontent, channels: channels });

        case 12:
          _context21.next = 0;
          break;

        case 14:
        case 'end':
          return _context21.stop();
      }
    }
  }, _marked[20], this);
}

function searchFullDetailNews() {
  var request, list_metacontent;
  return _regenerator2.default.wrap(function searchFullDetailNews$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          if (!true) {
            _context22.next = 9;
            break;
          }

          _context22.next = 3;
          return (0, _effects.take)(_constants.SEARCH_FULL_DETAIL_METACONTENT_NEWS);

        case 3:
          request = _context22.sent;
          _context22.next = 6;
          return (0, _effects.call)(Metacontents);

        case 6:
          list_metacontent = _context22.sent;
          _context22.next = 0;
          break;

        case 9:
        case 'end':
          return _context22.stop();
      }
    }
  }, _marked[21], this);
}

// The root saga is what we actually send to Redux's middleware. In here we fork
// each saga so that they are all "active" and listening.
// Sagas are fired once at the start of an app and can be thought of as processes running
// in the background, watching actions dispatched to the store.
function root() {
  return _regenerator2.default.wrap(function root$(_context23) {
    while (1) {
      switch (_context23.prev = _context23.next) {
        case 0:
          _context23.next = 2;
          return (0, _effects.fork)(loginFlow);

        case 2:
          _context23.next = 4;
          return (0, _effects.fork)(logoutFlow);

        case 4:
          _context23.next = 6;
          return (0, _effects.fork)(channelsFlow);

        case 6:
          _context23.next = 8;
          return (0, _effects.fork)(metacontentsFlow);

        case 8:
          _context23.next = 10;
          return (0, _effects.fork)(createMetacontentFlow);

        case 10:
          _context23.next = 12;
          return (0, _effects.fork)(submitMetacontentFlow);

        case 12:
          _context23.next = 14;
          return (0, _effects.fork)(deleteMetacontentFlow);

        case 14:
          _context23.next = 16;
          return (0, _effects.fork)(submitKeywordFlow);

        case 16:
          _context23.next = 18;
          return (0, _effects.fork)(keywordsFlow);

        case 18:
          _context23.next = 20;
          return (0, _effects.fork)(editMetacontentFlow);

        case 20:
          _context23.next = 22;
          return (0, _effects.fork)(putMetacontentFlow);

        case 22:
        case 'end':
          return _context23.stop();
      }
    }
  }, _marked[22], this);
}

// Little helper function to abstract going to different pages
function forwardTo(location) {
  _reactRouter.browserHistory.push(location);
}

//# sourceMappingURL=index-compiled.js.map