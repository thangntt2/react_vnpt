import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Table, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap'
import {getAllMetacontents, deleteMetacontent} from '../actions'
import ImageLoader from 'react-imageloader'

class Metacontents extends React.Component {
  constructor(props) {
    super(props)
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

      }}>Edit
      </Button>
    )
  }

  _create_del_button(metacontent, i){
    let self = this
    let data = {
      data: {i, metacontent}
    }
    return (
      <Button {...data} bsStyle="danger" onClick={function() {
        self.props.deleteMetacontent(metacontent, i)
      }}>Delete
      </Button>
    )
  }

  render() {
    let {metacontents} = this.props.data
    let self = this
    return (
      <div className="box-body">
        <Button bsStyle="primary" href="/metacontents/create">Create</Button>
        {(this.props.children)? null :
          <Table striped bordered condensed hover>
            <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Image</th>
              <th>URL</th>
              <th>Category</th>
              <th>Actions</th>
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
                    <td>{!(metacontent.url)? null : metacontent.url}</td>
                    <td>{!(metacontent.category)? null : metacontent.category}</td>
                    <td>
                      {self._create_edit_button(metacontent, i)}
                      {self._create_del_button(metacontent, i)}
                    </td>
                  </tr>
                )
              }))}
            </tbody>
          </Table>}
        {this.props.children}
      </div>
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
