import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, FormGroup, FormControl, ControlLabel, Form, FieldGroup} from 'react-bootstrap'
import {searchWikiMetacontents, searchNewsMetacontents, queryWikiMetacontents} from '../apis/Metacontents'
import Select from 'react-select'
import {submitMetacontent} from '../actions'

class Metacontent extends React.Component {
	constructor (props) {
		super(props)
    this.state = {entity_type: 'Location', search_term:"",
      entity: {
        name: '',
        description: '',
        url: '',
        image: '',
      }
		}
    this._show_metacontens = this._show_metacontens.bind(this)
		this._create_metacontent = this._create_metacontent.bind(this)
	}

	_show_metacontens() {

	}

	_search_metacontents() {
	  let name = this.refs.search_entity.value
    if (this.state.entity_type == 'Article') {
      searchNewsMetacontents(name)
        .then(function(metacontents) {

        })
    } else {
      searchWikiMetacontents(name)
        .then(function(metacontents) {

        })
    }
  }

  _handle(event) {
    this.setState({entity_type: event.target.value})
  }

  _onChange(value) {
    this.setState({
      search_term: value
    })
    queryWikiMetacontents(value.value)
      .then(value => {
        this.setState({entity: value})
      })
  }

  _getEntities(inputText) {
    return searchWikiMetacontents(inputText)
      .then(res => {
        console.log(res)
        let ret = res.map(function(entity) {
          return {value: entity, label: entity}
        })
        console.log(ret)
        return {options: ret}
      })
  }

	_create_metacontent() {
	  let self = this
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
            <FormControl componentClass="textarea" ref="name" placeholder="Name"
                         value={this.state.entity.name}/>
          </FormGroup>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Description</ControlLabel>
            <FormControl componentClass="textarea" ref="description" placeholder="Description"
                         value={this.state.entity.description}/>
          </FormGroup>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Image</ControlLabel>
            <FormControl componentClass="textarea" ref="image" placeholder="Image"
                         value={this.state.entity.image}/>
          </FormGroup>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>URL</ControlLabel>
            <FormControl componentClass="textarea" ref="url" placeholder="URL"
                         value={this.state.entity.url}/>
          </FormGroup>
          <ControlLabel>Loại</ControlLabel>
          <FormControl componentClass="select" bsStyle="primary" ref="category" placeholder="Loại"
             onChange={self._handle.bind(self)} value={self.state.entity_type}>
            <option value="Location">Địa danh</option>
            <option value="Person">Nhân vật</option>
            <option value="Organization">Tổ chức</option>
            <option value="Article">Bài viết</option>
          </FormControl>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Kênh</ControlLabel>
            <FormControl componentClass="select" placeholder="Kênh">
              <option value="VTV1">VTV1</option>
              <option value="VTV3">VTV3</option>
              <option value="VTV1 HD">VTV1 HD</option>
              <option value="VTV3 HD">VTV3 HD</option>
            </FormControl>
          </FormGroup>

          <Button type="submit" bsStyle="primary" onClick={self._submit.bind(self)}>
              Submit
            </Button>
        </Form>
			</div>
		)
	}

  _submit() {
    metacontent = {
      name: this.refs.name.value,
      description: this.refs.description.value,
      image: this.refs.image,
      url: this.refs.url,
      category: this.refs.category,
    }

    submitMetacontent(metacontent)
  }

	render() {
		return this._create_metacontent()
	}
}

Metacontent.propTypes = {
	data : React.PropTypes.object,
	dispatch: React.PropTypes.func,
}

// // Which props do we want to inject, given the global state?
function select (state) {
  return {
    data: state,
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Metacontent)
