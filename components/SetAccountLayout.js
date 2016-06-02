'use strict'

import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableHighlight,
  Dimensions,
  PickerIOS
} from 'react-native';
import React,{Component,PropTypes} from 'react'

const {height, width} = Dimensions.get('window')
import { Header } from './Widget'
import EvilIcon from 'react-native-vector-icons/EvilIcons'
let ImagePickerManager = require('NativeModules').ImagePickerManager;

import { CHINA } from '../constants/Configure'
const PickerItemIOS = PickerIOS.Item;
const options = {
  cameraType: 'back', // 'front' or 'back'
  mediaType: 'photo', // 'photo' or 'video'
  quality: 1,
  allowsEditing: false,
  maxWidth: 500,
  maxHeight: 500,
  noData: false,
  storageOptions: {
    skipBackup: true,
  }
};
export default class SetAccountLayout extends Component {
  constructor(props){
    super(props);
    this.state = {
      avatar: this.props.account.avatar
    }
  }
  componentWillUnmount(){
    if (this.state.avatar != this.props.account.avatar) {
      this.props.modifyAvatar(this.state.avatar,this.props.account._id)
    }
  }
  render(){
    const account = this.props.account;
    return (
      <View style={styles.container}>
        <Header title={"设置昵称"} back={"个人信息"} backF={()=>{
            this.props.navigator.pop();
          }} />
        <View style={styles.userinfo}>
          <TouchableHighlight
            onPress={this._changeAvatar.bind(this)}
            underlayColor="lightsteelblue">
            <View style={styles.userinfoItem}>
              <Text style={styles.key}>
                头像
              </Text>
              <Image
                source={this.state.avatar}
                style={[styles.avatar,styles.userInfoAvatar]}
                />
            </View>
          </TouchableHighlight>
          {this._renderItem("昵称",account.name,this._changeName)}
          {this._renderItem("性别",account.gender,this._changeGender)}
          {this._renderItem("地区",account.district.province+" "+account.district.city,this._changeDistrict)}
          {this._renderItem("签名",account.signature,this._changeSignature)}
        </View>
      </View>)
  }
  _renderItem(key,value,func){
    return (
      <TouchableHighlight
        onPress={ func.bind(this) }
        underlayColor="lightsteelblue">
        <View style={styles.userinfoItem}>
          <Text style={styles.key}>
            {key}
          </Text>
          <Text style={styles.value}>
            {value}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }
  _changeAvatar(){
    ImagePickerManager.launchImageLibrary(options, (response)  => {
      this._handleResponse(response)
    });
  }
  _handleResponse(response){
    if (response.didCancel) {

    }else if (response.error) {

    }else if (response.customButton) {

    }else {
      this.setState({
        avatar: {uri:response.uri},
      });
    }
  }
  _changeName(){
    this.props.navigator.push({
      id: 'nav',
      nav: <SetName
            name={this.props.account.name}
            _id={this.props.account._id}
            modifyName={this.props.modifyName}
            navigator={this.props.navigator}
            />
    })
  }
  _changeGender(){
    this.props.navigator.push({
      id: 'nav',
      nav: <SetGender
            gender={this.props.account.gender}
            _id={this.props.account._id}
            modifyGender={this.props.modifyGender}
            navigator={this.props.navigator}
            />,
    });
  }
  _changeDistrict(){
    this.props.navigator.push({
      id: 'nav',
      nav: <SetDistrict
        district={this.props.account.district}
        _id={this.props.account._id}
        modifyDistrict={this.props.modifyDistrict}
        navigator={this.props.navigator}
       />,
    });
  }
  _changeSignature(){
    this.props.navigator.push({
      id: 'nav',
      nav: <SetSignature
        signature={this.props.account.signature}
        _id={this.props.account._id}
        modifySignature={this.props.modifySignature}
        navigator={this.props.navigator}
       />,
    });
  }
}

SetAccountLayout.propTypes = {
  navigator: PropTypes.any.isRequired,
  account: PropTypes.object.isRequired,
  modifyAvatar: PropTypes.func.isRequired,
  modifyName: PropTypes.func.isRequired,
  modifyGender: PropTypes.func.isRequired,
  modifyDistrict: PropTypes.func.isRequired,
  modifySignature: PropTypes.func.isRequired,
}

class SetName extends Component {
  constructor(props){
    super(props)
    this.state={
      name: this.props.name
    }
  }
  componentWillUnmount(){
    if (this.state.name != this.props.name) {
      this.props.modifyName(this.state.name,this.props._id)
    }
  }
  render(){
    return (
      <View style={styles.container}>
        <Header title={"设置昵称"} back={"个人信息"} backF={()=>{
          this.props.navigator.pop();
        }} />
        <TextInput
          style={styles.inputName}
          onChangeText={(text) => {
            this.setState({name:text})
          }}
          value={this.state.name}
         />
      </View>);
  }
}

SetName.propTypes = {
  // name: PropTypes.stirng.isRequired
}

class SetGender extends Component{
  constructor(props){
    super(props);
    this.state = {
      gender:this.props.gender,
    }
  }
  componentWillUnmount(){
    if (this.state.gender != this.props.gender) {
      this.props.modifyGender(this.state.gender,this.props._id)
    };
  }
  render(){
    return (
      <View style={styles.container}>
        <Header title={"设置性别"} back={"个人信息"} backF={()=>{
          this.props.navigator.pop();
        }} />
        <TouchableHighlight
          underlayColor="lightsteelblue"
          onPress={(e)=>{
              this.setState({gender:"男"});
            }}>
          <View style={styles.item}>
            <Text style={styles.itemText}>男</Text>
            <EvilIcon name='tag' size={40} color={this.state.gender=="男"?"blue":"white"} style={styles.genderTag} />
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="lightsteelblue"
          onPress={(e)=>{
              this.setState({gender:"女"});
            }}>
          <View style={styles.item}>
            <Text style={styles.itemText}>女</Text>
            <EvilIcon name='tag' size={40} color={this.state.gender=="女"?"blue":"white"} style={styles.genderTag} />
          </View>
        </TouchableHighlight>
      </View>)
  }
}

SetGender.propTypes = {
  // gender: PropTypes.stirng.isRequired
}

class SetDistrict extends Component {
  constructor(props){
    super(props);
    this.state = {
      district: this.props.district,
    }
  }
  componentWillUnmount(){
    let district = this.state.district;
    let province = CHINA[district.provinceKey];
    let city = province.city[district.cityIndex];
    this.props.modifyDistrict(Object.assign({},this.state.district,{
      province: province.name,
      city: city
    }),this.props._id)
  }
  render() {
    let district = this.state.district;
    let make = CHINA[district.provinceKey];
    let selectionString = make.name + ' ' + make.city[district.cityIndex];
    return (
      <View style={styles.container}>
        <Header title={"设置地区"} back={"个人信息"} backF={()=>{
          this.props.navigator.pop();
        }} />
        <View style={styles.districtContainer}>
          <PickerIOS
            selectedValue={district.provinceKey}
            style={{width:width*0.3}}
            onValueChange={(provinceKey) =>
              this.setState({district: Object.assign({},district,{
                provinceKey, cityIndex: 0
              })})
            }>
            {Object.keys(CHINA).map((province) => (
              <PickerItemIOS
                key={province}
                value={province}
                label={CHINA[province].name}
              />
            ))}
          </PickerIOS>
          <PickerIOS
            style={{width:width*0.3}}
            selectedValue={district.cityIndex}
            key={district.provinceKey}
            onValueChange={(cityIndex) =>
              this.setState({district:Object.assign({},district,{
                cityIndex
              })})}
            >
            {CHINA[district.provinceKey].city.map((modelName, cityIndex) => (
              <PickerItemIOS
                key={district.provinceKey + '_' + cityIndex}
                value={cityIndex}
                label={modelName}
              />
            ))}
          </PickerIOS>
        </View>
      </View>
    );
  }
}

SetDistrict.propTypes = {
  // district: PropTypes.object.isRequired
}

class SetSignature extends Component {
  constructor(props){
    super(props);
    this.state = {
      signature: this.props.signature,
    }
  }
  componentWillUnmount(){
    if (this.state.signature != this.props.signature) {
      this.props.modifySignature(this.state.signature,this.props._id)
    };
  }
  render(){
    return (
      <View style={styles.container}>
        <Header title={"设置签名"} back={"个人信息"} backF={()=>{
          this.props.navigator.pop();
        }} />
        <TextInput
          style={styles.inputSignature}
          onChangeText={(text) => {
            this.setState({signature:text});
          }}
          value={this.state.signature}
          multiline={true}
          placeholder={"写点什么吧"}
        />
      </View>);
  }
}

SetSignature.propTypes = {
  // signature: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    backgroundColor: 'white',
    width: width,
    height: height
  },
  districtContainer:{
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height*0.5,
  },
  inputName:{
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 3,
    marginTop: 30,
  },
  key:{
    fontSize: 17,
    marginLeft: 13,
  },
  value:{
    left: width*0.3,
    textAlign: 'right',
    fontSize: 17,
    color: 'darkcyan',
  },
  userInfoAvatar:{
    left: width*0.3,
  },
  userinfoItem:{
    borderBottomWidth: 0.5,
    // borderTopWidth: 0.5,
    borderColor: '#A3A3A3',
    flexDirection:'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  item:{
    borderBottomWidth: 0.5,
    borderColor: '#A3A3A3',
    flexDirection:'row',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 5,
  },
  userinfo:{
    borderTopWidth: 0.5,
    top: height*0.2,
    backgroundColor: 'white',
  },
  avatar:{
    width: 57,
    height: 57,
    borderRadius: 3,
  },
  itemText:{
    marginLeft: width*0.1,
    fontSize: 20
  },
  genderTag:{
    marginLeft: width*0.45,
    marginTop: 10,
  },
  inputSignature:{
    height: 72,
    width: width*0.9,
    marginLeft: width*0.05,
    marginTop: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 3,
    backgroundColor: 'white',
    fontSize: 17,
  },
});
