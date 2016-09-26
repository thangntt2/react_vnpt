import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Table, Button, FormGroup, FormControl, ControlLabel, Glyphicon, Panel} from 'react-bootstrap'
import {getAllKeywords, deleteKeyword} from '../actions'

class Keywords extends React.Component {
  constructor(props) {
    super(props)
    this._create_del_button = this._create_del_button.bind(this)
    this._create_edit_button = this._create_edit_button.bind(this)
  }

  componentWillMount() {
    this.props.getAllKeywords()
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
        self.props.deleteKeyword(metacontent)
      }}><Glyphicon glyph="minus" />
      </Button>
    )
  }

  render() {
    let {keywords, channels} = this.props.data
    let self = this
    return (
      <Panel>
        <Button bsStyle="primary" href="/keyword/create">Create</Button>
        {(this.props.children)? null :
          <Table striped bordered condensed hover responsive>
            <thead>
            <tr>
              <th>Created At</th>
              <th>Keyword</th>
              <th>Channel</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {(!keywords) ? null :
              (keywords.map(function(keyword, i) {
                return (
                  <tr key={keyword.id}>
                    <td>{!(keyword.createdAt)? null : keyword.createdAt}</td>
                    <td>{!(keyword.keyword)? null : keyword.keyword}</td>
                    <td>{(channels) ? channels.filter(channel => channel.id === keyword.ChannelId)[0].name : null}</td>
                    <td>
                      {self._create_edit_button(keyword, i)}
                      {self._create_del_button(keyword)}
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
Keywords.propTypes = {
  data : React.PropTypes.object,
  dispatch: React.PropTypes.func,
  getAllKeywords: React.PropTypes.func.isRequired,
  deleteKeyword: React.PropTypes.func.isRequired,
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
  getAllKeywords,
  deleteKeyword,
})(Keywords)
