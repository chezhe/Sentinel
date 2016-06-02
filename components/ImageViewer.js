'use strict'

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import React,{Component,PropTypes} from 'react'

const {height, width} = Dimensions.get('window')
import { Header } from './Widget'

export default class ImageViewer extends Component {
  constructor(props){
    super(props);
    this.state = {
      size:{
        width: width,
        height: height,
      }
    }
  }
  componentWillMount(){
    let size = this.props.content.size;
    this.setState({size:{
      width: width,
      height: size.height*width/size.width,
    }});
  }
  render(){
    return (
      <View style={styles.container}>
        <Header title={"照片"} back={"返回"} backF={()=>{
          this.props.navigator.pop();
        }} />
        <View style={styles.content}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigator.pop();
            }}
            >
            <Image
             source={{uri:this.props.content.uri}}
             style={this.state.size}
              />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

ImageViewer.propTypes = {
  // size: PropTypes.

}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',

    backgroundColor: 'black',
    height: height,
    width: width,
  },
  content:{
    height: height-60,
    justifyContent: 'center',
  }
});
