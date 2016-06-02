'use strict'

import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  ListView,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import React,{Component,PropTypes} from 'react'

import { Header } from './Widget'
import MLCell from './MLCell';

const {height, width} = Dimensions.get('window');
let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Favour extends Component {
  constructor(props){
    super(props);
    this.displayName="favour";
  }
  render(){
    return (
      <View style={styles.starBoxContainer}>
        <Header title={"收藏"} back={"账号"} backF={()=>{
          this.props.navigator.pop();
        }} />
        <ListView
          dataSource={ds.cloneWithRows(this.props.monoliths)}
          enableEmptySections={true}
          renderRow={this._renderRow.bind(this)}
          contentContainerStyle={styles.boxContainer}
          style={styles.boxList}
        />
      </View>);
  }
  _renderRow(rowData){
    return (
      <MLCell
        parent={'favour'}
        ml={rowData}
        badge={0}
        navigator={this.props.navigator}
        />
    )
  }
}

Favour.propTypes = {
  monoliths: PropTypes.array.isRequired,
  navigator: PropTypes.any.isRequired
}

const styles = StyleSheet.create({
  boxContainer:{
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  starBoxContainer:{
    backgroundColor: 'white',
    width: width,
    height: height,
  },
  boxList:{
    position:'absolute',
    width: width-20,
    height: height*0.9,
    backgroundColor: '#F0F0F0',
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 20,
    borderRadius: 5,
  },
});
