/*
 * The reducer takes care of state changes in our app through actions
 */

import {
  CHANGE_FORM,
  SET_AUTH,
  SENDING_REQUEST,
  REQUEST_ERROR,
  CLEAR_ERROR,
  CHANNEL_RECV,
  CREATE_METACONTENT_READY,
  METACONTENT_RECV,
} from '../actions/constants'
import auth from '../auth'

// The initial application state
let initialState = {
  formState: {
    username: '',
    password: ''
  },
  error: '',
  currentlySending: false,
  loggedIn: auth.loggedIn()
}

// Takes care of changing the application state
function reducer (state = initialState, action) {
  switch (action.type) {
    case CHANGE_FORM:
      return {...state, formState: action.newFormState}
    case SET_AUTH:
      return {...state, loggedIn: action.newAuthState}
    case SENDING_REQUEST:
      return {...state, currentlySending: action.sending}
    case CHANNEL_RECV:
      return {...state, channels_list: action.channels}
    case REQUEST_ERROR:
      return {...state, error: action.error}
    case CLEAR_ERROR:
      return {...state, error: ''}
    case CREATE_METACONTENT_READY:
      return {...state, channels: action.channels}
    case METACONTENT_RECV:
      return {...state, metacontents: action.metacontents}
    default:
      return state
  }
}

export default reducer
