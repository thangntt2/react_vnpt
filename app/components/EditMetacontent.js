import React, {Component, ReactDOM} from 'react'
import {connect} from 'react-redux'
import {Panel, Button, Checkbox, FormGroup, FormControl, ControlLabel, Form, FieldGroup} from 'react-bootstrap'
import {putMetacontent, createMetacontent, editMetacontent} from '../actions'

class EditMetacontent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {search_term:"",
      name: '',
      description: '',
      url: '',
      image: '',
      channel: 0,
      category: 'location',
      last_search_us: Date.now(),
      live_search_typing: false,
      vne: true,
      dtri: false,
      vnn: true,
      thn: true,
    }
    this._edit_metacontent = this._edit_metacontent.bind(this)
  }

  componentWillMount() {
    this.props.editMetacontent(this.props.params.metacontent_id)
  }

  componentWillReceiveProps(nextProps) {
    let {metacontent} = nextProps.data
    if (metacontent) {
      this.setState({
        name: metacontent.name,
        description: metacontent.description,
        url: metacontent.url,
        image: metacontent.image,
        channel: metacontent.ChannelId,
        category: metacontent.category,
        search_term: "",
      })
    }
  }

  _setState(field, event) {
    let object = {}
    object[field] = (event.target.checked) ? event.target.checked : event.target.value
    this.setState(object)
  }

  _edit_metacontent() {
    let self = this
    let {channels} = this.props.data
    return (
        <Panel header={"Form"}>
          <Form>
            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>Name</ControlLabel>
              <FormControl componentClass="textarea" ref={(ref) => self.mtName = ref} placeholder="Name"
                           value={self.state.name} onChange={self._setState.bind(self, 'name')}/>
            </FormGroup>
            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>Description</ControlLabel>
              <FormControl componentClass="textarea" ref={(ref) => self.mtDescription = ref} placeholder="Description"
                           value={self.state.description} onChange={self._setState.bind(self, 'description')}/>
            </FormGroup>
            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>Image</ControlLabel>
              <FormControl componentClass="textarea" ref={(ref) => self.mtImage = ref} placeholder="Image"
                           value={self.state.image} onChange={self._setState.bind(self, 'image')}/>
            </FormGroup>
            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>URL</ControlLabel>
              <FormControl componentClass="textarea" ref={(ref) => self.mtUrl = ref} placeholder="URL"
                           value={self.state.url} onChange={self._setState.bind(self, 'url')}/>
            </FormGroup>
            <ControlLabel>Loại</ControlLabel>
            <FormControl componentClass="select" bsStyle="primary" ref={(ref) => self.mtCate = ref} placeholder="Loại"
                         onChange={self._setState.bind(self, 'category')} value={self.state.category} >
              <option value="location">Địa danh</option>
              <option value="person">Nhân vật</option>
              <option value="organization">Tổ chức</option>
              <option value="article">Bài viết</option>
            </FormControl>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Kênh</ControlLabel>
              <FormControl componentClass="select" ref={(ref) => self.mtChannel = ref} placeholder="Kênh"
                           onChange={self._setState.bind(self, 'channel')} value={self.state.channel}>
                {(!channels)? null : channels.map(function(channel, index) {
                  return (<option key={channel.id} value={channel.id}>{channel.name}</option>)
                })}
              </FormControl>
            </FormGroup>

            <Button bsStyle="primary" onClick={self._submit.bind(self)}>
              Submit
            </Button>
          </Form>
        </Panel>
    )
  }

  _submit() {
    let metacontent = {
      id: this.props.data.metacontent.id,
      name: this.state.name,
      description: this.state.description,
      url: this.state.url,
      image: this.state.image,
      channel_id: this.mtChannel.props.children.filter(channel_option => {
        return channel_option.key == this.state.channel
      })[0].key,
      category: this.state.category,
    }
    this.props.putMetacontent(metacontent)
  }

  render() {
    return this._edit_metacontent()
  }
}

EditMetacontent.propTypes = {
  data : React.PropTypes.object,
  dispatch: React.PropTypes.func,
  createMetacontent: React.PropTypes.func.isRequired,
  putMetacontent: React.PropTypes.func.isRequired,
  editMetacontent: React.PropTypes.func.isRequired,
}

// // Which props do we want to inject, given the global state?
function select (state) {
  return {
    data: state,
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(select, {
  createMetacontent,
  putMetacontent,
  editMetacontent,
})(EditMetacontent)
