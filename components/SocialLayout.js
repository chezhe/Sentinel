'use strict'

import {
  SegmentedControlIOS,
  Text,
  View,
  StyleSheet,
  Image,
  ListView,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import React,{Component,PropTypes} from 'react'

import ChatRoom from '../containers/ChatRoom';
import { Header } from './Widget';
import { DefaultAvatar } from '../constants/Configure'
import Alphabet from './Alphabet'
const {height, width} = Dimensions.get('window')
let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class SocialLayout extends Component {
  constructor(props){
    super(props);
    this.displayName="SocialLayout"
    this.state = {
      selectedIndex: 0,
    }
  }
  componentWillMount(){
    this._loadMsgBadge();
  }
  _loadMsgBadge(){

  }
  render() {
    let content = null;
    if (this.state.selectedIndex==0) {
      content = (
        <ListView
          enableEmptySections={true}
          dataSource={ds.cloneWithRows(this.state.selectedIndex==0?this.props.chats:this.props.friendList)}
          renderRow={this._renderMessage.bind(this)}
          style={styles.messageList}
        />
      );
    }else {
      content = <Alphabet
                  parent={this}
                  friendList={this.props.friendList}
                  cacheApe={this.props.cacheApe}
                  account={this.props.account}
                  navigator={this.props.navigator}
                  />
    }
    return (
      <View style={styles.container}>
        <Header title={""} back={""} />
        <SegmentedControlIOS
          values={['对话', '好友']}
          selectedIndex={this.state.selectedIndex}
          onChange={this._onChange.bind(this)}
          style={styles.segment}
          tintColor="white"
        />
        {content}
      </View>
    );
  }
  _onChange(event) {
    this.setState({
      selectedIndex: event.nativeEvent.selectedSegmentIndex,
    });
  }
  _renderMessage(chat){
    const ape = this.props.getCacheApe(chat.fid)
    return (
      <TouchableHighlight
        underlayColor="lightsteelblue"
        onPress={(e)=>{
          this._messageIn(chat)
        }}>
        <View style={styles.messageItem}>
          <Image
            source={ape.avatar}
            style={styles.avatar}
            />
          <Text style={styles.friendName}>{ape.name}</Text>
          {chat.badge==0?null:(<View style={styles.badge}><Text style={styles.badgeText}>{chat.badge}</Text></View>)}
        </View>
      </TouchableHighlight>
    );
  }
  _messageIn(chat){
    this.props.navigator.push({
      id:'nav',
      nav: (<ChatRoom
              fid={chat.fid}
              prev={this}
              badge={0}
              navigator={this.props.navigator}
              />),
    });
  }
};

SocialLayout.propTypes = {
  navigator: PropTypes.any.isRequired,
  friendList: PropTypes.array.isRequired,
  cacheApe: PropTypes.array.isRequired,
  chats: PropTypes.array.isRequired,
  account: PropTypes.object.isRequired,
  getCacheApe: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  container: {
    top: 0,
    alignItems: 'center',
  },
  segment: {
    width: width*0.7,
    margin: -35,
    backgroundColor: "darkslateblue",
    borderRadius: 5,
  },
  messageList:{
    position:'absolute',
    backgroundColor: '#F0F0F0',
    width: width-20,
    height: height*0.79,
    marginTop: 50,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  messageItem:{
    flexDirection:'row',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    paddingTop: 5,
    paddingBottom: 5,
  },
  friendItem:{
    flexDirection:'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    paddingTop: 10,
    paddingBottom: 10,
  },
  avatar:{
    width: 37,
    height: 37,
    borderRadius: 3,
    marginLeft: 7,
  },
  friendName:{
    fontSize: 17,
    marginLeft: 10,
  },
  refuse:{
    backgroundColor: 'red',
    borderRadius: 3,
    padding: 5,
    position: 'absolute',
    left: width*0.3,
    top: -15,
  },
  accept:{
    backgroundColor: 'green',
    borderRadius: 3,
    padding: 5,
    position: 'absolute',
    left: width*0.5,
    top: -15,
  },
  choice:{
    fontSize: 15,
    color: 'white',
  },
  badge:{
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    position: 'absolute',
    left: width*0.8,
    top: 13,
  },
  badgeText:{
    color: 'white',
    fontSize: 12,
  }
});
