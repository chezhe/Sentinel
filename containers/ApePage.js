'use strict'

import {

} from 'react-native';
import React,{Component,PropTypes} from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as FriendRequestActions from '../actions/FriendRequestActions'

import ApePageLayout from '../components/ApePageLayout'

class ApePage extends Component{
  _getRelation(){
    const fid = this.props.ape._id
    const account = this.props.account
    if (fid === account._id) {
      return "myself"
    }
    if (account.friendList.filter((item) => { return item === fid}).length>0) {
      return "friend"
    }
    const fr = this.props.friendRequest
    for (var i = 0; i < fr.length; i++) {
      if (fr[i].fromID===account._id && fr[i].toID===fid) {
        return "from-me"
      }
      if (fr[i].toID===account._id && fr[i].fromID===fid) {
        return "to-me"
      }
    }
    return "stranger"
  }
  render(){
    const rel = this._getRelation();
    return (
      <ApePageLayout
        ape={this.props.ape}
        account={this.props.account}
        mlID={this.props.mlID}
        relation={rel}
        acceptFR={this.props.acceptFR}
        refuseFR={this.props.refuseFR}
        sendFR={this.props.sendFR}
        navigator={this.props.navigator}
        >
      </ApePageLayout>
    )
  }
}

ApePage.propTypes = {
  ape: PropTypes.object.isRequired
}

function mapStateToProps(state,target) {
  return {
    account: state.account,
    friendRequest: state.friendRequest
  }
}

function mapDispatchToProps(dispatch) {
  return {
    acceptFR: bindActionCreators(FriendRequestActions.acceptFR, dispatch),
    refuseFR: bindActionCreators(FriendRequestActions.refuseFR, dispatch),
    sendFR: bindActionCreators(FriendRequestActions.sendFR, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApePage)
