'use strict'

import {

} from 'react-native';
import React,{Component,PropTypes} from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as OperateMonolithActions from '../actions/OperateMonolithActions'
import MLDetailLayout from '../components/MLDetailLayout'

class MLDetail extends Component{
  componentDidMount(){
    const { ml,viewML } = this.props
    viewML(ml._id)
  }
  componentWillUnmount(){
    const { ml,viewML } = this.props
    viewML(ml._id)
  }
  render(){
    return (
      <MLDetailLayout
        ml={this.props.ml}
        cacheApe={this.props.cacheApe}
        account={this.props.account}
        parent={this.props.parent}
        deleteML={this.props.deleteML}
        favourML={this.props.favourML}
        commentML={this.props.commentML}
        navigator={this.props.navigator}
        >
      </MLDetailLayout>
    )
  }
}

MLDetail.propTypes = {
  deleteML: PropTypes.func.isRequired,
  favourML: PropTypes.func.isRequired,
  commentML: PropTypes.func.isRequired,
  ml: PropTypes.object.isRequired,
  cacheApe: PropTypes.array.isRequired,
  account: PropTypes.object.isRequired,
  parent: PropTypes.string.isRequired,
  navigator: PropTypes.any.isRequired,
}

function mapStateToProps(state,target) {
  return {
    ml: state.monoliths.filter((item) => {
      return item._id=== target.mlID
    })[0],
    cacheApe: state.cacheApe,
    account: state.account
  }
}

function mapDispatchToProps(dispatch) {
  return {
    favourML:bindActionCreators(OperateMonolithActions.favourML, dispatch),
    commentML:bindActionCreators(OperateMonolithActions.commentML, dispatch),
    deleteML:bindActionCreators(OperateMonolithActions.deleteML, dispatch),
    viewML:bindActionCreators(OperateMonolithActions.viewML, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MLDetail)
