'use strict'

import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import React,{Component,PropTypes} from 'react'

import { defaultFR } from '../constants/DefaultValue'
import { DefaultAvatar } from '../constants/Configure'
import Icon from 'react-native-vector-icons/Ionicons';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
const {height, width} = Dimensions.get('window');
import { Header } from './Widget'
import ChatRoom from '../containers/ChatRoom';

export default class ApePageLayout extends Component {
  constructor(props){
    super(props);
    this.state = {
      relation: this.props.relation,
    }
  }
  render(){
    const {ape} = this.props
    let male = (ape.gender=="男");
    let button = null;
    switch (this.state.relation) {
      case "to-me":
      {
        button = (<View style={styles.operate}>
            <TouchableOpacity onPress={(e)=> {
                this._choose(false);
              }}>
              <View style={styles.refuse}><Icon name="close-circled" size={21} color="white" /><Text style={styles.choice}>拒绝</Text></View>
            </TouchableOpacity>
            <TouchableOpacity onPress={(e)=> {
                this._choose(true);
              }}>
              <View style={styles.accept}><Icon name="checkmark-circled" size={21} color="white" /><Text style={styles.choice}>接受</Text></View>
            </TouchableOpacity>
          </View>);
      }
        break;
      case "from-me":
      {
        button = (<Icon.Button
          name="ios-person-add"
          backgroundColor={"gray"}
          style={styles.btnIcon}
          size={27}
          >
          <Text style={styles.btnTxt}>尚未通过验证</Text>
        </Icon.Button>)
      }
        break;
      case "friend":
      {
        button = (<Icon.Button
          name="ios-chatboxes"
          backgroundColor={"#87CEFF"}
          style={styles.btnIcon}
          size={27}
          onPress={this._chatTo.bind(this)}
          >
          <Text style={styles.btnTxt}>发消息</Text>
        </Icon.Button>)
      }
        break;
      case "stranger"://stranger
      {
        button = (<Icon.Button
          name="ios-person-add"
          backgroundColor={"#87CEFF"}
          style={styles.btnIcon}
          size={27}
          onPress={this._addFriend.bind(this)}
          >
          <Text style={styles.btnTxt}>加好友</Text>
        </Icon.Button>)
      }
        break;
      default:
        break;
    }
    let content = (
      <View style={styles.content}>
       <ScrollView
        style={styles.wrap}
        contentContainerStyle={styles.containerWrap}>
        <Image
          source={ape.avatar}
          style={styles.avatar}
          />
        <View style={styles.nameWrap}>
          <Text style={styles.name}>{ape.name}</Text>
          <Icon size={27} color={male?'blue':'red'} name={male?'ios-male':'ios-female'} />
        </View>
        <Text style={styles.district}>{ape.district.province+" "+ape.district.city}</Text>
        <Text style={styles.signature}>{ape.signature}</Text>
        {button}
      </ScrollView>
    </View>);
    return (
      <View style={styles.container}>
        <Header title={""} back={"返回"} backF={()=>{
          this.props.navigator.pop();
        }} />
        {content}
      </View>
    )
  }
  _choose(tobe){
    if (tobe) {
      this.props.acceptFR(this.props.ape._id)
    }else {
      this.props.refuseFR(this.props.ape._id)
    }
  }
  _chatTo(){
    this.props.navigator.push({
      id:'nav',
      nav: (<ChatRoom
            fid={this.props.ape._id}
            navigator={this.props.navigator}
            />),
    });
  }
  _addFriend(){
    this.setState({relation:"from-me"})
    const {account,ape} = this.props
    this.props.sendFR(defaultFR({
      fromID: account._id,
      toID: ape._id,
      fromName: account.name
    }))
  }
}

const styles = StyleSheet.create({
  container:{
    width: width,
    height: height,
    backgroundColor: 'azure'
  },
  content:{
    marginTop: 15,
  },
  wrap:{
    top: 0,
    width: width,
    height: height,
  },
  containerWrap: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  avatar:{
    width: 137,
    height: 137,
    borderRadius: 3,
  },
  nameWrap:{
    flexDirection: 'row',
    marginTop: 10,
  },
  name:{
    fontSize: 23,
    marginRight: 10,
  },
  district:{
    fontSize: 23,
    marginTop: 10,
  },
  signature:{
    fontSize: 18,
    marginBottom: 20,
    marginTop: 10
  },
  btnIcon: {
    justifyContent: 'center',
    marginLeft: 20,
  },
  addFriendWrap: {
    marginTop: 20,
    width: width,
    height: 30,
  },
  btnTxt:{
    color: 'white',
    marginRight: 20,
  },
  operate:{
    flexDirection: 'row',
  },
  refuse:{
    backgroundColor: 'red',
    borderRadius: 3,
    padding: 5,
    marginRight:17,
    flexDirection: 'row',
  },
  accept:{
    backgroundColor: 'green',
    borderRadius: 3,
    padding: 5,
    marginLeft: 17,
    flexDirection: 'row',
  },
  choice:{
    fontSize: 17,
    color: 'white',
    top: 2,
    marginLeft: 5,
  },
})
