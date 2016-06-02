'use strict'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Dimensions
}  from 'react-native';
import React,{Component,PropTypes} from 'react'

const {height, width} = Dimensions.get('window');

import AlphabetListView from 'react-native-alphabetlistview';
import { DefaultAvatar } from '../constants/Configure'
import { ConvertPinyin } from '../constants/PinYin'
import ChatRoom from '../containers/ChatRoom';

class SectionHeader extends Component {
  render() {
    return (
      <View style={styles.viewStyle}>
        <Text style={styles.textStyle}>{this.props.title}</Text>
      </View>
    );
  }
}

class SectionItem extends Component {
  render() {
    let letter=this.props.title;
    let extra={};
    switch (letter) {
      case "A":
        // extra={borderRadius:5};
        break;
      case "Z":
        extra={height:25};
        break;
      default:

    }
    return (
      <Text style={[styles.letter,extra]}>{letter}</Text>
    );
  }
}
class Cell extends Component {
  _getApe(id){
    return this.props.cacheApe.filter((item) => {
      return item._id === id
    })[0]
  }
  render() {
    const ape = this._getApe(this.props.item);
    return (
      <TouchableHighlight onPress={(e)=>{
        let parent = this.props.parent;
        parent.props.navigator.push({
          id:'nav',
          nav: (<ChatRoom
                  fid={ape._id}
                  prev={parent.props.parent}
                  badge={0}
                  navigator={parent.props.navigator}
                  />),
        });
      }}>
        <View style={styles.cell}>
          <Image
            source={ape.avatar}
            style={styles.avatar}
            />
          <Text style={styles.name}>{ape.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

Cell.propTypes = {
  cacheApe: PropTypes.array.isRequired,
  parent: PropTypes.any.isRequired,
  account: PropTypes.object.isRequired
}

export default class Alphabet extends Component {
  constructor(props, context) {
    super(props, context);
    let data = {
      A: [],
      B: [],
      C: [],
      D: [],
      E: [],
      F: [],
      G: [],
      H: [],
      I: [],
      J: [],
      K: [],
      L: [],
      M: [],
      N: [],
      O: [],
      P: [],
      Q: [],
      R: [],
      S: [],
      T: [],
      U: [],
      V: [],
      W: [],
      X: [],
      Y: [],
      Z: [],
    };
    const flist = this.props.friendList;
    for (let i = 0; i < flist.length; i++) {
      if (flist[i]!=null) {
        let ape = this._getApe(flist[i]);
        let al = ConvertPinyin(ape.name).toUpperCase()[0];
        if (data[al]!=undefined) {
          data[al].push(flist[i]);
        }
      }
    }
    this.state = {
      data: data
    };
  }
  _getApe(id){
    return this.props.cacheApe.filter((item) => {
      return item._id === id
    })[0]
  }
  render() {
    return (
      <AlphabetListView
        data={this.state.data}
        cell={Cell}
        cellHeight={30}
        sectionListItem={SectionItem}
        sectionHeader={SectionHeader}
        sectionHeaderHeight={22.5}
        style={styles.alphabet}
        cellProps={{cacheApe:this.props.cacheApe,parent:this,account:this.props.account}}
      />
    );
  }
}

Alphabet.propTypes = {
  parent: PropTypes.any.isRequired,
  friendList: PropTypes.array.isRequired,
  cacheApe: PropTypes.array.isRequired,
  account: PropTypes.object.isRequired,
  navigator: PropTypes.any.isRequired,
}

const styles = StyleSheet.create({
  viewStyle:{
    backgroundColor: 'darkslateblue',
  },
  textStyle:{
    textAlign:'center',
    color:'#fff',
    fontWeight:'700',
    fontSize:21,
  },
  cell:{
    flexDirection:'row',
    height: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  avatar:{
    width: 37,
    height: 37,
    borderRadius: 3,
    marginLeft: 7,
  },
  name:{
    marginLeft: 10,
  },
  alphabet:{
    width: width-20,
    height: height*0.79,
    marginTop: 45,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  letter:{
    textAlign: 'center',
    width: 27,
    height: 17,
    paddingLeft: 2,
    paddingBottom: 5,
    paddingTop: 2,
    color:'white',
    backgroundColor: 'red',
  }
});
