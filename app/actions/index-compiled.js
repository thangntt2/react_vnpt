"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeForm = changeForm;
exports.setAuthState = setAuthState;
exports.getAllMetacontents = getAllMetacontents;
exports.sendingRequest = sendingRequest;
exports.loginRequest = loginRequest;
exports.logout = logout;
exports.requestError = requestError;
exports.getChannelsList = getChannelsList;
exports.clearError = clearError;
exports.submitMetacontent = submitMetacontent;
exports.putMetacontent = putMetacontent;
exports.createMetacontent = createMetacontent;
exports.deleteMetacontent = deleteMetacontent;
exports.submitKeyword = submitKeyword;
exports.getAllKeywords = getAllKeywords;
exports.deleteKeyword = deleteKeyword;
exports.deleteChannel = deleteChannel;
exports.editMetacontent = editMetacontent;
exports.searchFullDetailNews = searchFullDetailNews;
exports.submitChannel = submitChannel;

var _constants = require("./constants");

/**
 * Sets the form state
 * @param  {object} newFormState          The new state of the form
 * @param  {string} newFormState.username The new text of the username input field of the form
 * @param  {string} newFormState.password The new text of the password input field of the form
 */
function changeForm(newFormState) {
  return { type: _constants.CHANGE_FORM, newFormState: newFormState };
}

/**
 * Sets the authentication state of the application
 * @param  {boolean} newAuthState True means a user is logged in, false means no user is logged in
 */
/*
 * Actions describe changes of state in your application
 */

// We import constants to name our actions' type
function setAuthState(newAuthState) {
  return { type: _constants.SET_AUTH, newAuthState: newAuthState };
}

function getAllMetacontents() {
  return { type: _constants.METACONTENT_ALL };
}

/**
 * Sets the `currentlySending` state, which displays a loading indicator during requests
 * @param  {boolean} sending True means we're sending a request, false means we're not
 */
function sendingRequest(sending) {
  return { type: _constants.SENDING_REQUEST, sending: sending };
}

/**
 * Tells the app we want to log in a user
 * @param  {object} data          The data we're sending for log in
 * @param  {string} data.username The username of the user to log in
 * @param  {string} data.password The password of the user to log in
 */
function loginRequest(data) {
  return { type: _constants.LOGIN_REQUEST, data: data };
}

/**
 * Tells the app we want to log out a user
 */
function logout() {
  return { type: _constants.LOGOUT };
}

/**
 * Sets the `error` state to the error received
 * @param  {object} error The error we got when trying to make the request
 */
function requestError(error) {
  return { type: _constants.REQUEST_ERROR, error: error };
}

function getChannelsList() {
  return { type: _constants.CHANNEL_LIST };
}

/**
 * Sets the `error` state as empty
 */
function clearError() {
  return { type: _constants.CLEAR_ERROR };
}

function submitMetacontent(metacontent) {
  return { type: _constants.SUBMIT_METACONTENT, metacontent: metacontent };
}

function putMetacontent(metacontent) {
  return { type: "PUT_METACONTENT", metacontent: metacontent };
}

function createMetacontent() {
  return { type: _constants.CREATE_METACONTENT };
}

function deleteMetacontent(metacontent) {
  return { type: _constants.DELETE_METACONTENT, metacontent: metacontent };
}

function submitKeyword(keyword) {
  return { type: _constants.SUBMIT_KEYWORD, keyword: keyword };
}

function getAllKeywords() {
  return { type: _constants.KEYWORD_ALL };
}

function deleteKeyword(keyword) {
  return { type: DELETE_KEYWORD, keyword: keyword };
}

function deleteChannel(channel) {
  return { type: "DELETE_CHANNEL", channel: channel };
}

function editMetacontent(metacontent_id) {
  return { type: _constants.EDIT_METACONTENT, metacontent_id: metacontent_id };
}

function searchFullDetailNews(query) {
  return { type: _constants.SEARCH_FULL_DETAIL_METACONTENT_NEWS, query: query };
}

function submitChannel(channel) {
  return { type: "SUBMIT_CHANNEL", channel: channel };
}

//# sourceMappingURL=index-compiled.js.map