'use strict'

import {
  
} from 'react-native';
import React,{Component,PropTypes} from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AnnotationActions from '../actions/AnnotationActions'
import * as OperateMonolithActions from '../actions/OperateMonolithActions'
import * as CacheApeActions from '../actions/CacheApeActions'
import * as RegionActions from '../actions/RegionActions'

import MapleLayout from '../components/MapleLayout'

class Maple extends Component{
  isApeCached(_id){
    const len = this.props.cacheApe.filter((item) => {
      return item._id===_id
    }).length
    if (len==0) {
      this.props.fetchApeToCache(_id)
    }
  }
  render(){
    return (
      <MapleLayout
        filterText={this.props.filterText}
        filterImage={this.props.filterImage}
        filterAudio={this.props.filterAudio}
        annotations={this.props.annotations}
        account={this.props.account}
        pickML={this.props.pickML}
        region={this.props.region}
        followRegion={this.props.followRegion}
        fetchAnnotations={this.props.fetchAnnotations}
        isApeCached={this.isApeCached.bind(this)}
        navigator={this.props.navigator}
        >
      </MapleLayout>
    )
  }
}

Maple.propTypes = {
  filterText: PropTypes.bool.isRequired,
  filterImage: PropTypes.bool.isRequired,
  annotations: PropTypes.array.isRequired,
  pickML: PropTypes.func.isRequired,
  followRegion: PropTypes.func.isRequired,
  navigator: PropTypes.any.isRequired,
  account: PropTypes.object.isRequired,
  fetchAnnotations: PropTypes.func.isRequired,
  region: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    annotations: state.annotations,
    monoliths: state.monoliths,
    region: state.region,
    account: state.account,
    cacheApe: state.cacheApe
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pickML:bindActionCreators(OperateMonolithActions.pickML, dispatch),
    followRegion:bindActionCreators(RegionActions.followRegion,dispatch),
    fetchAnnotations:bindActionCreators(AnnotationActions.fetchAnnotations,dispatch),
    fetchApeToCache:bindActionCreators(CacheApeActions.fetchApeToCache,dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Maple)
