'use strict'

import {

} from 'react-native';
import React,{Component,PropTypes} from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ChatActions from '../actions/ChatActions'
import ChatRoomLayout from '../components/ChatRoomLayout'
import { defaultChat } from '../constants/DefaultValue'

class ChatRoom extends Component{
  componentDidMount(){
    const {ape,viewChat} = this.props
    viewChat(ape._id)
  }
  componentWillUnmount(){
    const {ape,viewChat} = this.props
    viewChat(ape._id)
  }
  render(){
    return (
      <ChatRoomLayout
        ape={this.props.ape}
        chat={this.props.chat}
        account={this.props.account}
        chatTo={this.props.chatTo}
        deleteChat={this.props.deleteChat}
        navigator={this.props.navigator}
        >
      </ChatRoomLayout>
    )
  }
}

ChatRoom.propTypes = {
  ape: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired,
  account: PropTypes.object.isRequired,
  chatTo: PropTypes.func.isRequired,
  viewChat: PropTypes.func.isRequired,
  deleteChat: PropTypes.func.isRequired,
  navigator: PropTypes.any.isRequired
}

function mapStateToProps(state,target) {
  let chat = state.chats.filter((item) => {
    return item.fid === target.fid
  })[0]
  if (chat == undefined) {
    chat = defaultChat(target.fid)
  }
  return {
    ape: state.cacheApe.filter((item) => {
      return item._id === target.fid
    })[0],
    chat: chat,
    account: state.account
  }
}

function mapDispatchToProps(dispatch) {
  return {
    chatTo: bindActionCreators(ChatActions.chatTo,dispatch),
    viewChat: bindActionCreators(ChatActions.viewChat,dispatch),
    deleteChat:bindActionCreators(ChatActions.deleteChat,dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatRoom)
