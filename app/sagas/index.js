// This file contains the sagas used for async actions in our app. It's divided into
// "effects" that the sagas call (`authorize` and `logout`) and the actual sagas themselves,
// which listen for actions.

// Sagas help us gather all our side effects (network requests in this case) in one place

import {browserHistory} from 'react-router'
import { takeEvery, delay } from 'redux-saga'
import {take, call, put, fork, race} from 'redux-saga/effects'
import auth from '../auth'
var Channels = require('../apis/Channels')
var Metacontents = require('../apis/Metacontents')

import {
  SENDING_REQUEST,
  LOGIN_REQUEST,
  SET_AUTH,
  LOGOUT,
  CHANGE_FORM,
  REQUEST_ERROR,
  CHANNEL_LIST,
  CHANNEL_RECV,
  METACONTENT_ALL,
  METACONTENT_RECV,
  SUBMIT_METACONTENT,
  SUBMIT_METACONTENT_OK,
  CREATE_METACONTENT,
  CREATE_METACONTENT_READY,
} from '../actions/constants'

/**
 * Effect to handle authorization
 * @param  {string} username               The username of the user
 * @param  {string} password               The password of the user
 * @param  {object} options                Options
 * @param  {boolean} options.isRegistering Is this a register request?
 */
export function * authorize ({username, password, isRegistering}) {
  // We send an action that tells Redux we're sending a request
  yield put({type: SENDING_REQUEST, sending: true})

  // We then try to register or log in the user, depending on the request
  try {
    let response
    response = yield call(auth.login, username, password)
    return response
  } catch (error) {
    console.log('hi')
    // If we get an error we send Redux the appropiate action and return
    yield put({type: REQUEST_ERROR, error: error.message})

    return false
  } finally {
    // When done, we tell Redux we're not in the middle of a request any more
    yield put({type: SENDING_REQUEST, sending: false})
  }
}

/**
 * Effect to handle logging out
 */
export function * logout () {
  // We tell Redux we're in the middle of a request
  yield put({type: SENDING_REQUEST, sending: true})
  yield delay(3000)
  // Similar to above, we try to log out by calling the `logout` function in the
  // `auth` module. If we get an error, we send an appropiate action. If we don't,
  // we return the response.
  try {
    let response = yield call(auth.logout)
    yield put({type: SENDING_REQUEST, sending: false})

    return response
  } catch (error) {
    yield put({type: REQUEST_ERROR, error: error.message})
  }
}

export function * getChannelsList() {
  // We tell Redux we're in the middle of a request
  yield put({type: SENDING_REQUEST, sending: true})
  try {
    let response = yield call(Channels.getChannelsList)
    yield put({type: SENDING_REQUEST, sending: false})

    return response
  }  catch (error) {
    yield put({type: REQUEST_ERROR, error: error.message})
  }
}

export function * channelsFlow() {
  while (true) {
    let request = yield take(CHANNEL_LIST)

    let response = yield call(getChannelsList)

    yield put({type: CHANNEL_RECV, channels: response})
    forwardTo('/channels')
  }
}

/**
 * Log in saga
 */
export function * loginFlow () {
  // Because sagas are generators, doing `while (true)` doesn't block our program
  // Basically here we say "this saga is always listening for actions"
  while (true) {
    // And we're listening for `LOGIN_REQUEST` actions and destructuring its payload
    let request = yield take(LOGIN_REQUEST)
    let {username, password} = request.data

    // A `LOGOUT` action may happen while the `authorize` effect is going on, which may
    // lead to a race condition. This is unlikely, but just in case, we call `race` which
    // returns the "winner", i.e. the one that finished first
    let winner = yield race({
      auth: call(authorize, {username, password, isRegistering: false}),
      logout: take(LOGOUT)
    })
    // If `authorize` was the winner...
    if (winner.auth) {
      // ...we send Redux appropiate actions
      yield put({type: SET_AUTH, newAuthState: true}) // User is logged in (authorized)
      yield put({type: CHANGE_FORM, newFormState: {username: '', password: ''}}) // Clear form
      // forwardTo('/dashboard') // Go to dashboard page
      // If `logout` won...
    } else if (winner.logout) {
      // ...we send Redux appropiate action
      yield put({type: SET_AUTH, newAuthState: false}) // User is not logged in (not authorized)
      yield call(logout) // Call `logout` effect
      forwardTo('/') // Go to root page
    }
  }
}

/**
 * Log out saga
 * This is basically the same as the `if (winner.logout)` of above, just written
 * as a saga that is always listening to `LOGOUT` actions
 */
export function * logoutFlow () {
  while (true) {
    yield take(LOGOUT)
    yield put({type: SET_AUTH, newAuthState: false})

    yield call(logout)
    forwardTo('/')
  }
}

export function * getAllMetacontents() {
  // We tell Redux we're in the middle of a request
  yield put({type: SENDING_REQUEST, sending: true})
  try {
    let response = yield call(Metacontents.getAllMetacontents)
    yield put({type: SENDING_REQUEST, sending: false})

    return response
  }  catch (error) {
    yield put({type: REQUEST_ERROR, error: error.message})
  }
}

export function * submitMetacontent(metacontent) {
  yield put({type: SENDING_REQUEST, sending: true})
  try {
    let response = yield call(Metacontents.submitMetacontent, metacontent)
    yield put({type: SENDING_REQUEST, sending: false})

    return response
  }  catch (error) {
    yield put({type: REQUEST_ERROR, error: error.message})
  }
}

export function * submitMetacontentFlow() {
  while (true) {
    let request = yield take(SUBMIT_METACONTENT)

    let response = yield call(submitMetacontent, request.metacontent)
    console.log(response)

    yield put({type: SUBMIT_METACONTENT_OK, name: '',
      description: '',
      url: '',
      image: '',
      category: 'Location',
      channel: '0',})
    forwardTo('/metacontents/create')
  }
}

export function * createMetacontentFlow() {
  while (true) {
    yield take(CREATE_METACONTENT)

    let channels = yield(call(getChannelsList))

    yield put({type: CREATE_METACONTENT_READY, channels: channels})
  }
}

export function * metacontentsFlow() {
  while (true) {
    yield take(METACONTENT_ALL)

    let metacontents = yield(call(getAllMetacontents))

    yield put({type: METACONTENT_RECV, metacontents: metacontents})
  }
}

// The root saga is what we actually send to Redux's middleware. In here we fork
// each saga so that they are all "active" and listening.
// Sagas are fired once at the start of an app and can be thought of as processes running
// in the background, watching actions dispatched to the store.
export default function * root () {
  yield fork(loginFlow)
  yield fork(logoutFlow)
  yield fork(channelsFlow)
  yield fork(metacontentsFlow)
  yield fork(createMetacontentFlow)
  yield fork(submitMetacontentFlow)
}

// Little helper function to abstract going to different pages
function forwardTo (location) {
  browserHistory.push(location)
}
