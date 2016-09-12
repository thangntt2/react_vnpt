import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Row, Col, Image, ImageLoader, Table, ListGroup, ListGroupItem, Panel, Radio, Button, Checkbox, FormGroup, FormControl, ControlLabel, Form, FieldGroup} from 'react-bootstrap'
import {searchWikiMetacontents, searchNewsMetacontents, queryWikiMetacontents} from '../apis/Metacontents'
import {submitMetacontent, createMetacontent, editMetacontent} from '../actions'
import {queryNewsMetacontents} from "../apis/Metacontents";
var ReactDOM = require('react-dom')
import hotkey from 'react-hotkey';
var Loading = require('react-loading')
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
      dtri: false,
      vnn: true,
      thn: true,
      searching: false,
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
    if (self.state.vne) sites.push('vnexpress')
    if (self.state.vnn) sites.push('vietnamnet')
    if (self.state.dtri) sites.push('dantri')
    if (self.state.thn) sites.push('thanhnien')
    //end
    return (this.state.category != 'article') ? searchWikiMetacontents(inputText)
      // : searchNewsMetacontents(inputText, sites, true)
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
              <Checkbox inline checked={self.state.vnn} onChange={self._checkBoxChange.bind(self, 'vnn')}>
                Vietnamnet
              </Checkbox>
              <Checkbox inline checked={self.state.thn} onChange={self._checkBoxChange.bind(self, 'thn')}>
                Thannien
              </Checkbox>
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
        articles = articles.body.map(article => {
          //get entity
          if (this.state.category != 'article') {
            article = {value: article}
            article.loading = true
            queryWikiMetacontents(article.value)
              .then(value => {
                article.name = value.name
                article.description = value.description
                article.url = value.url
                article.image = value.image
                article.loading = false
                this.setState({searchResults: this.state.searchResults})
              })
          } else {
            article.loading = true
            queryNewsMetacontents(article.link)
              .then(res => {
                article.name = res.body.title
                article.description = res.body.desc
                article.url = article.link
                article.image = res.body.image
                article.loading = false
                this.setState({searchResults: this.state.searchResults})
              })
          }
          //
          return article
        })

        this.setState({searching: false})
        this.setState({searchResults : articles})
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
