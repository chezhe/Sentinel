'use strict'

import {
  
} from 'react-native';
import React,{Component,PropTypes} from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import IntroLayout from '../components/IntroLayout'

class Intro extends Component{
  render(){
    return (
      <IntroLayout>
      </IntroLayout>
    )
  }
}

Intro.propTypes = {

}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Intro)
