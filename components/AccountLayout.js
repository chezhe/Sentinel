'use strict'

import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import React,{Component,PropTypes} from 'react'

import { Alarm } from './Widget'
import Icon from 'react-native-vector-icons/MaterialIcons'
import EvilIcon from 'react-native-vector-icons/EvilIcons'
const {height, width} = Dimensions.get('window')
import SetAccount from '../containers/SetAccount'

import { Header } from './Widget'
import { DefaultAvatar } from '../constants/Configure'
import Favour from '../containers/Favour'
import FriendRequest from '../containers/FriendRequest'
import RegisterLayout from './RegisterLayout'

export default class AccountLayout extends Component {
  render(){
    const {account} = this.props
    let content = null
    if (this.props.account._id==undefined) {
      content = (
        <RegisterLayout
          register={this.props.register}
          navigator={this.props.navigator}
          />
        )
    }else {
      let frdreqOpacity=0,messageOpacity=0,settingOpacity=0;

      let frdreqListIN = [];
      for (let i = 0; i < frdreqListIN.length; i++) {
        if (!frdreqListIN[i].isAnsweredByTo) {
          frdreqOpacity = 1;
          break;
        }
      }
      content = (
        <View>
        <View style={styles.block}>
          <TouchableHighlight
            underlayColor="lightsteelblue"
            onPress={this._userInfo.bind(this)}>
            <View style={styles.item}>
              <Image
                source={account.avatar}
                style={styles.avatar}
                />
              <Text style={styles.username}>
              {account.name}
              </Text>
              <EvilIcon name='chevron-right' size={50} color={"#1C86EE"} style={styles.avatarRight} />
            </View>
          </TouchableHighlight>
        </View>

        <View style={styles.block}>
          {this._renderItem('sc-odnoklassniki',"好友",this._frdReq,frdreqOpacity)}
          {this._renderItem('heart',"收藏",this._starBox,0)}
        </View>

        <View style={styles.block}>
          {this._renderItem('gear',"设置",this._setting,0)}
        </View>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Header title={"我"} back={""} />
        {content}
      </View>
    );
  }
  _renderItem(icon,key,func,opacity){
    return (
      <TouchableHighlight
        underlayColor="lightsteelblue"
        onPress={ func.bind(this) }>
        <View style={styles.item}>
          <EvilIcon name={icon} size={30} color={"#1C86EE"} />
          <Text style={styles.itemText}>{key}</Text>
          <Icon name='fiber-manual-record' size={14} color={"red"} style={{opacity:opacity}}/>
          <EvilIcon name='chevron-right' size={23} color={"red"}/>
        </View>
      </TouchableHighlight>
    )
  }
  _userInfo(){
    this.props.navigator.push({
      id: 'nav',
      nav: <SetAccount navigator={this.props.navigator} />,
    });
  }
  _frdReq(){
    this.props.navigator.push({
      id:'nav',
      nav:<FriendRequest navigator={this.props.navigator} />,
    });
  }
  _starBox(){
    this.props.navigator.push({
      id: 'nav',
      nav: <Favour navigator={this.props.navigator}/>
    });
  }
  _trophy(){

  }
  _privacy(){

  }
  _setting(){
    this.props.navigator.push({
      id: "nav",
      nav: <SetGlobal navigator={this.props.navigator}/>,
    });
  }
}

class Suggest extends Component {
  constructor(props){
    super(props)
    this.state = {
      text: ""
    }
  }
  render(){
    return (
      <View style={styles.containerSuggest}>
        <Header
          title={"建议"}
          back={"取消"}
          backF={()=>{
            this.props.navigator.pop();
          }}
          forward={"send"} forwardF={()=>{
            if (this.state.text.length > 0) {
              this._suggest()
              this.props.navigator.pop();
            }else {
              Alarm("你什么也没说","好吧",null)
            }
        }}
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            this.setState({text})
          }}
          value={this.state.text}
          multiline={true}
          autoFocus={true}
          placeholder={"写下你想对我说的话"}
        />
      </View>
    )
  }
  _suggest(){

  }
}

class SetGlobal extends Component{
  render(){
    return (
      <View style={styles.container}>
        <Header
          title={"设置"}
          back={"返回"}
          backF={()=>{
            this.props.navigator.pop();
          }}
          />
          <View style={styles.block}>
            {this._renderItem('envelope',"建议",this._suggest)}
            {this._renderItem('envelope',"清除缓存",this._clearCache)}
          </View>
      </View>
    )
  }
  _renderItem(icon,key,func){
    return (
      <TouchableHighlight
        underlayColor="lightsteelblue"
        onPress={ func.bind(this) }>
        <View style={styles.item}>
          <Text style={styles.itemText}>
            {key}
          </Text>
          <EvilIcon
            name='chevron-right'
            size={23}
            color={"red"}
            style={styles.rightPos}
            />
        </View>
      </TouchableHighlight>
    )
  }
  _suggest(){
    this.props.navigator.push({
      id: "nav",
      nav: <Suggest navigator={this.props.navigator}/>,
    });
  }
  _clearCache(){

  }
}


AccountLayout.propTypes = {
  navigator: PropTypes.any.isRequired,
  account: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  containerSuggest:{
    height: height*0.5,
    width: width,
  },
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
  block:{
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: '#A3A3A3',
    backgroundColor: 'white',
  },
  item:{
    borderBottomWidth: 0.5,
    borderColor: '#A3A3A3',
    flexDirection:'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
  },
  itemText:{
    fontSize: 17,
    marginLeft: 7,
    marginRight: width*0.6,
  },
  moreSign:{
    position: 'absolute',
    left: width-30,
  },
  badge:{
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    left: -30,
  },
  badgeText:{
    color: 'white',
    fontSize: 11,
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
  input:{
    flex:1,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    fontWeight:'bold',
    fontSize: 17,
    margin: 10,
    padding: 5,
  },
  rightPos:{
    position: 'absolute',
    left: width*0.8,
  }
});
