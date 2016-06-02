/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  PushNotificationIOS,
  ImageStore,
  AsyncStorage,
  Image,
  TouchableOpacity
} from 'react-native';
import React,{Component,PropTypes} from 'react'

import { Provider } from 'react-redux'
import App from './containers/App'
import { FAKE_STATE,EMPTY_STATE } from './constants/Configure'
import { store } from './store/Store'

console.dis
ableYellowBox=true

class Sentinel extends Component {
  renderScene(route, navigator) {
    if (route.id == 'tab-bar') {
      return <App navigator={navigator} />;
    } else {
       return route.nav; 
    }
  }
  componentDidMount() {
    
  }
  
  render() {
    return (
      <Provider store={store}>
        <Navigator
          ref="navigator"
          renderScene={this.renderScene}
          initialRoute={{id: 'tab-bar'}}
        />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d35400',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  spinner: {
    marginBottom: 50
  },

  btn: {
    marginTop: 20
  },

  text: {
    color: "white"
  }
});

AppRegistry.registerComponent('Sentinel', () => Sentinel);
