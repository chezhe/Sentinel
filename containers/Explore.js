'use strict'

import {
  
} from 'react-native';
import React,{Component,PropTypes} from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as OperateMonolithActions from '../actions/OperateMonolithActions'
import * as AnnotationActions from '../actions/AnnotationActions'
import ExploreLayout from '../components/ExploreLayout'
import Intro from './Intro'

class Explore extends Component{
  render(){
    return (
      <ExploreLayout
        authorID={this.props.authorID}
        authorName={this.props.authorName}
        dropML={this.props.dropML}
        region={this.props.region}
        dropAnnotation={this.props.dropAnnotation}
        navigator={this.props.navigator}
        >
      </ExploreLayout>
    )
  }
}

Explore.propTypes = {
  dropML: PropTypes.func.isRequired,
  authorID: PropTypes.string,
  navigator: PropTypes.any.isRequired,
  region: PropTypes.object.isRequired,
  dropAnnotation: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    authorID: state.account._id,
    authorName: state.account.name,
    region: state.region
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dropML:bindActionCreators(OperateMonolithActions.dropML, dispatch),
    dropAnnotation: bindActionCreators(AnnotationActions.dropAnnotation,dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Explore)
