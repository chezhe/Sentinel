'use strict'

import {

} from 'react-native';
import React,{Component,PropTypes} from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as CacheApeActions from '../actions/CacheApeActions'
import * as ChatActions from '../actions/ChatActions'
import SocialLayout from '../components/SocialLayout'
import { defaultApe } from '../constants/DefaultValue'

class Social extends Component{
  render(){
    return (
      <SocialLayout
        friendList={this.props.friendList}
        chats={this.props.chats}
        cacheApe={this.props.cacheApe}
        account={this.props.account}
        getCacheApe={(_id) => {
          let the_one = this.props.cacheApe.filter((item) => {
            return item._id === _id
          })[0]
          if (the_one == undefined) {
            the_one = defaultApe()
          }
          return the_one
        }}
        navigator={this.props.navigator}
        >
      </SocialLayout>
    )
  }
}

Social.propTypes = {
  navigator: PropTypes.any.isRequired,
  friendList: PropTypes.array.isRequired,
  cacheApe: PropTypes.array.isRequired,
  chats: PropTypes.array.isRequired,
  account: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    friendList: state.account.friendList,
    cacheApe: state.cacheApe,
    chats: state.chats,
    account: state.account
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Social)
