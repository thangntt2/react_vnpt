import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Table, Button, FormGroup, FormControl, ControlLabel, Glyphicon, Panel} from 'react-bootstrap'
import {getAllMetacontents, deleteMetacontent} from '../actions'
import ImageLoader from 'react-imageloader'
import {browserHistory} from 'react-router'

class Metacontents extends React.Component {
  constructor(props) {
    super(props)
    this._create_del_button = this._create_del_button.bind(this)
    // this._create_edit_button = this._create_edit_button.bind(this)
  }

  componentWillMount() {
    this.props.getAllMetacontents()
  }

  _pre_image_loader() {
    return (<div className='uil-ring-css'/>)
  }

  _create_edit_button(metacontent, i){
    let data = {
      data: {i, metacontent}
    }
    return (
      <Button {...data} bsStyle="primary" onClick={function() {
        browserHistory.push('/metacontents/'+metacontent.id)
      }}><Glyphicon glyph="pencil" />
      </Button>
    )
  }

  _create_del_button(metacontent){
    let self = this
    let data = {
      data: {metacontent}
    }
    return (
      <Button {...data} bsStyle="danger" onClick={function() {
        self.props.deleteMetacontent(metacontent)
      }}><Glyphicon glyph="minus" />
      </Button>
    )
  }

  render() {
    let {metacontents, channels} = this.props.data
    let self = this
    return (
      <Panel>
        <Button bsStyle="primary" onClick={function(){ browserHistory.push("/metacontents/create")}}>Create</Button>
        {(this.props.children)? null :
          <Table striped bordered condensed hover responsive>
            <thead>
            <tr>
              <th className="col-md-2">Name</th>
              <th className="col-md-5">Description</th>
              <th className="col-md-1">Image</th>
              <th className="col-md-1">Channel</th>
              <th className="col-md-1">Category</th>
              <th className="col-md-2">Actions</th>
            </tr>
            </thead>
            <tbody>
            {(!metacontents) ? null :
              (metacontents.map(function(metacontent, i) {
                return (
                  <tr key={metacontent.id}>
                    <td>{metacontent.name}</td>
                    <td>{!(metacontent.description)? null : metacontent.description}</td>
                    <td>
                      <ImageLoader
                        src={!(metacontent.image)? "https://d13yacurqjgara.cloudfront.net/users/771923/screenshots/2390842/gif-1.gif"
                          : (metacontent.image)}
                        wrapper={React.DOM.div}
                        preloader={self._pre_image_loader.bind(self)}>
                        {self._pre_image_loader.bind(self)}
                      </ImageLoader>
                    </td>
                    <td>
                    {
                      (!channels || !metacontent.ChannelId) ? null :
                      channels.filter(channel => channel.id === metacontent.ChannelId)[0].name
                    }
                    </td>
                    <td>{!(metacontent.category)? null : metacontent.category}</td>
                    <td>
                      {self._create_del_button(metacontent)}
                    </td>
                  </tr>
                )
              }))}
            </tbody>
          </Table>}
        {this.props.children}
      </Panel>
    )
  }
}
Metacontents.propTypes = {
  data : React.PropTypes.object,
  dispatch: React.PropTypes.func,
  getAllMetacontents: React.PropTypes.func.isRequired,
  deleteMetacontent: React.PropTypes.func.isRequired,
  children: React.PropTypes.object,
}

// // Which props do we want to inject, given the global state?
function select (state) {
  return {
    data: state,
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(select, {
  getAllMetacontents,
  deleteMetacontent,
})(Metacontents)
