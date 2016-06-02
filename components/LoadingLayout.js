'use strict'

import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Modal
}  from 'react-native';
import React,{Component,PropTypes} from 'react'

import Icon from 'react-native-vector-icons/MaterialIcons'
var { width, height } = Dimensions.get('window')

export default class LoadingLayout extends Component {
  render() {
    return (
      <Modal
        animated={true}
        transparent={false}
        visible={true}
        style={{backgroundColor:'white'}}
        >
        <View style={{width:width,height:height,backgroundColor:'red',opacity:1}}>
        <Text style={styles.txt}>
          TTT
        </Text>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  txt:{
    fontSize:100,
    color: 'white',
  }
})
