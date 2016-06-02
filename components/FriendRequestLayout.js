'use strict'

import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  ListView,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import React,{Component,PropTypes} from 'react'

import Icon from 'react-native-vector-icons/MaterialIcons';
const {height, width} = Dimensions.get('window');

import { Header } from './Widget'
import { DefaultAvatar } from '../constants/Configure'

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class FriendRequestLayout extends Component{
  render(){
    return (
      <View style={styles.container}>
        <Header title={"好友"} back={"返回"} backF={()=>{
          this.props.navigator.pop();
          }}/>
        <ListView
          enableEmptySections={true}
          dataSource={ds.cloneWithRows(this.props.friendRequest)}
          renderRow={this._renderContent.bind(this)}
          style={styles.messageList}
        />
      </View>
    );
  }
  _renderContent(rowData){
    if (rowData.out) {
      return this._renderOut(rowData)
    }else {
      return this._renderIn(rowData)
    }
  }
  _getApe(id){
    return this.props.cacheApe.filter((item) => {
      return item._id === id
    })[0]
  }
  _renderIn(rowData){
    let other = null;
    if (rowData.isAnsweredByTo) {
      other = (
        <View style={styles.result}>
          <Icon name={rowData.answer?"check":"close"} color={'darkslateblue'} size={23} />
        </View>
      );
    }else {
      other = (
        <View style={styles.choiceContainer}>
          <TouchableOpacity onPress={(e)=> {
              this.props.refuseFR(rowData.fromID)
            }}>
            <View style={styles.refuse}><Text style={styles.choice}>拒绝</Text></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={(e)=> {
              this.props.acceptFR(rowData.fromID)
            }}>
            <View style={styles.accept}><Text style={styles.choice}>接受</Text></View>
          </TouchableOpacity>
        </View>
      );
    }
    const ape = this._getApe(rowData.fromID)
    return (
      <TouchableHighlight
        underlayColor="lightsteelblue"
        onPress={this._friendReqIn}>
        <View style={styles.friendItem}>
          <Image
            source={ape.avatar}
            style={styles.avatarSM}
            />
          <Text style={styles.friendName}>{ape.name}</Text>
          {other}
        </View>
      </TouchableHighlight>
    );
  }
  _renderOut(rowData){
    let other = null;
    if (rowData.isAnsweredByTo) {
      other = (
        <View style={styles.result}>
          <Icon name={rowData.answer?"check":"close"} color={'darkslateblue'} size={23} />
        </View>
      );
    }else {
      other = (
        <View style={styles.choiceContainer}>
          <Text>尚未回复</Text>
        </View>
      );
    }
    const ape = this._getApe(rowData.toID)
    return (
      <TouchableHighlight
        underlayColor="lightsteelblue"
        onPress={this._friendReqIn}>
        <View style={[styles.friendItem,{backgroundColor:"lightsteelblue"}]}>
          <Image
            source={ape.avatar}
            style={styles.avatarSM}
            />
          <Text style={styles.friendName}>{ape.name}</Text>
          {other}
        </View>
      </TouchableHighlight>
    );
  }
}

FriendRequestLayout.propTypes = {
  navigator: PropTypes.any.isRequired,
  friendRequest: PropTypes.array.isRequired,
  acceptFR: PropTypes.func.isRequired,
  refuseFR: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#F0F0F0',
    height: height,
    width: width,
  },
  avatar:{
    width: 57,
    height: 57,
    borderRadius: 3,
  },
  avatarSM:{
    width: 37,
    height: 37,
    borderRadius: 3,
    marginLeft: 7,
  },
  username:{
    fontSize: 27,
    marginLeft: 11,
    marginRight: width*0.5,
  },
  avatarRight:{
    position: 'absolute',
    left: width*0.8,
    top: 20,
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
  friendItem:{
    flexDirection:'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    paddingTop: 10,
    paddingBottom: 10,
  },
  friendName:{
    fontSize: 13,
    marginLeft: 10,
    marginBottom: 20,
  },
  choiceContainer:{
    position: 'absolute',
    flexDirection:'row',
    alignItems: 'center',
    left: width*0.65,
    top: 15,
  },
  refuse:{
    backgroundColor: 'red',
    borderRadius: 3,
    padding: 5,
  },
  accept:{
    backgroundColor: 'green',
    borderRadius: 3,
    padding: 5,
    marginLeft: 10,
  },
  choice:{
    color: 'white',
  },
  result:{
    position: 'absolute',
    left: width*0.7,
    top: 15,
  }
});
