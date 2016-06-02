'use strict'

import {
  SegmentedControlIOS,
  Text,
  View,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  ListView,
  ScrollView,
  TextInput,
  Dimensions,
  MapView
} from 'react-native';
import React,{Component,PropTypes} from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Header } from './Widget'
const {height, width} = Dimensions.get('window')

export default class MLReport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reasonTypes:[],
      reason:""
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <Header title={""} back={"前哨"} backF={()=>{
          this.props.navigator.pop();
        }} forward={"send"} forwardF={()=>{

        }}/>
        {this._renderItem("political","政治")}
        {this._renderItem("pulp","低俗、色情")}
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            this.setState({reason:text})
          }}
          value={this.state.reason}
          multiline={true}
          autoFocus={true}
          placeholder={"具体信息"}
        />
      </View>
    )
  }
  _renderItem(tp,cxt){
    let opacity = 0
    let rt = this.state.reasonTypes
    if (rt.length>0&&rt.filter(item => {return item===tp}).length>0) {
      opacity = 1
    }
    return (
      <TouchableOpacity
        onPress={(e) => {
          this.setState({reasonTypes: [...this.state.reasonTypes,tp]})
        }}
        >
        <View style={styles.eulaAgree}>
          <View style={styles.check}>
            <Icon
              name="done"
              size={20}
              color="black"
              style={{opacity: opacity}}
              />
          </View>
          <View style={{flexDirection:"row",marginTop:4}}>
            <Text>
              {cxt}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

MLReport.propTypes = {
  reporterID: PropTypes.string.isRequired,
  mlID: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'azure',
    height: height,
    width: width
  },
  eulaAgree:{
    flexDirection: 'row',
    marginTop: 30,
    paddingLeft:30
  },
  check:{
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    marginRight:10
  },
  input:{
    flex:1,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    fontWeight:'bold',
    fontSize: 17,
    margin: 10,
    padding: 5
  }
})
