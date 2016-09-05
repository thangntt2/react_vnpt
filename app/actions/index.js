/*
 * Actions describe changes of state in your application
 */

// We import constants to name our actions' type
import {
  CHANGE_FORM,
  SET_AUTH,
  SENDING_REQUEST,
  LOGIN_REQUEST,
  LOGOUT,
  REQUEST_ERROR,
  CLEAR_ERROR,
  CHANNEL_LIST,
  METACONTENT_ALL,
  SUBMIT_METACONTENT,
  CREATE_METACONTENT,
  DELETE_METACONTENT,
} from './constants'
import {DELETE_CHANNEL} from "./constants";

/**
 * Sets the form state
 * @param  {object} newFormState          The new state of the form
 * @param  {string} newFormState.username The new text of the username input field of the form
 * @param  {string} newFormState.password The new text of the password input field of the form
 */
export function changeForm (newFormState) {
  return {type: CHANGE_FORM, newFormState}
}

/**
 * Sets the authentication state of the application
 * @param  {boolean} newAuthState True means a user is logged in, false means no user is logged in
 */
export function setAuthState (newAuthState) {
  return {type: SET_AUTH, newAuthState}
}

export function getAllMetacontents() {
  return {type: METACONTENT_ALL}
}

/**
 * Sets the `currentlySending` state, which displays a loading indicator during requests
 * @param  {boolean} sending True means we're sending a request, false means we're not
 */
export function sendingRequest (sending) {
  return {type: SENDING_REQUEST, sending}
}

/**
 * Tells the app we want to log in a user
 * @param  {object} data          The data we're sending for log in
 * @param  {string} data.username The username of the user to log in
 * @param  {string} data.password The password of the user to log in
 */
export function loginRequest (data) {
  return {type: LOGIN_REQUEST, data}
}

/**
 * Tells the app we want to log out a user
 */
export function logout () {
  return {type: LOGOUT}
}

/**
 * Sets the `error` state to the error received
 * @param  {object} error The error we got when trying to make the request
 */
export function requestError (error) {
  return {type: REQUEST_ERROR, error}
}

export function getChannelsList () {
  return {type: CHANNEL_LIST}
}

/**
 * Sets the `error` state as empty
 */
export function clearError () {
  return {type: CLEAR_ERROR}
}

export function submitMetacontent(metacontent) {
  return {type: SUBMIT_METACONTENT, metacontent: metacontent}
}

export function createMetacontent() {
  return {type: CREATE_METACONTENT}
}

export function deleteMetacontent(metacontent) {
  return {type: DELETE_METACONTENT, metacontent: metacontent}
}
