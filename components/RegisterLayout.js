'use strict'

import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Modal,
  PushNotificationIOS,
  TouchableOpacity,
  ScrollView
}  from 'react-native';
import React,{Component,PropTypes} from 'react'

import Icon from 'react-native-vector-icons/MaterialIcons'
import { IP } from '../constants/Configure'
import { Header,Alarm } from './Widget'//

const { width, height } = Dimensions.get('window');
let Token = null

export default class RegisterLayout extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      user: null,
      agreed: true,
      token:"null"
    }
  }
  componentDidMount(){
    PushNotificationIOS.requestPermissions();
    PushNotificationIOS.addEventListener('register',this._registerToken.bind(this));
  }
  _registerToken(token){
    this.setState({token:token})
    PushNotificationIOS.removeEventListener('register');
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={"输入您的昵称"}
          onChangeText={(text) => this.setState({name:text})}
          autoFocus={false}
          maxLength={20}
          value={this.state.name}
        />
        <TouchableOpacity
          onPress={(e) => {
            this.setState({agreed: !this.state.agreed})
          }}
          >
          <View style={styles.eulaAgree}>
            <View style={styles.check}>
              <Icon
                name="done"
                size={20}
                color="black"
                style={{opacity: this.state.agreed?1:0}}
                />
            </View>
            <View style={{flexDirection:"row",marginTop:4}}>
              <Text>
                同意
              </Text>
              <TouchableOpacity
                onPress={(e) => {
                  this.props.navigator.push({
                    id: 'nav',
                    nav: <EULA navigator={this.props.navigator} />
                  })
                }}
                >
                <Text style={styles.licence}>
                《用户协议》
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.btnContainer}>
          <Icon.Button
            name="vpn-key"
            backgroundColor="darkslateblue"
            style={styles.signup}
            onPress={this._register.bind(this)}
            >
            <Text style={{color:'white'}}>探索新世界</Text>
          </Icon.Button>
        </View>
      </View>
    );
  }
  _register() {
    function agree(){
      this.setState({agreed:true})
    }
    if (!this.state.agreed) {
      Alarm("未同意协议，无法注册","同意",agree.bind(this))
      return
    }

    var name = this.state.name;
    function nameit(){
      this.setState({name:"无名氏"})
    }

    if (name==="") {
      Alarm("你还没起个名字呢","叫我无名氏",nameit.bind(this))
      return
    }
    this.props.register(name,this.state.token)
  }
};

class EULA extends Component{
  constructor(props){
    super(props)
    this.state = {
      content:"加载中..."
    }
  }
  componentWillMount(){
    fetch(IP+'eula')
    .then((response) => response.text())
    .then((responseText) => {
      this.setState({content:responseText})
    })
    .catch((error) => {
      console.warn(error);
    });
  }
  render(){
    return (
      <View style={{backgroundColor:'white'}}>
        <Header
          title={"用户协议"}
          back={"注册"}
          backF={()=>{
            this.props.navigator.pop();
          }}
          />
        <ScrollView style={styles.eulaContainer}>
          <Text>
            {this.state.content}
          </Text>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  eulaAgree:{
    flexDirection: 'row',
  },
  eulaContainer:{
    padding: 20,
    width: width,
    height: height,
  },
  licence:{
    color: 'blue'
  },
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    width: width,
    height: height,
  },
  signup: {
    justifyContent: 'center'
  },
  btnContainer: {
    marginTop: 20,
  },
  input:{
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 3,
    marginTop: height*0.3,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  check:{
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    marginRight:10
  }
})
