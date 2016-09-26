import React, {Component} from 'react'
import {Row, Col, Image, ImageLoader, Table, ListGroup, ListGroupItem, Panel, Radio, Button, Checkbox, FormGroup, FormControl, ControlLabel, Form, FieldGroup} from 'react-bootstrap'
import {connect} from 'react-redux'
import {submitChannel} from '../actions'
import AlertContainer from 'react-alert'


class CreateChannel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      icon: '',
      channel: '',
    }
    this.alertOptions = {
      offset: 5,
      position: 'top right',
      theme: 'light',
      time: 2000,
      transition: 'scale'
    }
  }

  _setState(field, event) {
    let object = {}
    object[field] = (event.target.checked) ? event.target.checked : event.target.value
    this.setState(object)
  }

  _submit() {
    let channel = {
      icon: this.state.icon,
      name: this.state.name,
      channel: this.state.channel,
    }
    this.props.submitChannel(channel)
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
  render() {
    let self = this
    return(
      <Panel>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Tên</ControlLabel>
          <FormControl type="text" placeholder="Tên của kênh"
                       onChange={self._setState.bind(self, 'name')} value={self.state.name}/>
        </FormGroup>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Số kênh</ControlLabel>
          <FormControl type="text" placeholder="Số của kênh"
                       onChange={self._setState.bind(self, 'channel')} value={self.state.channel}/>
        </FormGroup>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Biểu tượng kênh</ControlLabel>
          <FormControl type="text" placeholder="Biểu tượng của kênh"
                       onChange={self._setState.bind(self, 'icon')} value={self.state.icon}/>
        </FormGroup>
          <Button bsStyle="primary" onClick={self._submit.bind(self)}>
            Submit
          </Button>
        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
      </Panel>
    )
  }
}

// // Which props do we want to inject, given the global state?
function select (state) {
  return {
    data: state,
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(select, {
  submitChannel
})(CreateChannel)
