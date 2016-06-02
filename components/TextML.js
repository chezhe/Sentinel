'use strict'

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Alert,
  Dimensions
} from 'react-native';
import React,{Component,PropTypes} from 'react'
import { Alarm } from '../components/Widget'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Header } from './Widget';
const {height, width} = Dimensions.get('window')

export default class TextML extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: "",
    }
  }
  render(){
    return (
      <View style={styles.container}>
        <Header title={"文字"} back={"取消"} backF={()=>{
          this.props.navigator.pop()
        }} forward={"send"} forwardF={()=>{
          if (this.state.text.length > 0) {
            this._drop()
            this.props.navigator.pop()
          }else {
            Alarm("这里一片空白","好吧",null)
          }
        }} />
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            this.setState({text})
          }}
          value={this.state.text}
          multiline={true}
          autoFocus={true}
          placeholder={"写点什么吧"}
        />
      </View>
    )
  }
  _drop(){
    this.props.dropML({
      media: "text",
      content:{
        cxt: this.state.text
      }
    })
    this.props.dropAnnotation({
      media: "text",
      content:{
        cxt: this.state.text
      },
      authorID: this.props.authorID,
      longitude: this.props.region.longitude,
      latitude: this.props.region.latitude
    })
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#CDC9A5',
    justifyContent: 'center',
    height: height*0.5,
    width: width,
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
});
