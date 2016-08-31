import React, {Component, ReactDOM} from 'react'
import {connect} from 'react-redux'
import {Button, FormGroup, FormControl, ControlLabel, Form, FieldGroup} from 'react-bootstrap'
import {searchWikiMetacontents, searchNewsMetacontents, queryWikiMetacontents} from '../apis/Metacontents'
import Select from 'react-select'
import {submitMetacontent, createMetacontent} from '../actions'

class CreateMetacontent extends React.Component {
	constructor (props) {
		super(props)
    this.state = {search_term:"",
        url: '',
        image: '',
        category: 'Location',
        channel: '0',
		}
		this._create_metacontent = this._create_metacontent.bind(this)
	}

  componentWillMount() {
    this.props.createMetacontent()
  }

  componentWillReceiveProps() {
    console.log(this.props.data)
    this.setState({
      name: this.props.data.name,
      description: this.props.data.description,
    })
  }

  _onChange(value) {
    this.setState({
      search_term: value
    })
    queryWikiMetacontents(value.value)
      .then(value => {
        this.setState({
          name : value.name,
          description: value.description,
          url : value.url,
          image: value.image,
        })
      })
  }

  _getEntities(inputText) {
    return searchWikiMetacontents(inputText)
      .then(res => {
        let ret = res.map(function(entity) {
          return {value: entity, label: entity}
        })
        return {options: ret}
      })
  }

  _setState(field, event) {
    var object = {}
    if (field === 'channel') {
      object[field] = event.target.value
    } else
      object[field] = event.target.value
    this.setState(object)
  }

	_create_metacontent() {
	  let self = this
    let {channels} = this.props.data
		return (
			<div className='box-body'>
        <Select.Async
          value={self.state.search_term}
          ref="live_search_input"
          onChange={self._onChange.bind(self)}
          loadOptions={self._getEntities.bind(self)}
          minimumInput={3}
          valueKey="value" labelKey="label"
          backspaceRemoves={false}
          ignoreAccents={false}
        />
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
            <option value="Location">Địa danh</option>
            <option value="Person">Nhân vật</option>
            <option value="Organization">Tổ chức</option>
            <option value="Article">Bài viết</option>
          </FormControl>
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
			</div>
		)
	}

  _submit() {
    let metacontent = {
      name: this.state.name,
      description: this.state.description,
      url: this.state.url,
      image: this.state.image,
      channel: this.mtChannel.props.children[this.state.channel].key,
      category: this.state.category,
    }
    this.props.submitMetacontent(metacontent)
  }

	render() {
		return this._create_metacontent()
	}
}

CreateMetacontent.propTypes = {
	data : React.PropTypes.object,
	dispatch: React.PropTypes.func,
  createMetacontent: React.PropTypes.func.isRequired,
  submitMetacontent: React.PropTypes.func.isRequired,
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
  submitMetacontent,
})(CreateMetacontent)
