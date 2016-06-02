'use strict'

import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  View,
  Text,
  Alert,
  AlertIOS,
  Image
} from 'react-native';
import React,{Component,PropTypes} from 'react'
import { Alarm } from '../components/Widget'
import MapView from 'react-native-maps';
import MLDetail from '../containers/MLDetail';
const { width, height } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/MaterialIcons';
import {longitudeDelta,latitudeDelta} from '../constants/Configure'

export default class MapleLayout extends Component{
  constructor(props){
    super(props);
    this.displayName="maple";
    this.state = {
      mlIcon: require('image!bulb-a'),
      selfMlIcon: require('image!bulb-b'),
      markers: []
    }
  }
  componentWillMount(){
    Icon.getImageSource('lightbulb-outline', 41, 'black')
    .then((source) => {
      console.log(source);
      this.setState({ mlIcon: source })     
    });
    Icon.getImageSource('lightbulb-outline', 41, 'red')
    .then((source) =>
      this.setState({ selfMlIcon: source })
    );
  }
  
  render(){
    console.log("-__________________-");
    console.log(this.props.region);
    return (
      <View>
        <MapView.Animated
          style={ styles.maple }
          showsUserLocation={true}
          followsUserLocation={true}
          region={this.props.region}
          showsCompass={true}
          showScale={false}
          zoomEnabled={false}
          rotateEnabled={false}
          scrollEnabled={false}
          onRegionChange={(region) => {
            this.props.followRegion(region)
          }}
          onRegionChangeComplete={this._onRegionChangeComplete.bind(this)}
          >
          {this.state.markers}          
        </MapView.Animated>
      </View>
    );
  }
  componentWillReceiveProps(props){
    console.log("//////////////////////");
    if (this.state.markers.length != props.annotations.length) {
      this._loadAnnotations()
    }
  }
  _onRegionChangeComplete(){
    // this.props.followRegion(region)
    const {fetchAnnotations,region,account} = this.props
    fetchAnnotations(region,account._id)
    
    function fa(){
      this.props.fetchAnnotations(this.props.region,this.props.account._id)
    }
    // fa.bind(this)()
    setInterval(fa.bind(this),1000*60)
  }
  _loadAnnotations(){
    const {
      annotations,
      account,
      filterText,
      filterImage,
      filterAudio,
      isApeCached,
      navigator,
      pickML
    } = this.props
    console.log(annotations);
    const markers = annotations.map((ml,idx) => {
      const filtered=!((!filterText && ml.media=="text")||(!filterImage && ml.media=="image")||(!filterAudio&&ml.media=="audio"));
      if (!filtered) {
        return null
      }
      const isSelf = ml.authorID==account._id
      return (
        <MapView.Marker
         key={idx}
         onCalloutPress={() => {
           if (isSelf) {
             Alarm("这是你自己丢的","好吧",null)
           }else {
             pickML(Object.assign({},ml,{
               droped: false,
               readerName: account.name,
               readerID: account._id,
               deathday: Date.now(),
             }))
             isApeCached(ml.authorID)
             navigator.push({
               id: 'nav',
               nav: (
                 <MLDetail
                   parent={"explore"}
                   mlID={ml._id}
                   fid={ml.authorID}
                   badge={0}
                   navigator={navigator}
                   />
               ),
             });
           }
         }}
         coordinate={{
           longitude: ml.longitude,
           latitude: ml.latitude
         }}>
         <Image source={isSelf?this.state.selfMlIcon:this.state.mlIcon} style={{width:50,height:50}} />
          <MapView.Callout>
            <View>
              <Text>{ml.authorName}</Text>
            </View>
          </MapView.Callout>
        </MapView.Marker>
      );
    });
    this.setState({markers: markers})
  }
}

MapleLayout.propTypes = {
  filterText: PropTypes.bool.isRequired,
  filterImage: PropTypes.bool.isRequired,
  annotations: PropTypes.array.isRequired,
  pickML: PropTypes.func.isRequired,
  navigator: PropTypes.any.isRequired,
}

const styles = StyleSheet.create({
  maple: {
    flex: 1,
    height: height,//560
    margin: 0,
    borderWidth: 0,
    borderColor: '#000000',
  },
});
