'use strict'

import {
  Text,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Animated,
  Image,
  Dimensions,
  Alert
} from 'react-native';
import React,{Component,PropTypes} from 'react'

import Icon from 'react-native-vector-icons/MaterialIcons'
import EvilIcon from 'react-native-vector-icons/EvilIcons';
const {height, width} = Dimensions.get('window')
import Spinner from 'react-native-spinkit'

export class Header extends Component {
  render(){
    let back = null;
    if (this.props.back != "") {
      back = (
        <TouchableOpacity
          onPress={(e) => {
            this.props.backF();
          }}
        >
        <View style={styles.back}>
          <EvilIcon
            name="chevron-left"
            size={37}
            color="white"
            style={styles.operate}
             />
          <Text style={styles.backTxt}>{this.props.back}</Text>
        </View>
     </TouchableOpacity>);
    }
    let forward=null;
    if (this.props.forward != undefined) {
      forward=(
        <TouchableOpacity
          onPress={(e) => {
            this.props.forwardF();
          }}
        >
          <Icon
            name={this.props.forward}
            size={24}
            color="white"
            style={styles.operateForward}
             />
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.header}>
        <View style={styles.left}>
          {back}
        </View>
        <View style={styles.center}>
          {this.props.title==""?null:(<Text style={styles.title}>{this.props.title}</Text>)}
        </View>
        <View style={styles.right}>
          {forward}
        </View>
      </View>
    );
  }
}

export class Loading extends Component{
  constructor(props){
    super(props);
    this.state = {
      visible: true,//this.props.visible,
      anim: new Animated.Value(0),
    }
  }
  componentWillMount(){
    if (this.state.visible) {
      Animated.timing(this.state.anim,{
        toValue: 180,
        duration: 3000,
      }).start();
    }
  }
  render(){
    return (
      <Modal
        animated={true}
        transparent={true}
        style={styles.modal}
        visible={this.state.visible}>
        <View style={styles.modalContent}>
        <Spinner 
          style={styles.spinner}
          isVisible={true}
          size={100} 
          type={'CircleFlip'} 
          color={"white"}/>
          <Text>加载中...</Text>
        </View>
      </Modal>
    );
  }
}

// <Animated.View
//   style={[styles.loading, {
//           transform: [
//             {rotate: this.state.anim.interpolate({
//               inputRange: [0,1],
//               outputRange: [
//                 '0deg', '720deg' // 'deg' or 'rad'
//               ],
//             })},
//           ]}
//         ]}>
//     <EvilIcon name='gear' size={173} color={'white'}/>
//   </Animated.View>
  

export function Alarm(content,btns,cbs){
  Alert.alert(
    '',
    content,
    [
      {text: btns, onPress: () => {
        if (cbs!=null) {
          cbs()
        }
      }},
    ]
  )
}

export class PropertyML extends Component{
  constructor(props){
    super(props)
    this.state = {
      checked: 'public'
    }
  }
  render(){
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>{
          this.setState({checked:"public"})
        }}>
          <Icon
          name={this.state.checked=="public"?"radio-button-checked":"radio-button-unchecked"}
          size={24}
          color="white"
          style={styles.operateForward}
            /> 
          <Text>公共</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          this.setState({checked:"protect"})
        }}>
          <Icon
          name={this.state.checked=="protect"?"radio-button-checked":"radio-button-unchecked"}
          size={24}
          color="white"
          style={styles.operateForward}
            /> 
          <Text>保护</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          this.setState({checked:"private"})
        }}>
          <Icon
          name={this.state.checked=="private"?"radio-button-checked":"radio-button-unchecked"}
          size={24}
          color="white"
          style={styles.operateForward}
            /> 
          <Text>私密</Text>
        </TouchableOpacity>       
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loading: {
    alignItems: 'center',
  },
  modal: {

  },
  modalContent:{
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#d35400',
  },
  header:{
    height: 60,
    backgroundColor: 'darkslateblue',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  title:{
    color: 'white',
    fontSize: 17,
  },
  left:{
    width: width/3,
    marginTop: 25,
    justifyContent: 'flex-end',
  },
  center:{
    width: width/3,
    alignItems: 'center',
    marginTop: 25,
  },
  right:{
    width: width/3,
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  back:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  container:{
    flexDirection: 'column'
  },
  backTxt:{
    color: 'white',
    fontSize: 15,
    left: -5,
    marginTop: 7,
  },
  operateForward:{
    marginRight: 10,
  },
  spinner: {
    marginBottom: 50
  }
})

// module.exports = {
//   Alarm: Alarm,
//   Header: Header,
//   Loading: Loading
// }
