'use strict'

import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TabBarIOS,
  AsyncStorage,
  PushNotificationIOS
} from 'react-native';

import React,{Component,PropTypes} from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as TabPageActions from '../actions/TabPageActions'
import * as MAA from '../actions/ModifyAccountActions'
import * as OMA from '../actions/OperateMonolithActions'
import * as CAA from '../actions/CacheApeActions'
import * as FRA from '../actions/FriendRequestActions'
import * as CA from '../actions/ChatActions'
import * as RA from '../actions/RegionActions'
import * as AA from '../actions/AnnotationActions'
import * as TPA from '../actions/TabPageActions'

import Icon from  'react-native-vector-icons/MaterialIcons'
import Explore from './Explore'
import Monolith from './Monolith'
import Account from './Account';
import Social from './Social';

class App extends Component {
  componentWillMount(){
    PushNotificationIOS.setApplicationIconBadgeNumber(0)
    AsyncStorage.getItem('state', (err, result) => {
      if (err) {

      }
      if (result!=null) {
        const state = JSON.parse(result)
        this.props.replaceAccount(state.account==undefined?{}:state.account)
        this.props.replaceCacheApe(state.cacheApe.length==undefined?[]:state.cacheApe)
        this.props.replaceMonoliths(state.monoliths.length==undefined?[]:state.monoliths)
        this.props.replaceFR([])//state.friendRequest.length==undefined?[]:state.friendRequest
        this.props.replaceChats(state.chats.length==undefined?[]:state.chats)
        // this.props.followRegion(state.region)
        const ac = this.props.account
        if (ac._id != undefined) {
          this.props.identifyAccount(ac._id,ac.name)
        }
      }
    });
  }
  _renderContent(category, title) {
    let content=null;
    let route={
      title: title,
      color:"white",
      passProps: {filter: category},
    };
    switch (category) {
      case "explore":
      {
        content = <Explore navigator={this.props.navigator} />;
      }
        break;
      case "monolith":
      {
        content = <Monolith navigator={this.props.navigator} />;
      }
        break;
      case "account":
      {
        content = <Account navigator={this.props.navigator} />;
      }
        break;
      case "social":
      {
        content = <Social navigator={this.props.navigator} />;
      }
        break;
      default:
        break;
    }
    return content;
  }
  render() {
    const { badge } = this.props
    return (
      <TabBarIOS
        tintColor="white"
        barTintColor="black"
        style={styles.tabBar}>
        <Icon.TabBarItem
          title="探索"
          badge={badge.explore==0?null:badge.explore}
          iconName="explore"
          selectedIconName="explore"
          selected={badge.selectedTab === "explore"}
          onPress={() => {
            this.props.tabExplore()
          }}>
          {this._renderContent("explore", "探索")}
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="前哨"
          badge={badge.monolith==0?null:badge.monolith}
          iconName="extension"
          selectedIconName="extension"
          selected={badge.selectedTab === "monolith"}
          onPress={() => {
            this.props.tabMonolith()
          }}>
          {this._renderContent("monolith", "前哨")}
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="聊天"
          badge={badge.social==0?null:badge.social}
          iconName="message"
          selectedIconName="message"
          selected={badge.selectedTab === "social"}
          onPress={() => {
            this.props.tabSocial()
          }}>
          {this._renderContent("social", "聊天")}
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="我"
          iconName="account-box"
          selectedIconName="account-box"
          selected={badge.selectedTab === "account"}
          badge={badge.account==0?null:badge.account}
          onPress={() => {
            this.props.tabAccount()
          }}>
          {this._renderContent("account", "我")}
        </Icon.TabBarItem>
      </TabBarIOS>
    );
  }

};

const styles = StyleSheet.create({
  tabBar:{
    height: 0,
  },
  wrapper:{
    flex: 1,
  },
});

App.propTypes = {
  badge: PropTypes.object.isRequired,
  tabExplore: PropTypes.func.isRequired,
  tabMonolith: PropTypes.func.isRequired,
  tabSocial: PropTypes.func.isRequired,
  tabAccount: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    badge: state.badge,
    account: state.account,
    friendRequest: state.friendRequest,
    monoliths: state.monoliths,
    chats: state.chats
  }
}

function mapDispatchToProps(dispatch) {
  return {
    identifyAccount: bindActionCreators(MAA.identifyAccount,dispatch),
    tabAccount: bindActionCreators(TabPageActions.tabAccount, dispatch),
    tabMonolith: bindActionCreators(TabPageActions.tabMonolith, dispatch),
    tabExplore: bindActionCreators(TabPageActions.tabExplore, dispatch),
    tabSocial: bindActionCreators(TabPageActions.tabSocial, dispatch),
    followRegion:bindActionCreators(RA.followRegion,dispatch),
    replaceChats:bindActionCreators(CA.replaceChats,dispatch),
    replaceFR:bindActionCreators(FRA.replaceFR,dispatch),
    replaceMonoliths:bindActionCreators(OMA.replaceMonoliths,dispatch),
    replaceCacheApe:bindActionCreators(CAA.replaceCacheApe,dispatch),
    replaceAccount:bindActionCreators(MAA.replaceAccount,dispatch),
    setAccountBadge: bindActionCreators(TPA.setAccountBadge,dispatch),
    setExploreBadge: bindActionCreators(TPA.setExploreBadge,dispatch),
    setMonolithBadge: bindActionCreators(TPA.setMonolithBadge,dispatch),
    setSocialBadge: bindActionCreators(TPA.setSocialBadge,dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
