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
var Keyword = require('../apis/Keyword')

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
  DELETE_METACONTENT,
  DELETE_METACONTENT_OK,
  SUBMIT_KEYWORD,
  SUBMIT_KEYWORD_OK,
  KEYWORD_ALL,
  KEYWORD_RECV,
  EDIT_METACONTENT,
  SEARCH_FULL_DETAIL_METACONTENT_NEWS,
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
      forwardTo('/dashboard') // Go to dashboard page
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

    yield put({type: SUBMIT_METACONTENT_OK})
    // forwardTo('/metacontents/create')
  }
}

export function * putMetacontent(metacontent) {
  yield put({type: SENDING_REQUEST, sending: true})
  try {
    let response = yield call(Metacontents.putMetacontent, metacontent)
    yield put({type: SENDING_REQUEST, sending: false})

    return response
  }  catch (error) {
    yield put({type: REQUEST_ERROR, error: error.message})
  }
}

export function * putMetacontentFlow() {
  while (true) {
    let request = yield take("PUT_METACONTENT")

    let response = yield call(putMetacontent, request.metacontent)

    yield put({type: "PUT_METACONTENT_OK"})
    forwardTo('/metacontents')
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
    let channels = yield(call(getChannelsList))

    yield put({type: METACONTENT_RECV, metacontents: metacontents, channels: channels})
  }
}

export function * deleteMetacontent(metacontent) {
  yield put({type: SENDING_REQUEST, sending: true})
  try {
    let response = yield(call(Metacontents.deleteMetacontent, metacontent))
    yield put({type: SENDING_REQUEST, sending: false})

    return response
  } catch (error) {
    yield put({type: REQUEST_ERROR, error: error.message})
  }
}

export function * deleteMetacontentFlow() {
  while (true) {
    let request = yield take(DELETE_METACONTENT)

    let response = yield(call(deleteMetacontent, request.metacontent))

    yield put({type: DELETE_METACONTENT_OK, deleted_id: request.metacontent.id})
  }
}

export function *submitKeyword(keyword) {
  yield put({type: SENDING_REQUEST, sending: true})
  try {
    let response = yield call(Keyword.submitKeyword, keyword)
    yield put({type: SENDING_REQUEST, sending: false})

    return response
  }  catch (error) {
    yield put({type: REQUEST_ERROR, error: error.message})
  }
}

export function *submitKeywordFlow() {
  while (true) {
    let request = yield take(SUBMIT_KEYWORD)

    let response = yield call(submitKeyword, request.keyword)

    yield put({type: SUBMIT_KEYWORD_OK})
    // forwardTo('/keyword/create')
  }
}

export function *getAllKeywords() {
  yield put({type: SENDING_REQUEST, sending: true})
  try {
    let response = yield call(Keyword.getAllKeywords)
    yield put({type: SENDING_REQUEST, sending: false})

    return response
  }  catch (error) {
    yield put({type: REQUEST_ERROR, error: error.message})
  }
}

export function *keywordsFlow() {
  while (true) {
    yield take(KEYWORD_ALL)

    let keywords = yield(call(getAllKeywords))
    let channels = yield(call(getChannelsList))

    yield put({type: KEYWORD_RECV, keywords: keywords.body, channels: channels})
  }
}

export function *getMetacontent(id) {
  yield put({type: SENDING_REQUEST, sending: true})
  try {
    let response = yield call(Metacontents.getMetacontent, id)
    yield put({type: SENDING_REQUEST, sending: false})

    return response
  }  catch (error) {
    yield put({type: REQUEST_ERROR, error: error.message})
  }
}

export function *editMetacontentFlow() {
  while (true) {
    let request = yield take(EDIT_METACONTENT)

    let metacontent = yield call(getMetacontent, request.metacontent_id)
    let channels = yield call(getChannelsList)
    yield put({type: "EDIT_METACONTENT_OK", metacontent: metacontent.body, channels: channels})
  }
}

export function *searchFullDetailNews() {
  while (true) {
    let request = yield take(SEARCH_FULL_DETAIL_METACONTENT_NEWS)
    let list_metacontent = yield call(Metacontents)
  }
}

export function *submitChannel(channel) {
  yield put({type: SENDING_REQUEST, sending: true})
  try {
    let response = yield call(Channels.submitChannel, channel)
    yield put({type: SENDING_REQUEST, sending: false})

    return response
  }  catch (error) {
    yield put({type: REQUEST_ERROR, error: error.message})
  }
}

export function *submitChannelFlow() {
  while (true) {
    let request = yield take("SUBMIT_CHANNEL")

    let response = yield call(submitChannel, request.channel)

    yield put({type: "SUBMIT_CHANNEL_OK"})
  }
}

export function* deleteChannel(channel) {
  yield put({type: SENDING_REQUEST, sending: true})
  try {
    let response = yield(call(Channels.deleteChannel, channel))
    yield put({type: SENDING_REQUEST, sending: false})

    return response
  } catch (error) {
    yield put({type: REQUEST_ERROR, error: error.message})
  }
}

export function *deleteChannelFlow() {
  while (true) {
    let request = yield take('DELETE_CHANNEL')

    let response = yield call(deleteChannel, request.channel)

    yield put({type: "DELETE_CHANNEL_OK", deleted_id: request.channel.id})
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
  yield fork(deleteMetacontentFlow)
  yield fork(submitKeywordFlow)
  yield fork(keywordsFlow)
  yield fork(editMetacontentFlow)
  yield fork(putMetacontentFlow)
  yield fork(submitChannelFlow)
  yield fork(deleteChannelFlow)
}

// Little helper function to abstract going to different pages
function forwardTo (location) {
  browserHistory.push(location)
}
