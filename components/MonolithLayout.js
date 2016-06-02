'use strict'

import {
  SegmentedControlIOS,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  NavigatorIOS,
  ListView,
  Dimensions
} from 'react-native';
import React,{Component,PropTypes} from 'react'

import MLCell from './MLCell';
import { Header } from './Widget'
const {height, width} = Dimensions.get('window')
let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class MonolithLayout extends Component{
  constructor(props){
    super(props);
    this.displayName="monoliths";
    this.state = {
      selectedIndex: 0
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Header title={""} back={""} />
        <ListView
          dataSource={ds.cloneWithRows(this.props.monoliths.filter((item) => {
            if (this.state.selectedIndex==0) {
              return (item.droped === false && !item.deleted)
            }else {
              return (item.droped === true && !item.deleted)
            }
          }).sort((a,b) => {
            if (a.commented) {
              return (a.droped?a.birthday<b.birthday:a.deathday<b.deathday) || true
            }else {
              return (a.droped?a.birthday<b.birthday:a.deathday<b.deathday) || false
            }
          }).reverse())}
          renderRow={this._renderRow.bind(this)}
          enableEmptySections={true}
          contentContainerStyle={styles.boxContainer}
          style={styles.mlList}
        />
        <SegmentedControlIOS
          values={['捡到的', '丢出的']}
          selectedIndex={this.state.selectedIndex}
          onChange={this._onChange.bind(this)}
          style={styles.segment}
          tintColor="white"
        />
      </View>
    );
  }
  _onChange(event) {
    this.setState({
      selectedIndex: event.nativeEvent.selectedSegmentIndex
    })
  }
  _renderRow(rowData, sectionID, rowID, highlightRow){
    let row = null;
    if (rowData != undefined) {
      row = (
        <MLCell
          parent={"monolith"}
          ml={rowData}
          navigator={this.props.navigator}
          />
        );
    }
    return row;
  }
};

MonolithLayout.propTypes = {
  monoliths: PropTypes.array.isRequired,
  listDropML: PropTypes.func.isRequired,
  listPickML: PropTypes.func.isRequired,
  deleteML: PropTypes.func.isRequired,
  favourML: PropTypes.func.isRequired,
  commentML: PropTypes.func.isRequired,
  navigator: PropTypes.any.isRequired,
}

const styles = StyleSheet.create({
  container: {
    top: 0,
    alignItems: 'center',
  },
  segment: {
    width: width*0.7,
    margin: -35,
    backgroundColor: "darkslateblue",
    borderRadius: 5,
  },
  boxContainer:{
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  mlList:{
    position:'absolute',
    width: width-20,
    height: height*0.9,
    backgroundColor: '#F0F0F0',
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 0,
    borderRadius: 5,
    // top: -height*0.01,
  },
});
