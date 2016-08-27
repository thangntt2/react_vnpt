import React, {Component} from 'react'
import { SideNav, Nav } from 'react-sidenav';
import {connect} from 'react-redux'
import { getChannelsList} from '../actions'

class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {selectedSB : props.selectedSB};
		this.updateSelection = this.updateSelection.bind(this);
	}
	updateSelection(selection) {
	    this.setState({selectedSB:selection.id});
	    this.props.dispatch(getChannelsList())
	};
	render() {
	    var navi = [
	        { id: 'dashboard', text: 'Home'},
	        { id: 'channels', text: 'Kênh'},
	        { id: 'metacontents', text: 'Metacontents'},
	        { id: 'keywords', text: 'Keyword' }
	    ];
    	let {dispatch} = this.props;    
	    return (
	    	<div className='sidebar_wrapper'>
		        <SideNav 
		          	selected={this.state.selectedSB} 
		          	navs={navi} 
		          	onSelection={this.updateSelection}>
		        </SideNav>
	        </div>
	    )
	}
};

Sidebar.propTypes = {
	selectedSB : React.PropTypes.object,
	dispatch: React.PropTypes.func,
}

// Which props do we want to inject, given the global state?
function select (state) {
  return {
    data: state
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Sidebar)