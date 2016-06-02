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

import EvilIcon from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImageViewer from './ImageViewer';
import ApePage from '../containers/ApePage';
import MLReport from './MLReport'
import { DefaultAvatar,IP } from '../constants/Configure'
import { defaultApe } from '../constants/DefaultValue'
import { Header } from './Widget'
import RNFS from 'react-native-fs'
import Spinner from 'react-native-spinkit'
import Sound from 'react-native-sound'
import { AnimatedCircularProgress } from 'react-native-circular-progress'

const {height, width} = Dimensions.get('window')
let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const InitialInputHeight = 31;
const InitialInputTop = height-InitialInputHeight-10;
const FocusInputTop = height*0.5;

export default class MLDetailLayout extends Component{
  constructor(props){
    super(props);
    this.state = {
      inputWrapTop: InitialInputTop,
      inputHeight: InitialInputHeight,
      comment: "",
      commentInputVisible: false,
      posting: false,
      opModalVisible: false,
      audio: null,
      isPlaying: false,
      contentLoaded: false,
      progress: 0,
      duration: 1,
      ticker: -1
    };
  }
  componentWillUnmount(){
    if (this.state.audio!=null) {
      this.state.audio.release()
    }
  }
  componentWillMount(){
    const {ml} = this.props
    if (ml.media == "text") {
      this.setState({
        contentLoaded:true
      })
    }else{
      let path = RNFS.DocumentDirectoryPath+'/'+ml.content.cxt.uri
      RNFS.exists(path)
        .then((exist)=>{
          if (exist) {
            if (ml.media == "audio") {
              this._preloadAudio(ml)
            }
            this.setState({
              contentLoaded:true
            })
          }else{
            this._download(path,ml,ml.content.cxt.uri)          
          }
        })
        .catch((err)=>{
           throw err
        })
    }
  }
  _preloadAudio(ml){
      const uri = ml.content.cxt.uri
      var whoosh = new Sound(uri, RNFS.DocumentDirectoryPath, (error) => {
        if (error) {
          
        } else {
          this.setState({duration:whoosh.getDuration()})
        }
      });
      this.setState({audio:whoosh})
  }
  _play(){
    const audio = this.state.audio
    if (audio!=null) {
      this.setState({isPlaying:!this.state.isPlaying})
      audio.getCurrentTime((seconds,isPlaying)=>{
        if (isPlaying) {
          audio.stop()                      
        }else{
          audio.play()
          let ticker = setInterval(this._countTime.bind(this),20)
          this.setState({ticker:ticker})
        }
      })
    }
  }
  _countTime(){
    const audio = this.state.audio
    if(audio!=null){
      audio.getCurrentTime((seconds, isPlaying)=>{
        let progress = seconds / this.state.duration
        if (!isPlaying && progress == 0) {
          clearInterval(this.state.ticker)
          this.setState({ticker:-1})
        }
        this.setState({progress:progress,isPlaying:isPlaying})
      })
    }
  }
  _download(path,ml,file_name){
    let dir = ""
    if(ml.media=="image"){
      dir = "imageLib"
    }else{
      dir = "audioLib"
    }
    const url = IP+dir+"/"+file_name
    console.log(url);
    const begin = (jobId) => {
      
    }
    const progress = (data) => {
      console.log(data);
      if (data.bytesWritten==data.contentLength) {
        if (ml.media == "audio") {
          this._preloadAudio(ml)
        }
        this.setState({
          contentLoaded:true
        })
      }
    }
    RNFS.downloadFile(url,path,begin,progress)
        .then((v)=>{
          
        }).catch((err)=>{          
          throw err
        })
  }
  _getContent(){
    let content = null
    const { ml,navigator } = this.props
    
    switch (ml.media) {
      case "text":
      {
        content = (<Text style={styles.text}>
          {ml.content.cxt}
          </Text>)
      }
        break;
      case "image":
      {
        const uri = RNFS.DocumentDirectoryPath+'/'+ml.content.cxt.uri
        content = (
          <TouchableOpacity
            onPress={() => {
                navigator.push({
                  id: 'nav',
                  nav: (
                    <ImageViewer
                      content={{uri: uri,size:ml.content.size}}
                      size={ml.content.size}
                      navigator={navigator}
                      />
                    ),
                });
              }}
              >
              <Image
                source={{uri:uri}}
                style={[styles.image,{width: 200, height: 200}]}
                />
            </TouchableOpacity>
            );        
      }
        break;
      case "audio":
      {
        content = (
          <View style={{'marginTop':20,'marginBottom':20}}>            
            <TouchableOpacity onPress={()=>{
                this._play()
              }}>
                <AnimatedCircularProgress
                  size={200}
                  width={5}
                  fill={this.state.progress*100}
                  tintColor="#00e0ff"
                  backgroundColor="#3d5875" >
                  {
                    (fill) => (
                      <Text style={styles.points}>
                        { this.state.isPlaying?"暂停":"播放" }
                      </Text>
                    )
                  }
                </AnimatedCircularProgress>
            </TouchableOpacity>            
          </View>
        )
      }
        break;
      default:
        break;
    }
    return content
  }
  render(){
    const {ml,navigator} = this.props
    const commentable = (!ml.droped || (ml.droped&&ml.comments.length!=0));
    let content = null
    if (this.state.contentLoaded) {
      content = this._getContent()
    }else{
      content = (<Spinner style={styles.spinner} isVisible={true} size={100} type={ml.media=="image"?'9CubeGrid':'Wave'} color={"#FF0000"}/>)
    }
    let droped = ml.droped;
    let cmt=null;
    if (this.state.commentInputVisible) {
      cmt =(
        <View
        style={[styles.inputWrap,{top:this.state.inputWrapTop}]}>
          <TextInput
            style={[styles.input,,{height: this.state.inputHeight}]}
            onChangeText={(text) => {
              if (!this.state.posting) {
                this.setState({comment:text});
              }
            }}
            value={this.state.comment}
            multiline={true}
            placeholder={""}
            autoFocus={true}
            keyboardAppearance={'default'}
            returnKeyType={'send'}
            blurOnSubmit={true}
            onFocus={(e) => {
              this.setState({inputWrapTop:this.state.inputWrapTop-FocusInputTop});
            }}
            onBlur={(e) => {
              this.setState({inputWrapTop:this.state.inputWrapTop+FocusInputTop});
            }}
            onKeyPress={(e) => {
              if (e.nativeEvent.key == "Enter") {
                this.setState({posting:true});
                this._postComment();
              }
            }}
          />
      </View>);
    }

    return (
      <View style={styles.container}>
        <Header title={""} back={"前哨"} backF={()=>{
          navigator.pop();
        }} forward={"dashboard"} forwardF={()=>{
          this.setState({opModalVisible:true});
        }}/>
        <Modal
          animated={true}
          transparent={true}
          style={styles.modal}
          visible={this.state.opModalVisible}
          >
          <View style={[styles.modalContainer, {backgroundColor: 'rgba(0, 0, 0, 0.5)'}]}>
            <View style={styles.postButtons}>
              {commentable?this._renderItem('comment',"评论",this._comment):null}
              {this._renderItem('location',"地点",this._locate)}
              {this._renderItem('heart',"收藏",this._favour)}
              {this._renderItem('trash',"删除",this._delete)}
              {this._renderItem('exclamation',"举报",this._report)}
              <TouchableOpacity onPress={this._cancel.bind(this)}>
                <View style={styles.cancelPost}>
                  <Text style={styles.postText}>取消</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View>
          <ScrollView
            style={styles.wrap}
            showsVerticalScrollIndicator={true}
            automaticallyAdjustContentInsets={true}
            showsVerticalScrollIndicator={true}
            directionalLockEnabled={true}
            contentContainerStyle={styles.containerWrap}>
            {content}            
            <ListView
              dataSource={ds.cloneWithRows(ml.comments)}
              renderRow={this._renderComments.bind(this)}
              enableEmptySections={true}
              contentContainerStyle={styles.mlContainer}
              style={styles.commentList}
            />
          </ScrollView>
        </View>
        {cmt}
      </View>);
  }
  _renderItem(icon,key,func){
    let color = 'white'
    if (key === "收藏" && this.props.ml.favoured) {
      color = 'red'
    }
    return (
      <TouchableOpacity onPress={ func.bind(this) }>
        <View style={styles.postItem}>
          <EvilIcon name={icon} size={31} color={color} style={styles.postIcon} />
          <Text style={styles.postText}>{key}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  _favour(){
    const {ml,account,favourML} = this.props
    favourML(ml._id,!ml.favoured,account._id,ml.authorID)
    this.setState({opModalVisible:false})
  }
  _delete(){
    const {ml,account,deleteML,navigator} = this.props
    deleteML(account._id,ml._id,account._id===ml.authorID)
    this.setState({opModalVisible:false});
    navigator.pop();
  }
  _report(){
    const {ml,account,navigator} = this.props
    this.setState({opModalVisible:false});
    navigator.push({
      id: 'nav',
      nav: <MLReport
            reporterID={account._id}
            mlID={ml._id}
            navigator={navigator}
            />,
    });
  }
  _comment(){
    this.setState({commentInputVisible: true,opModalVisible:false});
  }
  _cancel(){
    this.setState({opModalVisible:false});
  }
  _locate(){
    this.setState({opModalVisible:false});
    const {navigator,ml} = this.props
    const region = {
      longitude: ml.longitude,
      latitude: ml.latitude,
      longitudeDelta: 0.003886888840327174,
      latitudeDelta: 0.004229206103033789
    };
    navigator.push({
      id: 'nav',
      nav: <MLLocate
            region={region}
            navigator={navigator}
            />,
    });
  }
  _getApe(id){
    const {cacheApe,ml,account} = this.props
    if (account._id === id) {
      return account
    }else {
      const the_one = cacheApe.filter((item) => {
        return item._id===id
      })[0]
      if (the_one==undefined) {
        the_one = defaultApe()
      }
      return the_one
    }
  }
  _renderComments(rd, sectionID, rowID, highlightRow){
    const commenter = this._getApe(rd.commenterID)
    const {account} = this.props
    return (
      <TouchableOpacity onPress={(e)=>{
        if (rd.commenterID!=account._id) {
          this._comment();
        }}}>
        <View style={styles.commentItem}>
          <TouchableOpacity onPress={(e) => {
            this._navApeInfo(commenter);}}>
            <Image
              source={commenter.avatar}
              style={styles.avatar}
              />
          </TouchableOpacity>
          <View style={styles.commentInfo}>
            <Text style={styles.commenter}>{commenter.name}</Text>
            <Text style={styles.content}>{rd.content}</Text>
          </View>
        </View>
        </TouchableOpacity>
    );
  }
  _navApeInfo(commenter){
    const {navigator,ml} = this.props
    navigator.push({
        id: 'nav',
        nav: (
          <ApePage
            ape={commenter}
            mlID={ml._id}
            navigator={navigator}
            />
          ),
    })
  }
  _postComment(){
    const {ml,account,commentML} = this.props
    commentML({
      _id: ml._id,
      comment: {
        commenterID: account._id,
        content: this.state.comment
      },
      toID: ml.droped?ml.readerID:ml.authorID,
      commenterName: account.name
    })
    this.setState({
      comment:"",
      inputWrapTop: InitialInputTop,
      commentInputVisible: false,
      commentHeight: InitialInputHeight,
      posting: false,
    });
  }
};

class MLLocate extends Component {
  constructor(props){
    super(props);
    this.state = {
      annotations:[],
      hereIcon:require('image!ml'),
    }
  }
  componentWillMount(){
    Icon.getImageSource('delete', 37, 'black').then((source) => {
      this.setState({ hereIcon: source });
      this._loadAnnotations();
    });
  }
  _loadAnnotations(){
    const {region} = this.props
    let anno = {
      longitude: region.longitude,
      latitude: region.latitude,
      title: "",
      image: this.state.hereIcon,
    }
    this.setState({annotations:[anno]});
  }
  render(){
    return (
      <View>
        <Header title={""} back={"前哨"} backF={()=>{
          this.props.navigator.pop();
        }}/>
        <MapView
          style={styles.maple}
          region={this.props.region}
          showsCompass={true}
          annotations={this.state.annotations}
          zoomEnabled={false}
          scrollEnabled={false}
          rotateEnabled={false}
          />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'azure',
    height: height,
    width: width,
    alignItems: 'center',
  },
  wrap:{
    width: width,
    height: height,
    backgroundColor: 'moccasin'
  },
  containerWrap: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image:{
    marginTop: 15,
    marginBottom: 15,
  },
  text:{
    width: width*0.8,
    fontSize: 21,
    color:'black',
    marginTop: 15,
    marginBottom: 15,
  },
  block:{
    position:'absolute',
    top: height*0.78,
    left: width*0.3,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#545454',
    width: 120,
    height: 40,
    borderRadius: 5,
  },
  item:{
    flexDirection:'row',
  },
  input:{
    width: width*0.97,
    fontSize: 19,
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 5,
    paddingRight: 5,
    borderWidth: 0.5,
    borderRadius: 3,
    backgroundColor: 'white',
    marginLeft: width*0.015,
  },
  inputWrap:{
    width: width,
    height: InitialInputHeight+10,
    backgroundColor: 'moccasin',
    position: 'absolute',
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
  },
  commentItem:{
    flexDirection: 'row',
    marginTop: 2,
    marginBottom: 5,
    paddingBottom: 5,
    width: width*0.8,
    borderBottomWidth: 0.3,
    borderBottomColor: 'gray',
  },
  commentInfo:{
    flexDirection: 'column',
    left: 7,
    width: width,
    flex: 1,
  },
  avatar:{
    width: 37,
    height: 37,
    borderRadius: 3,
  },
  commenter:{
    color: 'darkblue',
    fontSize: 17,
    marginTop: -3,
  },
  content:{
    fontSize: 13,
    width: width*0.65,
    marginTop: 5,
  },
  reply:{
    color: 'blue',
    fontSize: 13,
    marginLeft: width*0.65,
    position: 'absolute',
    top: -13,
  },
  commentList:{
    position: 'absolute',
    left: width*0.07,
  },
  modalContainer:{
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column',
    width: width,
    height: height,
  },
  postButtons:{
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column',
    width: width,
  },
  postItem:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkslateblue',
    flexDirection: 'row',
    paddingTop: 7,
    paddingBottom: 7,
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
  maple:{
    flex: 1,
    height: height,//560
    margin: 0,
    borderWidth: 0,
    borderColor: '#000000',
  },
  spinner:{
    marginTop: 50
  },
  points: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 80,
    left: 56,
    width: 90,
    textAlign: 'center',
    color: '#7591af',
    fontSize: 45,
    fontWeight: "100"
  }
});
