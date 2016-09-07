'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

require('babel-polyfill');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = require('react-router');

var _redux = require('redux');

var _reduxSaga = require('redux-saga');

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

var _reactRedux = require('react-redux');

var _reduxLogger = require('redux-logger');

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _sagas = require('./sagas');

var _sagas2 = _interopRequireDefault(_sagas);

var _actions = require('./actions');

require('./styles/main.css');

var _App = require('./components/App');

var _App2 = _interopRequireDefault(_App);

var _Home = require('./components/Home');

var _Home2 = _interopRequireDefault(_Home);

var _Login = require('./components/Login');

var _Login2 = _interopRequireDefault(_Login);

var _Dashboard = require('./components/Dashboard');

var _Dashboard2 = _interopRequireDefault(_Dashboard);

var _NotFound = require('./components/NotFound');

var _NotFound2 = _interopRequireDefault(_NotFound);

var _Channels = require('./components/Channels');

var _Channels2 = _interopRequireDefault(_Channels);

var _CreateMetacontents = require('./components/CreateMetacontents');

var _CreateMetacontents2 = _interopRequireDefault(_CreateMetacontents);

var _Metacontents = require('./components/Metacontents');

var _Metacontents2 = _interopRequireDefault(_Metacontents);

var _CreateKeyword = require('./components/CreateKeyword');

var _CreateKeyword2 = _interopRequireDefault(_CreateKeyword);

var _Keywords = require('./components/Keywords');

var _Keywords2 = _interopRequireDefault(_Keywords);

var _EditMetacontent = require('./components/EditMetacontent');

var _EditMetacontent2 = _interopRequireDefault(_EditMetacontent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = (0, _reduxLogger2.default)({
  // Ignore `CHANGE_FORM` actions in the logger, since they fire after every keystroke
  predicate: function predicate(getState, action) {
    return action.type !== 'CHANGE_FORM';
  }
});

var sagaMiddleware = (0, _reduxSaga2.default)();

// Creates the Redux store using our reducer and the logger and saga middlewares
var store = (0, _redux.createStore)(_reducers2.default, (0, _redux.applyMiddleware)(logger, sagaMiddleware));
// We run the root saga automatically
sagaMiddleware.run(_sagas2.default);

/**
* Checks authentication status on route change
* @param  {object}   nextState The state we want to change into when we change routes
* @param  {function} replace Function provided by React Router to replace the location
*/
function checkAuth(nextState, replace) {
  var _store$getState = store.getState();

  var loggedIn = _store$getState.loggedIn;


  store.dispatch((0, _actions.clearError)());

  // Check if the path isn't dashboard. That way we can apply specific logic to
  // display/render the path we want to
  console.log(nextState.location.pathname);
  if (nextState.location.pathname === '/login') {
    if (loggedIn) {
      if (nextState.location.state && nextState.location.pathname) {
        replace(nextState.location.pathname);
      } else {
        replace('/');
      }
    }
  } else {
    // If the user is already logged out, forward them to the homepage
    if (!loggedIn) {
      if (nextState.location.state && nextState.location.pathname) {
        replace(nextState.location.pathname);
      } else {
        replace('/');
      }
    }
  }
}

// Mostly boilerplate, except for the routes. These are the pages you can go to,
// which are all wrapped in the App component, which contains the navigation etc

var LoginFlow = function (_Component) {
  (0, _inherits3.default)(LoginFlow, _Component);

  function LoginFlow() {
    (0, _classCallCheck3.default)(this, LoginFlow);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(LoginFlow).apply(this, arguments));
  }

  (0, _createClass3.default)(LoginFlow, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(
          _reactRouter.Router,
          { history: _reactRouter.browserHistory },
          _react2.default.createElement(
            _reactRouter.Route,
            { component: _App2.default },
            _react2.default.createElement(_reactRouter.Route, { path: '/', component: _Home2.default }),
            _react2.default.createElement(_reactRouter.Route, { path: 'login', component: _Login2.default }),
            _react2.default.createElement(
              _reactRouter.Route,
              { onEnter: checkAuth },
              _react2.default.createElement(_reactRouter.Route, { path: 'dashboard', component: _Dashboard2.default }),
              _react2.default.createElement(_reactRouter.Route, { path: 'channels', component: _Channels2.default }),
              _react2.default.createElement(_reactRouter.Route, { path: 'metacontents', component: _Metacontents2.default }),
              _react2.default.createElement(_reactRouter.Route, { path: '/metacontents/create', component: _CreateMetacontents2.default }),
              _react2.default.createElement(_reactRouter.Route, { path: '/metacontents/:metacontent_id', component: _EditMetacontent2.default }),
              _react2.default.createElement(_reactRouter.Route, { path: 'keyword/create', component: _CreateKeyword2.default }),
              _react2.default.createElement(_reactRouter.Route, { path: 'keyword', component: _Keywords2.default })
            ),
            _react2.default.createElement(_reactRouter.Route, { path: '*', component: _NotFound2.default })
          )
        )
      );
    }
  }]);
  return LoginFlow;
}(_react.Component);

_reactDom2.default.render(_react2.default.createElement(LoginFlow, null), document.getElementById('app'));

//# sourceMappingURL=index-compiled.js.map