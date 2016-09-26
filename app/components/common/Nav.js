import React, {Component} from 'react'
import {Link} from 'react-router'
import {browserHistory} from 'react-router'
import {logout, clearError} from '../../actions'
import {Navbar, Button, Nav, NavItem, NavDropdown, MenuItem, Glyphicon} from 'react-bootstrap'

class Navibar extends Component {
  constructor (props) {
    super(props)
    this._logout = this._logout.bind(this)
    this._clearError = this._clearError.bind(this)
  }

  render () {
    let navButtons = this.props.loggedIn ? (
      <Navbar.Collapse>
        <Nav pullLeft>
          <NavItem eventKey={1} onClick={() => browserHistory.push("/metacontents")}>Metacontents</NavItem>
          <NavItem eventKey={2} onClick={() => browserHistory.push("/channels")}>Channel</NavItem>
          <NavItem eventKey={3} onClick={() => browserHistory.push("/keyword")}>Keywords</NavItem>
        </Nav>
        <Nav pullRight>
          <NavDropdown eventKey={3} id="create" title={<Glyphicon glyph="plus" />}>
            <MenuItem eventKey={3.1}
                      onClick={() => browserHistory.push("/channels/create")}
              >Channel
            </MenuItem>
            <MenuItem eventKey={3.2}
                      onClick={() => browserHistory.push("/metacontents/create")}
              >Metacontent
            </MenuItem>
            <MenuItem eventKey={3.3}
                      onClick={() => browserHistory.push("/keyword/create")}
              >Keyword
            </MenuItem>
          </NavDropdown>
          <NavItem eventKey={1} onClick={this._logout.bind(this)}>Logout</NavItem>
        </Nav>
      </Navbar.Collapse>
    ) : (
      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem eventKey={1} href="/login">Login</NavItem>
        </Nav>
      </Navbar.Collapse>
    )

    return (
      <Navbar staticTop>
        <Navbar.Brand>
          <a href="#">VNPT EPG</a>
        </Navbar.Brand>
        {navButtons}
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
