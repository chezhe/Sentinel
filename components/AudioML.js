'use strict';

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions
} from 'react-native'

import React,{ Component } from 'react'

import {
  AudioRecorder,
  AudioUtils
} from 'react-native-audio'
import { Header,Alarm } from './Widget'
import Sound from 'react-native-sound'
import RNFS from 'react-native-fs'
const {height, width} = Dimensions.get('window')

export default class AudioML extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentTime: 0.0,
      recording: false,
      stoppedRecording: false,
      stoppedPlaying: false,
      playing: false,
      finished: false,
      audioPath: ""
    } 
  }
  componentDidMount() {
    var audioPath = AudioUtils.DocumentDirectoryPath + '/tmp.caf';
    this.setState({audioPath:audioPath})
    AudioRecorder.prepareRecordingAtPath(audioPath);
    AudioRecorder.onProgress = (data) => {
      this.setState({currentTime: Math.floor(data.currentTime)});
    };
    AudioRecorder.onError = (error) =>{
      throw error
    }
    AudioRecorder.onFinished = (data) => {
      this.setState({finished: data.finished});
    };
  }

  _renderButton(title, onPress, active) {
    var style = (active) ? styles.activeButtonText : styles.buttonText;

    return (
      <TouchableHighlight onPress={onPress}>
        <View style={styles.button}>
          <Text style={style}>
            {title}
          </Text>
        </View>
      </TouchableHighlight>)
  }

  _pause() {
    if (this.state.recording)
      AudioRecorder.pauseRecording();
    else if (this.state.playing) {
      AudioRecorder.pausePlaying();
    }
  }

  _stop() {
    if (this.state.recording) {
      AudioRecorder.stopRecording();
      this.setState({stoppedRecording: true, recording: false});
    } else if (this.state.playing) {
      AudioRecorder.stopPlaying();
      this.setState({playing: false, stoppedPlaying: true});
    }
  }

  _record() {
    AudioRecorder.startRecording();
    this.setState({recording: true, playing: false});
  }

  _play() {
    if (this.state.recording) {
      this._stop();
      this.setState({recording: false});
    }
    AudioRecorder.playRecording();
    this.setState({playing: true});
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title={"音频"} back={"取消"} backF={()=>{
            this.props.navigator.pop()
          }} forward={"send"} forwardF={()=>{
            if (this.state.currentTime != 0.0) {
              if (this.state.recording) {
                AudioRecorder.stopRecording();
                this.setState({stoppedRecording: true, recording: false});
              }
              this._drop()
              this.props.navigator.pop()
            }else {
              Alarm("这里一直安静","好吧",null)
            }
          }} />
        <View style={styles.controls}>
          {this._renderButton("录制", () => {this._record()}, this.state.recording )}
          {this._renderButton("完成", () => {this._stop()} )}
          <Text style={styles.progressText}>{this.state.currentTime}s</Text>
        </View>
      </View>
    );
  }
  // {this._renderButton("PAUSE", () => {this._pause()} )}
  //         {this._renderButton("PLAY", () => {this._play()}, this.state.playing )}
          
  _drop(){
    this.props.dropML({
      media: "audio",
      content:{
        cxt: {uri:this.state.audioPath}
      }
    })
    this.props.dropAnnotation({
      media: "audio",
      content:{
        cxt: {uri:this.state.audioPath}
      },
      authorID: this.props.authorID,
      longitude: this.props.region.longitude,
      latitude: this.props.region.latitude
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2b608a",
  },
  controls: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  progressText: {
    paddingTop: 50,
    fontSize: 50,
    color: "#fff"
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width*0.3,
    height: width*0.3,
    borderRadius: width*0.15,
    borderWidth: 1,
    borderColor: 'white',
    marginTop: 10,
    marginBottom: 10
  },
  disabledButtonText: {
    color: '#eee'
  },
  buttonText: {
    fontSize: 20,
    color: "#fff"
  },
  activeButtonText: {
    fontSize: 20,
    color: "#B81F00"
  }

})