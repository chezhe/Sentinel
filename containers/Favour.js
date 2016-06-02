'use strict'

import {
  
} from 'react-native';
import React,{Component,PropTypes} from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as OperateMonolithActions from '../actions/OperateMonolithActions'
import FavourLayout from '../components/FavourLayout'

class Favour extends Component{
  render(){
    return (
      <FavourLayout
        navigator={this.props.navigator}
        monoliths={this.props.monoliths}
        >
      </FavourLayout>
    )
  }
}

Favour.propTypes = {
  monoliths: PropTypes.array.isRequired,
  navigator: PropTypes.any.isRequired
}

function mapStateToProps(state) {
  return {
    monoliths: state.monoliths.filter((item) => {
      if (item.favoured === true) {
        return item
      }
    })
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favour)
