'use strict'

import {
  Text,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  AsyncStorage
} from 'react-native';
import React,{Component,PropTypes} from 'react'

import Icon from 'react-native-vector-icons/MaterialIcons'
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import TextML from './TextML'
import ImageML from './ImageML'
import AudioML from './AudioML'
import { Header,Loading } from './Widget'
import Maple from '../containers/Maple'
import IntroLayout from './IntroLayout'
import LoadingLayout from '../components/LoadingLayout'

const {height, width} = Dimensions.get('window')

export default class ExploreLayout extends Component {
  constructor(props){
    super(props);
    this.displayName="explore";
    this.state = {
      introVisible: false,
      dropModalVisible: false,
      filterModalVisible: false,
      loadingModalVisible: true,
      filterText: true,
      filterImage: true,
      filterAudio: true
    }
  }
  async _loadIntroState(){
    try {
      let introduced = await AsyncStorage.getItem("intro");
      if (introduced == null) {
        this.setState({introVisible:true})
        AsyncStorage.setItem("intro","true",(err) => {

        })
      }else {

      }
    } catch (e) {

    } finally {

    }
  }
  componentWillMount(){
    this._loadIntroState()
  }
  componentWillReceiveProps(nextProps){

  }
  shouldComponentUpdate(nextProps, nextState) {
    return true
  }
  render(){
    return (
      <View style={styles.container}>
        <Header title={"探索"}  back={""} />
        {this.state.introVisible?<IntroLayout parent={this} />:null}
        <Modal
          animated={true}
          transparent={true}
          style={styles.modal}
          visible={this.state.dropModalVisible}>
          <View style={[styles.modalContainer, {backgroundColor: 'rgba(0, 0, 0, 0.5)'}]}>
            <View style={styles.postButtons}>
              {this._renderItem('text-fields',"文字",this._dropText,false)}
              {this._renderItem('insert-photo',"图片",this._dropImage,false)}
              {this._renderItem('mic',"音频",this._dropAudio,false)}
              <TouchableOpacity onPress={this._cancelDrop.bind(this)}>
                <View style={styles.cancelPost}>
                  <Text style={styles.postText}>取消</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          animated={true}
          transparent={true}
          style={styles.modal}
          visible={this.state.filterModalVisible}>
          <View style={[styles.modalContainer, {backgroundColor: 'rgba(0, 0, 0, 0.5)'}]}>
            <View style={styles.postButtons}>
              {this._renderItem('done',"文字",this._filterText,true)}
              {this._renderItem('done',"图片",this._filterImage,true)}
              {this._renderItem('done',"音频",this._filterAudio,true)}
              <TouchableOpacity onPress={(e) => {
                this.setState({filterModalVisible:false});
              }}>
                <View style={styles.cancelPost}>
                  <Text style={styles.postText}>确定</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Maple
          filterText={this.state.filterText}
          filterImage={this.state.filterImage}
          filterAudio={this.state.filterAudio}
          navigator={this.props.navigator}
          />
          <View style={styles.operateContainer}>
            <TouchableOpacity
              onPress={this._dropBox.bind(this)}
              >
              <EvilIcon
                name="archive"
                size={50}
                color="red"
                style={styles.operate}
                 />
           </TouchableOpacity>
           <TouchableOpacity
              onPress={(e) => {
                this.setState({filterModalVisible:true})
              }}
              >
              <EvilIcon
                name="navicon"
                size={50}
                color="red"
                style={styles.operate}
                 />
           </TouchableOpacity>
          </View>
      </View>
    );
  }
  _renderItem(icon,key,func,filter){
    if (filter) {
      let colorful = true
      switch(key){
        case "文字":
          colorful = this.state.filterText
          break
        case "图片":
          colorful = this.state.filterImage
          break
        case "音频":
          colorful = this.state.filterAudio
          break
        default:
          break
      }
      return (
        <TouchableOpacity onPress={ func.bind(this) }>
          <View style={styles.postItem}>
            <Text style={styles.postText}>{key}</Text>
            <Icon name={icon} size={27} color={colorful?'white':'darkslateblue'} style={{marginLeft: 10,}}/>
          </View>
        </TouchableOpacity>
      )
    }else {
      return (
        <TouchableOpacity onPress={ func.bind(this)}>
          <View style={styles.postItem}>
            <Icon name={icon} size={25} color="white" style={styles.postIcon} />
            <Text style={styles.postText}>{key}</Text>
          </View>
        </TouchableOpacity>
      )
    }
  }
  _filter(){
    this.setState({filterModalVisible:true});
  }
  _filterText(){
    this.setState({filterText:!this.state.filterText});
  }
  _filterImage(){
    this.setState({filterImage:!this.state.filterImage});
  }
  _filterAudio(){
    this.setState({filterAudio:!this.state.filterAudio});
  }
  _dropBox(){
    this.setState({dropModalVisible: true});
  }
  _cancelDrop(){
    this.setState({dropModalVisible: false});
  }
  _drop(title){
    this.setState({dropModalVisible: false});
    let component=null;
    switch (title) {
      case "文字":
        component=(
          <TextML
            region={this.props.region}
            dropML={this.props.dropML}
            authorID={this.props.authorID}
            authorName={this.props.authorName}
            dropAnnotation={this.props.dropAnnotation}
            navigator={this.props.navigator}
            />);
        break;
      case "图片":
        component=(
          <ImageML
            region={this.props.region}
            dropML={this.props.dropML}
            authorID={this.props.authorID}
            authorName={this.props.authorName}
            dropAnnotation={this.props.dropAnnotation}
            navigator={this.props.navigator}
            />);
        break;
      case "声音":
        component=(
          <AudioML
            region={this.props.region}
            dropML={this.props.dropML}
            authorID={this.props.authorID}
            authorName={this.props.authorName}
            dropAnnotation={this.props.dropAnnotation}
            navigator={this.props.navigator} 
            />);
        break;
      case "视频":
        // component=<VideoBox navigator={this.props.navigator} />;
        break;
      default:
        break;
    }
    this.props.navigator.push({
      id: 'nav',
      nav: component,
    });
  }
  _dropText(){
    this._drop("文字")
  }
  _dropImage(){
    this._drop("图片")
  }
  _dropVideo(){
    this._drop("视频")
  }
  _dropAudio(){
    this._drop("声音")
  }
};

ExploreLayout.propTypes = {
  dropML: PropTypes.func.isRequired,
  authorID: PropTypes.string,
  navigator: PropTypes.any.isRequired,
}

const styles = StyleSheet.create({
  textModalContainer:{
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "yellow",
  },
  modalContainer:{
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  postButtons:{
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'flex-end',
    flexDirection: 'column',
    width: width,
    position: 'absolute',
    top: height-190,
  },
  postItem:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkslateblue',
    flexDirection: 'row',
    paddingTop: 11,
    paddingBottom: 11,
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  postText:{
    fontSize: 19,
    color: 'white',
    marginLeft: 0,
  },
  postIcon:{
    marginRight: 10,
  },
  cancelPost:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    flexDirection: 'row',
    paddingTop: 11,
    paddingBottom: 11,
    marginTop: 5,
  },
  container:{
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  operateContainer:{
    flexDirection: 'column',
    position: 'absolute',
    top: height*0.13,
    left: width*0.8,
    backgroundColor: 'transparent',
  },
  operate:{
    backgroundColor:'darkblue',
    borderRadius: 0,
    paddingTop: 3,
    borderWidth: 0.5,
    borderColor: 'white',
  }
});
