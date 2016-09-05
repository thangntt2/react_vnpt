import React, {Component} from 'react'
import { SideNav} from 'react-sidenav';
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'

class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {selectedSB : props.selectedSB};
		this.updateSelection = this.updateSelection.bind(this);
	}
	updateSelection(selection) {
	    this.setState({selectedSB:selection.id});
	    switch (selection.id) {
	    	case 'channels':
	    		browserHistory.push('/channels')
	    		break
	    	case 'metacontents_show':
	    		browserHistory.push('/metacontents')
	    		break
        case 'metacontents_create':
          browserHistory.push('/metacontents/create')
          break
        case 'dashboard':
          browserHistory.push('/dashboard')
          break;
        case 'keyword_show':
          browserHistory.push('/keyword')
          break
        case 'keyword_create':
          browserHistory.push('/keyword/create')
          break
	    }
	};
	render() {
	    var navi = [
	        { id: 'dashboard', text: 'Home'},
	        { id: 'channels', text: 'Kênh'},
          {
            id: 'metacontents', text: 'Metacontents',
            navlist: [
              {id: 'metacontents_show', text: 'Show'},
              {id: 'metacontents_create', text: 'Create'},
            ]
          },
	        { id: 'keywords', text: 'Keyword' ,
            navlist: [
              {id: 'keyword_show', text: 'Show'},
              {id: 'keyword_create', text: 'Create'}
            ]
          }
	    ];
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
