var requestify = require('requestify')
import decode from 'jwt-decode';
import {AuthenticationClient, DatabaseAuthenticator, OAuthAuthenticator} from 'auth0';

var authClient = new AuthenticationClient({
  domain: 'thangntt.au.auth0.com',
  clientId: 'OTYXYV8Eu0UZ139YKuPk94cX7UhP2pgH'
});

let auth = {
  /**
  * Logs a user in, returning a promise with `true` when done
  * @param  {string} username The username of the user
  * @param  {string} password The password of the user
  */
  login (username, password) {
    if (auth.loggedIn()) return Promise.resolve(true);

    return authClient.database.signIn({
      username: username,
      password: password,
      connection: 'Username-Password-Authentication',
    }).then(function(userData) {
      console.log(localStorage.id_token);
      localStorage.id_token = userData.id_token;
      localStorage.access_token = userData.access_token;
      return Promise.resolve(true);
    }).catch(function(err) {
      console.error(err);
    })
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
    console.log('wtf')
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
  onChange () {}
}

export default auth
