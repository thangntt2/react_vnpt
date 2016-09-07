import 'babel-polyfill'

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, browserHistory, IndexRoute} from 'react-router'
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {Provider} from 'react-redux'
import createLogger from 'redux-logger'
import reducer from './reducers'
import rootSaga from './sagas'
import {clearError} from './actions'

import './styles/main.css'

import App from './components/App'
import Home from './components/Home'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import NotFound from './components/NotFound'
import Channels from './components/Channels'
import CreateMetacontent from './components/CreateMetacontents'
import MetaContents from './components/Metacontents'
import CreateKeyword from "./components/CreateKeyword";
import Keywords from "./components/Keywords";
import EditMetacontent from './components/EditMetacontent'

let logger = createLogger({
  // Ignore `CHANGE_FORM` actions in the logger, since they fire after every keystroke
  predicate: (getState, action) => action.type !== 'CHANGE_FORM'
})

let sagaMiddleware = createSagaMiddleware()

// Creates the Redux store using our reducer and the logger and saga middlewares
let store = createStore(reducer, applyMiddleware(logger, sagaMiddleware))
// We run the root saga automatically
sagaMiddleware.run(rootSaga)

/**
* Checks authentication status on route change
* @param  {object}   nextState The state we want to change into when we change routes
* @param  {function} replace Function provided by React Router to replace the location
*/
function checkAuth (nextState, replace) {
  let {loggedIn} = store.getState()

  store.dispatch(clearError())

  // Check if the path isn't dashboard. That way we can apply specific logic to
  // display/render the path we want to
  console.log(nextState.location.pathname)
  if (nextState.location.pathname === '/login') {
    if (loggedIn) {
      if (nextState.location.state && nextState.location.pathname) {
        replace(nextState.location.pathname)
      } else {
        replace('/')
      }
    }
  } else {
    // If the user is already logged out, forward them to the homepage
    if (!loggedIn) {
      if (nextState.location.state && nextState.location.pathname) {
        replace(nextState.location.pathname)
      } else {
        replace('/')
      }
    }
  }
}

// Mostly boilerplate, except for the routes. These are the pages you can go to,
// which are all wrapped in the App component, which contains the navigation etc
class LoginFlow extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route component={App}>
            <Route path='/' component={Home} />
            <Route path='login' component={Login} />
            <Route onEnter={checkAuth}>
              <Route path="dashboard"  component={Dashboard} />
              <Route path='channels' component={Channels}/>
              <Route path='metacontents' component={MetaContents}/>
              <Route path='/metacontents/create' component={CreateMetacontent}/>
              <Route path="/metacontents/:metacontent_id" component={EditMetacontent}/>
              <Route path='keyword/create' component={CreateKeyword}/>
              <Route path='keyword' component={Keywords}/>
            </Route>
            <Route path='*' component={NotFound} />
          </Route>
        </Router>
      </Provider>
    )
  }
}

ReactDOM.render(<LoginFlow />, document.getElementById('app'))
