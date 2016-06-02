'use strict'

import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions
} from 'react-native';
import React,{Component,PropTypes} from 'react'

import Icon from 'react-native-vector-icons/MaterialIcons';
let ImagePickerManager = require('NativeModules').ImagePickerManager;
import { Header,Alarm } from './Widget'
const {height, width} = Dimensions.get('window')

let options = {
  cameraType: 'back', // 'front' or 'back'
  mediaType: 'photo', // 'photo' or 'video'
  quality: 1,
  allowsEditing: false,
  maxWidth: 800,
  maxHeight: 800,
  noData: false,
  storageOptions: {
    skipBackup: true,
  }
};

export default class ImageML extends Component {
  constructor(props){
    super(props);
    this.state = {
      imageSource: null,
      photoSize: {
        width:width*0.8,
        height:width*0.8
      },
      choiceHidden: false,
      size: {
        width: 200,
        height: 200,
      },
    }
  }
  render() {
    let choice = (
      <View style={styles.choice}>
      <TouchableOpacity onPress={e => this._selectOne(e)}>
        <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
          <Text>从相册选取</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={e => this._shootOne(e)}>
        <View style={[styles.avatar, styles.avatarContainer]}>
          <Text>拍一张</Text>
        </View>
      </TouchableOpacity>
    </View>);
    let result = (
      <View style={styles.result}>
        <Image style={this.state.photoSize} source={this.state.imageSource} />
      </View>);
    return (
      <View style={styles.container}>
        <Header title={"图片"} back={"取消"} backF={()=>{
          this.props.navigator.pop()
        }} forward={"send"} forwardF={()=>{
          if (this.state.imageSource != null) {
            this._drop()
            this.props.navigator.pop()
          }else {
            Alarm("这里一片空白","好吧",null)
          }
        }} />
      { this.state.imageSource === null ? choice : result}
      </View>
    );
  }
  _selectOne(){
    ImagePickerManager.launchImageLibrary(options, (response)  => {
      this._handleResponse(response)
    });
  }
  _shootOne(){
    ImagePickerManager.launchCamera(options, (response)  => {
      this._handleResponse(response);
    });
  }
  _handleResponse(response){
    if (response.didCancel) {

    }else if (response.error) {

    }else if (response.customButton) {

    }else {
      let source = {uri: response.uri.replace('file://', '')};
      let swidth,sheight,side;
      if (response.isVertical) {
        sheight = height*0.6;
        swidth = sheight*response.width/response.height;
        side = swidth;
      }else {
        swidth = width*0.8;
        sheight = swidth*response.height/response.width;
        side = height;
      }
      this.setState({
        imageSource: source,
        size:{
          width:response.width,
          height:response.height
        },
      });
    }
  }
  _drop(){
    this.props.dropML({
      media: "image",
      content:{
        cxt: this.state.imageSource,
        size: this.state.size,
      }
    })
    this.props.dropAnnotation({
      media: "image",
      content:{
        cxt: this.state.imageSource,
        size: this.state.size,
      },
      authorID: this.props.authorID,
      longitude: this.props.region.longitude,
      latitude: this.props.region.latitude
    })
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    width: width,
    height: height,
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
  },
  result:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  choice:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  }
});
