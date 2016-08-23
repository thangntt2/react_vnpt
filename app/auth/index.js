var requestify = require('requestify')
import decode from 'jwt-decode';
import {AuthenticationClient, DatabaseAuthenticator, OAuthAuthenticator} from 'auth0';

var authClient = new AuthenticationClient({
  domain: 'thangntt.au.auth0.com',
  clientId: 'OTYXYV8Eu0UZ139YKuPk94cX7UhP2pgH'
});

// var oauth = new OAuthAuthenticator({
//   baseUrl: 'https://thangntt.au.auth0.com',
//   clientId: 'auJrGCgK5v2nJw8abCTq43bvcqjtbyRz'
// });
// var db_auth = new DatabaseAuthenticator({},oauth);

let localStorage

// If we're testing, use a local storage polyfill
if (global.process && process.env.NODE_ENV === 'test') {
  localStorage = require('localStorage')
} else {
  // If not, use the browser one
  localStorage = global.window.localStorage
}

let auth = {
  /**
  * Logs a user in, returning a promise with `true` when done
  * @param  {string} username The username of the user
  * @param  {string} password The password of the user
  */
  login (username, password) {
    if (auth.loggedIn()) return Promise.resolve(true)
    authClient.database.signIn({
      username: username,
      password: password,
      connection: 'Username-Password-Authentication',
    }, function(err, userData) {
      if (err) {
        console.log(err);
      } else {
        localStorage.id_token = userData.id_token;
        localStorage.access_token = userData.access_token;
        return Promise.resolve(true); 
      }
    });
  },
  getTokenExpirationDate(token) {
    const decoded = decode(token);
    if (!decode.exp) {
      return null;
    }
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }, 
  isTokenExpired(token) {
    const date = auth.getTokenExpirationDate(token);
    const offsetSeconds = 0;
    if (date == null) {
      return false;
    }
    return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
  },
  /**
  * Logs the current user out
  */
  logout () {
    return new Promise(resolve => {
      localStorage.removeItem('id_token');
      resolve(true);
    })
  },
  /**
  * Checks if a user is logged in
  */
  loggedIn () {
    return !!localStorage.id_token && !auth.isTokenExpired(localStorage.id_token);
  },
  /**
  * Registers a user and then logs them in
  * @param  {string} username The username of the user
  * @param  {string} password The password of the user
  */
  register (username, password) {
    // Post a fake request
    return request.post('/register', {username, password})
      // Log user in after registering
      .then(() => auth.login(username, password))
  },
  onChange () {}
}

export default auth
