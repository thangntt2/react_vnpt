import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Row, Col, Image, ImageLoader, Table, ListGroup, ListGroupItem, Panel, Radio, Button, Checkbox, FormGroup, FormControl, ControlLabel, Form, FieldGroup} from 'react-bootstrap'
import {searchWikiMetacontents, searchNewsMetacontents, queryWikiMetacontents} from '../apis/Metacontents'
import {submitMetacontent, createMetacontent, editMetacontent} from '../actions'
import {queryNewsMetacontents} from "../apis/Metacontents";
import update from 'react-addons-update';
var ReactDOM = require('react-dom')
import hotkey from 'react-hotkey';
var Loading = require('react-loading')
import AlertContainer from 'react-alert'
hotkey.activate();

class CreateMetacontent2 extends React.Component {
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
      dtri: true,
      vnn: true,
      thn: true,
      searching: false,
    }
    this.alertOptions = {
      offset: 5,
      position: 'top right',
      theme: 'light',
      time: 2000,
      transition: 'scale'
    }
    this._create_metacontent = this._create_metacontent.bind(this)
    this.hotkeyHandler = this.handleHotkey.bind(this)
    this.handleOptionChange = this.handleOptionChange.bind(this)
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
          ReactDOM.findDOMNode(self.submit_button).focus()
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
          ReactDOM.findDOMNode(self.submit_button).focus()
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
    if (self.state.vne) sites.push('vnexpress.net')
    if (self.state.vnn) sites.push('vietnamnet.vn')
    if (self.state.dtri) sites.push('dantri.com.vn')
    if (self.state.thn) sites.push('thanhnien.vn')
    //end
    return (this.state.category != 'article') ? searchWikiMetacontents(inputText)
        : searchNewsMetacontents(inputText, sites, false)
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
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Kênh</ControlLabel>
            <FormControl componentClass="select" ref={(ref) => self.mtChannel = ref} placeholder="Kênh"
                         onChange={self._setState.bind(self, 'channel')} value={self.state.channel}>
              {(!channels)? null : channels.map(function(channel, index) {
                return (<option key={channel.id} value={index}>{channel.name}</option>)
              })}
            </FormControl>
          </FormGroup>
          <ControlLabel>Loại</ControlLabel>
          <FormGroup>
            <Radio name="category" value="location" inline
                   checked={'location' === self.state.category}
                   onChange={self.handleOptionChange}>Địa danh</Radio>
            <Radio name="category" value="person" inline
                   checked={'person' === self.state.category}
                   onChange={self.handleOptionChange}>Nhân vật</Radio>
            <Radio name="category" value="organization" inline
                   checked={"organization" === self.state.category}
                   onChange={self.handleOptionChange}>Tổ chức</Radio>
            <Radio name="category" value="article" inline
                   checked={"article" === self.state.category}
                   onChange={self.handleOptionChange}>Bài viết</Radio>
          </FormGroup>

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
              {/*<Checkbox inline checked={self.state.vnn} onChange={self._checkBoxChange.bind(self, 'vnn')}>*/}
                {/*Vietnamnet*/}
              {/*</Checkbox>*/}
              {/*<Checkbox inline checked={self.state.thn} onChange={self._checkBoxChange.bind(self, 'thn')}>*/}
                {/*Thannien*/}
              {/*</Checkbox>*/}
            </FormGroup>
          }
          {' '}
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Tìm kiếm</ControlLabel>
            <FormControl type="text"
                         placeholder="Nhập để tìm kiếm"
                         value={this.state.search_term}
                         onChange={self._setState.bind(self, 'search_term')}
                         onKeyPress={(e) => {
                           if (e.key === 'Enter') {
                             self._search_metacontents()
                           }
                         }}
                         autoFocus
            />
          </FormGroup>
          <Button bsStyle="primary" ref={(ref) => self.submit_button = ref}
                  onClick={self._search_metacontents.bind(self)}
                  tabIndex="1"
                  disabled={self.state.searching}
          >
            {(self.state.searching) ? "Tìm kiếm..." : "Tìm kiếm"}
          </Button>
        </Panel>

        {(!self.state.searchResults) ? null :
          <Panel>
            <ListGroup>
              {self.state.searchResults.map(metacontent => {
                return (metacontent.loading)
                  ? (
                    <Loading key={metacontent.url} type="bars" color="#e3e3e3"/>)
                  : (
                  <ListGroupItem
                    key={metacontent.url}
                    onClick={self._submit.bind(self, metacontent)}
                  >
                    <Row className="show-grid">
                      <Col md={1}>
                        <Image
                          src={!(metacontent.image) || (metacontent.image.length == 0) ? "https://d13yacurqjgara.cloudfront.net/users/771923/screenshots/2390842/gif-1.gif"
                            : (metacontent.image)}/>
                      </Col>
                      <Col md={11}>
                        <b>
                          {metacontent.name}
                        </b>
                        <br/>
                        {metacontent.description}
                      </Col>
                    </Row>
                  </ListGroupItem>
                )
              })}
            </ListGroup>
          </Panel>
        }
        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
      </div>
    )
  }

  _submit(metacontent) {
    metacontent.channel = this.mtChannel.props.children[this.state.channel].key
    metacontent.category = this.state.category
    this.props.submitMetacontent(metacontent)
  }

  _search_metacontents() {
    this.setState({searching: true})
    this._getEntities(this.state.search_term)
      .then(articles => {
        let results = []
        if (this.state.category != 'article') {
          results = articles[1].map((article, index) => {
            queryWikiMetacontents(article)
              .then(value => {
                this.setState({
                  searchResults: update(this.state.searchResults, { [index]: { $set: {
                    ...article,
                    ...value,
                    loading: false,
                  }}})
                })
              })
            return article
          })
          this.setState({searchResults : results.map(result => ({
            ...result,
            loading: true,
          }))})
        } else {
          results = articles.body.map((article) => {
            let result = {}
            result.name = article.fields.title[0]
            if (article.fields.description)
              result.description = article.fields.description[0]
            if (article.fields.url)
              result.url = article.fields.url[0]
            if (article.fields.image)
              result.image = article.fields.image[0]
            result.loading = false
            return result
          })
          this.setState({searchResults : results})
        }

        this.setState({searching: false})
      })
  }

  render() {
    return this._create_metacontent()
  }
}

CreateMetacontent2.propTypes = {
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
})(CreateMetacontent2)
