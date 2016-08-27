import React, {Component} from 'react'
import LoadingButton from './LoadingButton'
import {Link} from 'react-router'

import {logout, clearError} from '../../actions'
import {Button} from 'react-bootstrap'

class Nav extends Component {
  constructor (props) {
    super(props)
    this._logout = this._logout.bind(this)
    this._clearError = this._clearError.bind(this)
  }

  render () {
    let navButtons = this.props.loggedIn ? (
      <div>
        <Button href='/dashboard'>Dashboard</Button>
        <Button
          disabled={this.props.currentlySending}
          onClick={!this.props.currentlySending ? this._logout: null}>
          {this.props.currentlySending ? 'Loading...' : 'Logout'}
        </Button>
      </div>
    ) : (
      <div>
        <Button bsStyle="primary" href='/login' onClick={this._clearError}>Login</Button>
      </div>
    )

    return (
      <div className='nav'>
        <Link to='/' className='nav__logo-wrapper' onClick={this._clearError}>
          <h1 className='nav__logo'>VNPT&nbsp;EPG</h1>
        </Link>
        {navButtons}
      </div>
    )
  }

  _logout () {
    this.props.dispatch(logout())
  }

  _clearError () {
    this.props.dispatch(clearError())
  }
}

Nav.propTypes = {
  loggedIn: React.PropTypes.bool,
  currentlySending: React.PropTypes.bool,
  dispatch: React.PropTypes.func
}

export default Nav
