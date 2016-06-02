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
  TouchableOpacity
}  from 'react-native';
import React,{Component,PropTypes} from 'react'

import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/MaterialIcons';
var { width, height } = Dimensions.get('window');

export default class IntroLayout extends Component {
  render() {
    return (
      <Modal
          animated={true}
          transparent={false}
          visible={true}
          style={{backgroundColor:'white'}}
          >
        <Swiper
          style={styles.wrapper}
          loop={false}
          showsButtons={false}
          >
          <View style={styles.slide1}>
            <Image
              source={require('image!intro_map')}
              style={{
                width: width*0.8,
                height: width*0.8,
              }}
              />
            <View style={styles.textContainer}>
              <Text style={styles.text}>放置或捡取一个“前哨”</Text>
            </View>
          </View>
          <View style={styles.slide2}>
            <Image
              source={require('image!intro_ml')}
              style={{
                width: width*0.8,
                height: width*0.8,
              }}
              />
            <View style={styles.textContainer}>
              <Text style={styles.text}>评论TA的“前哨”</Text>
            </View>
          </View>
          <View style={styles.slide3}>
            <Image
              source={require('image!intro_chat')}
              style={{
                width: width*0.8,
                height: width*0.8,
              }}
              />
            <View style={styles.textContainer}>
              <TouchableOpacity
                  onPress={this._introduced.bind(this)}
                >
                <Text style={[styles.text,styles.button]}>
                  立即体验
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Swiper>
      </Modal>
    )
  }
  _introduced(){
    this.props.parent.setState({introVisible:false})
  }
}

const styles = StyleSheet.create({
  wrapper: {

  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0099ff',
  },
  slide4: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0099ff',
  },
  textContainer:{
    width: width*0.8,
    marginTop: 20,
  },
  text: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  button:{
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    fontSize: 27,
    padding: 7,
  }
})
