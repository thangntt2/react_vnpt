import React, {Component} from 'react'
import LoadingButton from './LoadingButton'
import {Link} from 'react-router'

import {logout, clearError} from '../../actions'
import {Navbar, Button, Nav, NavItem} from 'react-bootstrap'

class Navibar extends Component {
  constructor (props) {
    super(props)
    this._logout = this._logout.bind(this)
    this._clearError = this._clearError.bind(this)
  }

  render () {
    let navButtons = this.props.loggedIn ? (
      <Nav pullRight>
        <NavItem eventKey={1} onClick={this._logout.bind(this)}>Logout</NavItem>
      </Nav>
    ) : (
      <Nav pullRight>
        <NavItem eventKey={1} href="/login">Login</NavItem>
      </Nav>
    )

    return (
      <Navbar staticTop>
        <Navbar.Brand>
          <a href="#">VNPT EPG</a>
        </Navbar.Brand>
        <Navbar.Collapse>
          {navButtons}
        </Navbar.Collapse>
      </Navbar>
    )
  }

  _logout () {
    this.props.dispatch(logout())
  }

  _clearError () {
    this.props.dispatch(clearError())
  }
}

Navibar.propTypes = {
  loggedIn: React.PropTypes.bool,
  currentlySending: React.PropTypes.bool,
  dispatch: React.PropTypes.func
}

export default Navibar
