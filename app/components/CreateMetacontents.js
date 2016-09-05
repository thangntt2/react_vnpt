import React, {Component, ReactDOM} from 'react'
import {connect} from 'react-redux'
import {Panel, Button, Checkbox, FormGroup, FormControl, ControlLabel, Form, FieldGroup} from 'react-bootstrap'
import {searchWikiMetacontents, searchNewsMetacontents, queryWikiMetacontents} from '../apis/Metacontents'
import Select from 'react-select'
import {submitMetacontent, createMetacontent} from '../actions'
import {queryNewsMetacontents} from "../apis/Metacontents";

class CreateMetacontent extends React.Component {
	constructor (props) {
		super(props)
    this.state ={search_term:"",
      name: '',
      description: '',
      url: '',
      image: '',
      channel: 0,
      category: 'Location',
      last_search_us: Date.now(),
      live_search_typing: false,
      vne: true,
      dtri: false,
      vnn: true,
      thn: true,
    }
		this._create_metacontent = this._create_metacontent.bind(this)
	}

  componentWillMount() {
    this.props.createMetacontent()
  }

  componentWillReceiveProps() {
    if (this.props.data.metacontent)
      this.setState({
        name: this.props.data.metacontent.name,
        description: this.props.data.metacontent.description,
        url: this.props.data.metacontent.url,
        image: this.props.data.metacontent.image,
        channel: this.props.data.metacontent.channel,
        category: this.props.data.metacontent.category,
        search_term: "",
      })
  }

  _onChange(value) {
    this.setState({
      search_term: value
    })
    if (this.state.category != 'Article') {
      queryWikiMetacontents(value.value)
        .then(value => {
          this.setState({
            name: value.name,
            description: value.description,
            url: value.url,
            image: value.image,
          })
        })
    } else {
      queryNewsMetacontents(value.value)
        .then(res => {
          this.setState({
            name: res.body.title,
            description: res.body.desc,
            url: value.value,
            image: res.body.image,
          })
        })
    }
  }

  _getEntities(inputText) {
    let self = this

    if (Date.now() - this.state.last_search_us < 500) {
      this.state.search_fun.abort()
    }

    //get sites
    let sites = []
    if (self.state.vne) sites.push('vnexpress')
    if (self.state.vnn) sites.push('vietnamnet')
    if (self.state.dtri) sites.push('dantri')
    if (self.state.thn) sites.push('thanhnien')
    //end
    let search_fun = (this.state.category != 'Article') ? searchWikiMetacontents(inputText)
                                                        : searchNewsMetacontents(inputText, sites)

    self.setState({search_fun: search_fun})
    self.setState({last_search_us: Date.now()})
    return new Promise(function(resolve, reject) {
      search_fun.end(function(err, res){
        if (err)
          reject(err)
        let ret = res.body.map(function(entity) {
          return (self.state.category == 'Article') ? {value: entity.link, label: entity.title}
                                                    : {value: entity, label: entity}
        })
        resolve({options: ret})
      })
    })
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
        <Panel header={"Wikipedia search"}>
          <ControlLabel>Loại</ControlLabel>
          <FormControl componentClass="select" bsStyle="primary" ref={(ref) => self.mtCate = ref} placeholder="Loại"
                       onChange={self._setState.bind(self, 'category')} value={self.state.category} >
            <option value="Location">Địa danh</option>
            <option value="Person">Nhân vật</option>
            <option value="Organization">Tổ chức</option>
            <option value="Article">Bài viết</option>
          </FormControl>
          {(self.state.category !== 'Article')? null :
            <FormGroup>
              <Checkbox inline checked={self.state.vne} onChange={self._checkBoxChange.bind(self, 'vne')}>
                VnExpress
              </Checkbox>
              {' '}
              <Checkbox inline checked={self.state.dtri} onChange={self._checkBoxChange.bind(self, 'dtri')}>
                Dantri
              </Checkbox>
              {' '}
              <Checkbox inline checked={self.state.vnn} onChange={self._checkBoxChange.bind(self, 'vnn')}>
                Vietnamnet
              </Checkbox>
              <Checkbox inline checked={self.state.thn} onChange={self._checkBoxChange.bind(self, 'thn')}>
                Thannien
              </Checkbox>
            </FormGroup>
          }
          {' '}
          <ControlLabel>Tìm kiếm</ControlLabel>
          <Select.Async
            value={self.state.search_term}
            ref="live_search_input"
            onChange={self._onChange.bind(self)}
            loadOptions={self._getEntities.bind(self)}
            minimumInput={3}
            valueKey="value" labelKey="label"
            backspaceRemoves={false}
            ignoreAccents={false}
            cache={false}
          />
        </Panel>

        {/*<Panel header={"News search"}>*/}
          {/*<FormGroup controlId="formControlsTextarea">*/}
            {/*<ControlLabel>Name</ControlLabel>*/}
            {/*<FormControl componentClass="textarea" ref={(ref) => self.mtName = ref} placeholder="Name"*/}
                         {/*value={self.state.name} onChange={self._setState.bind(self, 'name')}/>*/}
          {/*</FormGroup>*/}

          {/*<Button bsStyle="primary" onClick={self._submit.bind(self)}>*/}
            {/*Search*/}
          {/*</Button>*/}
        {/*</Panel>*/}

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
        </Panel>
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
