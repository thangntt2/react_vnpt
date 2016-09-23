import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Table, Button, FormGroup, FormControl, ControlLabel, Panel} from 'react-bootstrap'
import ImageLoader from 'react-imageloader'
import {getChannelsList, deleteChannel} from '../actions'
import {browserHistory} from 'react-router'

class Channels extends React.Component {
	constructor (props) {
		super(props)
		this._create_edit_button = this._create_edit_button.bind(this)
		this._pre_image_loader = this._pre_image_loader.bind(this)
		this._show_channels_component = this._show_channels_component.bind(this)
	}

	componentWillMount() {
    this.props.getChannelsList()
  }

	_create_edit_button(channel, i){
		let data = {
			data: {i, channel}
		}
		return (
			<Button {...data} bsStyle="primary" onClick={function() {
			}}>Edit
			</Button>
		)
	}

	_create_del_button(channel, i){
	  let self = this
		let data = {
			data: {i, channel}
		}
		return (
			<Button {...data} bsStyle="danger" onClick={function() {
        self.props.deleteChannel(channel)
			}}>Delete
			</Button>
		)
	}

	_pre_image_loader() {
		return (<div className='uil-ring-css'/>)
	}

	_show_channels_component() {
		let {channels_list} = this.props.data
		let self = this
		return (
			<Panel>
				<Button bsStyle="primary" onClick={() => {browserHistory.push('channels/create')}}>Create</Button>

				<Table striped bordered condensed hover>
					<thead>
						<tr>
							<th>ID</th>
							<th>Kênh</th>
							<th>Icon</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
					{(!channels_list) ? null :
					  (channels_list.map(function(channel, i) {
						return (
							<tr key={channel.id}>
								<td>{channel.id}</td>
								<td>{channel.name}</td>
								<td>
									<ImageLoader
										src={channel.icon}
										wrapper={React.DOM.div}
										preloader={self._pre_image_loader}>
										{self._pre_image_loader}
									</ImageLoader>
								</td>
								<td>
									{self._create_edit_button(channel, i)}
									{self._create_del_button(channel, i)}
								</td>
							</tr>
						)
					}))}
					</tbody>

				</Table>
      </Panel>
		)
	}

	render() {
		return this._show_channels_component()
	}
}
Channels.propTypes = {
	data : React.PropTypes.object,
	dispatch: React.PropTypes.func,
  getChannelsList: React.PropTypes.func.isRequired,
  deleteChannel: React.PropTypes.func.isRequired,
}

// // Which props do we want to inject, given the global state?
function select (state) {
  return {
    data: state,
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(select, {
  getChannelsList,
  deleteChannel,
})(Channels)
