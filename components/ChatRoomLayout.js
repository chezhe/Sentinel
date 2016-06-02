'use strict'

import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Text,
  Dimensions
} from 'react-native';
import React,{Component,PropTypes} from 'react'

import EvilIcon from 'react-native-vector-icons/EvilIcons'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Header } from './Widget'
import { DefaultAvatar } from '../constants/Configure'
import GiftedMessenger from 'react-native-gifted-messenger'
const {height, width} = Dimensions.get('window')

export default class ChatRoomLayout extends Component {
  constructor(props){
    super(props);
    this.state = {
      msgs:[],
      posted: false,
      opModalVisible: false
    }
  }
  componentWillMount(){
    this._loadMsgs();
  }
  shouldComponentUpdate(nextProps, nextState){
    if (this.state.msgs.length != nextProps.chat.msg.length) {
      this._loadMsgs()
      return true
    }
    return false
  }
  _loadMsgs(){
    const {account,ape,chat} = this.props
    let msgs = []
    for (let i = 0; i < chat.msg.length; i++) {
      const self = chat.msg[i].fromID===account._id;
      msgs.push({
        uniqueId: ''+i,
        text: chat.msg[i].message,
        name: self?account.name:ape.name,
        image:self?account.avatar:ape.avatar,
        position: self?'right':'left',
      })
    }
    this.setState({msgs:msgs});
  }
  _handleSend(message = {}, rowID = null) {
    if (this.state.message!="") {
      const {account,ape} = this.props
      this.setState({posted: true})
      this.props.chatTo({
        fromName: account.name,
        fromID: account._id,
        toID: ape._id,
        message: message.text,
        time: Date.now()
      })

      const nmsg = {
        uniqueId: ''+this.state.msgs.length,
        text: message.text,
        name: account.name,
        image: account.avatar,
        position: 'right',
      }
      this.setState({msgs:[...this.state.msgs,nmsg]})
    }
  }
  _cleanMsgs(){
    this.setState({opModalVisible:false,msgs:[]})
    this.props.deleteChat(this.props.ape._id)
  }
  _renderItem(icon,key,func){
    let color = 'white'
    return (
      <TouchableOpacity onPress={ func.bind(this) }>
        <View style={styles.postItem}>
          <EvilIcon name={icon} size={31} color={color} style={styles.postIcon} />
          <Text style={styles.postText}>{key}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  _cancel(){
    this.setState({opModalVisible:false});
  }
  render() {
    return (
      <View>
        <Header title={this.props.name} back={"聊天"}  backF={()=>{
          this.props.navigator.pop();
        }} forward={"dashboard"} forwardF={()=>{
          this.setState({opModalVisible:true});
        }}/>
        <Modal
          animated={true}
          transparent={true}
          style={styles.modal}
          visible={this.state.opModalVisible}
          >
          <View style={[styles.modalContainer, {backgroundColor: 'rgba(0, 0, 0, 0.5)'}]}>
            <View style={styles.postButtons}>
              {this._renderItem('minus',"清除",this._cleanMsgs)}
              <TouchableOpacity onPress={this._cancel.bind(this)}>
                <View style={styles.cancelPost}>
                  <Text style={styles.postText}>取消</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <GiftedMessenger
          ref={(c) => this._GiftedMessenger = c}
          autoFocus={false}
          messages={this.state.msgs}
          handleSend={this._handleSend.bind(this)}
          maxHeight={Dimensions.get('window').height - 64}
          placeholder={""}
          loadEarlierMessagesButton={false}
          loadEarlierMessagesButtonText={"加载更早聊天"}
          onLoadEarlierMessages={() => {

          }}
          senderName={"我"}
          senderImage={this.props.account.avatar}
          sendButtonText={""}
          returnKeyType={true}
          submitOnReturn={true}
          hideTextInput={false}
          onImagePress={(e) => {
            
          }}
          styles={{
            bubbleLeft: {
              backgroundColor: '#e6e6eb',
              marginRight: 70,
            },
            bubbleRight: {
              backgroundColor: '#007aff',
              marginLeft: 70,
            },
          }}
        />
      </View>
    );
  }
}


ChatRoomLayout.propTypes = {
  ape: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired,
  account: PropTypes.object.isRequired,
  chatTo: PropTypes.func.isRequired,
  navigator: PropTypes.any.isRequired
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'azure',
    height: height,
    width: width,
    alignItems: 'center',
  },
  modalContainer:{
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column',
    width: width,
    height: height,
  },
  postButtons:{
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column',
    width: width,
  },
  postItem:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkslateblue',
    flexDirection: 'row',
    paddingTop: 7,
    paddingBottom: 7,
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  postText:{
    fontSize: 19,
    color: 'white',
    marginLeft: 0,
  },
  postIcon:{
    marginRight: 10,
  },
  cancelPost:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    flexDirection: 'row',
    paddingTop: 11,
    paddingBottom: 11,
    marginTop: 5,
  },
  maple:{
    flex: 1,
    height: height,//560
    margin: 0,
    borderWidth: 0,
    borderColor: '#000000',
  }
});
