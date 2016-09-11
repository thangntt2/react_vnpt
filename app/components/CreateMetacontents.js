import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Panel, Radio, Button, Checkbox, FormGroup, FormControl, ControlLabel, Form, FieldGroup} from 'react-bootstrap'
import {searchWikiMetacontents, searchNewsMetacontents, queryWikiMetacontents} from '../apis/Metacontents'
import Select from 'react-select'
import {submitMetacontent, createMetacontent, editMetacontent} from '../actions'
import {queryNewsMetacontents} from "../apis/Metacontents";
var ReactDOM = require('react-dom')
import hotkey from 'react-hotkey';
hotkey.activate();

class CreateMetacontent extends React.Component {
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
      instant_submit: true
    }
		this._create_metacontent = this._create_metacontent.bind(this)
    this.hotkeyHandler = this.handleHotkey.bind(this)
    this.handleOptionChange = this.handleOptionChange.bind(this)
	}

	handleHotkey(e) {
	  if ((e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4') && e.ctrlKey) {
	    switch (e.key) {
        case '1':
          this.setState({category : 'location'})
          break;
        case '2':
          this.setState({category : 'person'})
          break;
        case '3':
          this.setState({category : 'organization'})
          break;
        case '4':
          this.setState({category : 'article'})
          break;
        default:
          return;
      }
    }
  }

  componentDidMount() {
    hotkey.addHandler(this.hotkeyHandler)
  }

  componentWillUnmount() {
    hotkey.removeHandler(this.hotkeyHandler)
  }

  componentWillMount() {
    this.props.createMetacontent()
  }

  _onChange(value) {
    this.setState({
      search_term: value
    })
    let self = this
    if (this.state.category != 'article') {
      queryWikiMetacontents(value.value)
        .then(value => {
          this.setState({
            name: value.name,
            description: value.description,
            url: value.url,
            image: value.image,
          })
          if (self.state.instant_submit) {
            self._submit()
          } else {
            ReactDOM.findDOMNode(self.submit_button).focus()
          }
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
          if (self.state.instant_submit) {
            self._submit.bind()
          } else {
            ReactDOM.findDOMNode(self.submit_button).focus()
          }
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
    let search_fun = (this.state.category != 'article') ? searchWikiMetacontents(inputText)
                                                        : searchNewsMetacontents(inputText, sites)

    self.setState({search_fun: search_fun})
    self.setState({last_search_us: Date.now()})
    return new Promise(function(resolve, reject) {
      search_fun.end(function(err, res){
        if (err)
          reject(err)
        let ret = res.body.map(function(entity) {
          return (self.state.category == 'article') ? {value: entity.link, label: entity.title}
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

  handleOptionChange(event) {
    this.setState({category : event.target.value.toString()})
  }

	_create_metacontent() {
	  let self = this
    let {channels} = this.props.data
		return (
			<div className='box-body'>
        <Panel header={"Tìm kiếm"}>
          <ControlLabel>Loại (1: Địa danh, 2: Nhân vật, 3: Tổ chức, 4: Bài viết</ControlLabel>
          <FormGroup>
            <Radio name="category" value="location"
                   checked={'location' === self.state.category}
                   onChange={self.handleOptionChange}>Địa danh</Radio>
            <Radio name="category" value="person"
                   checked={'person' === self.state.category}
                   onChange={self.handleOptionChange}>Nhân vật</Radio>
            <Radio name="category" value="organization"
                   checked={"organization" === self.state.category}
                   onChange={self.handleOptionChange}>Tổ chức</Radio>
            <Radio name="category" value="article"
                   checked={"article" === self.state.category}
                   onChange={self.handleOptionChange}>Bài viết</Radio>
          </FormGroup>

          <Checkbox checked={self.state.instant_submit} onChange={function() {
            self.setState({instant_submit: !self.state.instant_submit})
          }}>Đăng ngay khi chọn</Checkbox>

          {(self.state.category !== 'article')? null :
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
            onChange={self._onChange.bind(self)}
            loadOptions={self._getEntities.bind(self)}
            minimumInput={3}
            valueKey="value" labelKey="label"
            backspaceRemoves={false}
            ignoreAccents={false}
            cache={false}
            tabIndex={'1'}
            autofocus={true}
          />
        </Panel>

        <Panel header={"Nhập thủ công"}>
          <Form>
            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>Tên</ControlLabel>
              <FormControl componentClass="textarea" ref={(ref) => self.mtName = ref} placeholder="Name"
                           value={self.state.name} onChange={self._setState.bind(self, 'name')}/>
            </FormGroup>
            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>Mô tả</ControlLabel>
              <FormControl componentClass="textarea" ref={(ref) => self.mtDescription = ref} placeholder="Description"
                           value={self.state.description} onChange={self._setState.bind(self, 'description')}/>
            </FormGroup>
            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>Ảnh</ControlLabel>
              <FormControl componentClass="textarea" ref={(ref) => self.mtImage = ref} placeholder="Image"
                           value={self.state.image} onChange={self._setState.bind(self, 'image')}/>
            </FormGroup>
            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>Đường dẫn</ControlLabel>
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
                  return (<option key={channel.id} value={index}>{channel.name}</option>)
                })}
              </FormControl>
            </FormGroup>

            <Button bsStyle="primary" ref={(ref) => self.submit_button = ref} onClick={self._submit.bind(self)} tabIndex="1">
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
  submitMetacontent,
  editMetacontent,
})(CreateMetacontent)
