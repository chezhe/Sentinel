'use strict'

import {
  
} from 'react-native';
import React,{Component,PropTypes} from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as OperateMonolithActions from '../actions/OperateMonolithActions'
import MonolithLayout from '../components/MonolithLayout'

class Monolith extends Component{
  render(){
    return (
      <MonolithLayout
        monoliths={this.props.monoliths}
        listDropML={this.props.listDropML}
        listPickML={this.props.listPickML}
        deleteML={this.props.deleteML}
        favourML={this.props.favourML}
        commentML={this.props.commentML}
        navigator={this.props.navigator}
        >
      </MonolithLayout>
    )
  }
}
Monolith.propTypes = {
  monoliths: PropTypes.array.isRequired,
  listDropML: PropTypes.func.isRequired,
  listPickML: PropTypes.func.isRequired,
  deleteML: PropTypes.func.isRequired,
  favourML: PropTypes.func.isRequired,
  commentML: PropTypes.func.isRequired,
  navigator: PropTypes.any.isRequired,
}

function mapStateToProps(state) {
  return {
    monoliths: state.monoliths
  }
}

function mapDispatchToProps(dispatch) {
  return {
    listDropML:bindActionCreators(OperateMonolithActions.listDropML, dispatch),
    listPickML:bindActionCreators(OperateMonolithActions.listPickML, dispatch),
    favourML:bindActionCreators(OperateMonolithActions.favourML, dispatch),
    commentML:bindActionCreators(OperateMonolithActions.commentML, dispatch),
    deleteML:bindActionCreators(OperateMonolithActions.deleteML, dispatch),
    // actions: bindActionCreators(OperateMonolithActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Monolith)
