'use strict'

import {
  
} from 'react-native';
import React,{Component,PropTypes} from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as FriendRequestActions from '../actions/FriendRequestActions'
import FriendRequestLayout from '../components/FriendRequestLayout'

class FriendRequest extends Component{
  componentWillMount(){
    const {readFR,account} = this.props
    readFR(account._id)
  }
  render(){
    return (
      <FriendRequestLayout
        friendRequest={this.props.friendRequest}
        acceptFR={this.props.acceptFR}
        refuseFR={this.props.refuseFR}
        cacheApe={this.props.cacheApe}
        navigator={this.props.navigator}
        >
      </FriendRequestLayout>
    )
  }
}

FriendRequest.propTypes = {
  navigator: PropTypes.any.isRequired,
  friendRequest: PropTypes.array.isRequired,
  acceptFR: PropTypes.func.isRequired,
  refuseFR: PropTypes.func.isRequired,
  readFR: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    friendRequest: state.friendRequest,
    cacheApe: state.cacheApe,
    account: state.account
  }
}

function mapDispatchToProps(dispatch) {
  return {
    acceptFR: bindActionCreators(FriendRequestActions.acceptFR, dispatch),
    refuseFR: bindActionCreators(FriendRequestActions.refuseFR, dispatch),
    readFR:bindActionCreators(FriendRequestActions.readFR,dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendRequest)
