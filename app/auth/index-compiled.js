'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _jwtDecode = require('jwt-decode');

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

var _auth = require('auth0');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requestify = require('requestify');


var authClient = new _auth.AuthenticationClient({
  domain: 'thangntt.au.auth0.com',
  clientId: 'OTYXYV8Eu0UZ139YKuPk94cX7UhP2pgH'
});

var auth = {
  /**
  * Logs a user in, returning a promise with `true` when done
  * @param  {string} username The username of the user
  * @param  {string} password The password of the user
  */
  login: function login(username, password) {
    if (auth.loggedIn()) return _promise2.default.resolve(true);

    return authClient.database.signIn({
      username: username,
      password: password,
      connection: 'Username-Password-Authentication'
    }).then(function (userData) {
      console.log(localStorage.id_token);
      localStorage.id_token = userData.id_token;
      localStorage.access_token = userData.access_token;
      return _promise2.default.resolve(true);
    }).catch(function (err) {
      console.error(err);
    });
  },
  getTokenExpirationDate: function getTokenExpirationDate(token) {
    var decoded = (0, _jwtDecode2.default)(token);
    if (!_jwtDecode2.default.exp) {
      return null;
    }
    var date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  },
  isTokenExpired: function isTokenExpired(token) {
    var date = auth.getTokenExpirationDate(token);
    var offsetSeconds = 0;
    if (date == null) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
  },

  /**
  * Logs the current user out
  */
  logout: function logout() {
    console.log('wtf');
    return new _promise2.default(function (resolve) {
      localStorage.removeItem('id_token');
      resolve(true);
    });
  },

  /**
  * Checks if a user is logged in
  */
  loggedIn: function loggedIn() {
    return !!localStorage.id_token && !auth.isTokenExpired(localStorage.id_token);
  },
  onChange: function onChange() {}
};

exports.default = auth;

//# sourceMappingURL=index-compiled.js.map