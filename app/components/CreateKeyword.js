import React, {Component, ReactDOM} from 'react'
import {connect} from 'react-redux'
import {Panel, Button, Checkbox, FormGroup, FormControl, ControlLabel, Form, FieldGroup} from 'react-bootstrap'
import {submitKeyword, createMetacontent} from '../actions'
import AlertContainer from 'react-alert'

class CreateKeyword extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      channel: 0,
      search_term: '',
      name: '',
    }
    this.alertOptions = {
      offset: 5,
      position: 'top right',
      theme: 'light',
      time: 2000,
      transition: 'scale'
    }
    this._create_metacontent = this._create_metacontent.bind(this)
    this.showAlert = this.showAlert.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.message && nextProps.data.message.length > 0) {
        this.showAlert(nextProps.data.message)
    }
  }

  showAlert(message){
    this.msg.show(message, {
      time: 2000,
      type: 'success'
    });
  }

  componentWillMount() {
    this.props.createMetacontent()
  }

  _setState(field, event) {
    let object = {}
    object[field] = (event.target.checked) ? event.target.checked : event.target.value
    this.setState(object)
  }

  _checkBoxChange(field) {
    let object = {}
    object[field] = !this.state[field]
    this.setState(object)
  }

  _create_metacontent() {
    let self = this
    let {channels} = this.props.data
    return (
      <div className='box-body'>
        <Panel header={"Keyword"}>
          <Form>
            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>Name</ControlLabel>
              <FormControl componentClass="textarea" placeholder="Name"
                           value={self.state.name} onChange={self._setState.bind(self, 'name')}/>
            </FormGroup>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Kênh</ControlLabel>
              <FormControl componentClass="select" ref={(ref) => self.mtChannel = ref} placeholder="Kênh"
                           onChange={self._setState.bind(self, 'channel')} value={self.state.channel}>
                {(!channels)? null : channels.map(function(channel, index) {
                  return (<option key={channel.id} value={index}>{channel.name}</option>)
                })}
              </FormControl>
            </FormGroup>

            <Button bsStyle="primary" onClick={self._submit.bind(self)}>
              Submit
            </Button>
          </Form>
        </Panel>
        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
      </div>
    )
  }

  _submit() {
    let keyword = {
      name: this.state.name,
      channel: this.mtChannel.props.children[this.state.channel].key,
    }
    this.props.submitKeyword(keyword)
  }

  render() {
    return this._create_metacontent()
  }
}

CreateKeyword.propTypes = {
  data : React.PropTypes.object,
  dispatch: React.PropTypes.func,
  createMetacontent: React.PropTypes.func.isRequired,
  submitKeyword: React.PropTypes.func.isRequired,
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
  submitKeyword,
})(CreateKeyword)
