'use strict'

import {
  SegmentedControlIOS,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ListView,
  Dimensions
} from 'react-native';
import React,{Component,PropTypes} from 'react'

const {height, width} = Dimensions.get('window')
import MLDetail from '../containers/MLDetail';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNFS from 'react-native-fs'

export default class MLCell extends Component {
  render(){
    let row = null;
    const rowData = this.props.ml;
    if (rowData.content===null) {
      return null
    }
    const unread = (rowData.badge==0);
    if (rowData != undefined) {
      let favour = null;
      if (rowData.favoured) {
        favour = <Icon name="favorite" size={11} color="red" style={styles.favour} />;
      }
      let content = null;
      switch (rowData.media) {
        case "text":
          content = (<Text style={[styles.text,(unread?{}:styles.unreadText)]}>
              {this._formatTextBox(rowData.content.cxt)}
            </Text>);
          break;
        case "image":
          content = (<Image
             style={[styles.image,(unread?{}:styles.unreadImage)]}
             source={{uri:RNFS.DocumentDirectoryPath + '/'+rowData.content.cxt.uri}}
           />);
          break;
        case "audio":
          content = (
            <Icon name="album" size={50} color="black" />
          )
          break;
        default:
          break;
      }

      row = (
        <TouchableOpacity onPress={(e)=>{
          this._viewDetail(this.props.parent);
        }}>
          <View style={[styles.boxcell,rowData.readerID==undefined?{borderColor: '#483D8B'}:{borderColor: 'red'}]}>
            {content}
             <Text style={[styles.birth,(unread?{}:styles.unreadBirth)]}>{this._formatTimeText(rowData.birthday)+(rowData.favoured?"     ":"")}{favour}</Text>
             {unread?null:(<View style={styles.badge}>
               <Text style={styles.badgeText}>{rowData.badge}</Text>
             </View>)}
          </View>
      </TouchableOpacity>);
    }
    return row;
  }
  _formatTimeText(date){
    if (date==undefined) {
      return "未知";
    }else {
      let past = new Date(date);
      let current = new Date();
      let during = current - past;
      let day = parseInt(during/(1000*60*60*24));
      let hour = parseInt(during/(1000*60*60));
      let minute = parseInt(during/(1000*60));
      if (day>0) {
        return day+"天前";
      }else if (hour>0) {
        return hour+"小时前";
      }else if (minute>0) {
        return minute+"分钟前";
      }else {
        return "刚刚";
      }
    }
  }
  _formatTimeTitle(date){
    if (date==undefined) {
      return "未知";
    }else {
      let birth = new Date(date);
      return ((birth.getMonth()+1)+"月"+birth.getDate()+"日 "+birth.getHours()+":"+birth.getMinutes());
    }
  }
  _formatTextBox(text){
    if (text.length > 19) {
      return (text.slice(0,19))+"...";
    }else {
      return text;
    }
  }
  _viewDetail(parent){
    this.props.navigator.push({
      id: 'nav',
      nav: (
        <MLDetail
          mlID={this.props.ml._id}
          fid={this.props.ml.authorID}
          parent={"monolith"}
          cell={this}
          navigator={this.props.navigator}
        />),
    });
  }
}

let cellWith = width*0.27;
let contentWidth = width*0.26;
const styles = StyleSheet.create({
  boxcell:{
    justifyContent: 'center',
    padding: 5,
    marginBottom: 7,
    backgroundColor: 'floralwhite',
    width: cellWith,
    height: cellWith,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#483D8B'
  },
  text:{
    width:contentWidth,
    height:contentWidth,
    top: contentWidth*0.09,
    left: 0,
    borderRadius: 5,
    // color: 'white',
    // backgroundColor:'gray',
  },
  image:{
    width:contentWidth,
    height:contentWidth,
    top: contentWidth*0.08,
    left: 0,
    borderRadius: 5,
    backgroundColor: 'gray',
  },
  unreadText:{
    top: contentWidth*0.09+10,
  },
  unreadImage:{
    top: contentWidth*0.08+10,
  },
  birth:{
    fontSize: 11,
    color: 'gray',
    top: -7,
    left: 0,
    backgroundColor:'transparent',
  },
  unreadBirth:{
    top: 0,
  },
  favour:{
    backgroundColor:'transparent',
  },
  badge:{
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    top: -cellWith,
    left: cellWith*0.42,
  },
  badgeText:{
    color: 'white',
    fontSize: 11,
  }
});
