import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import { FAKE_STATE,EMPTY_STATE } from '../constants/Configure'
import React, {
  AsyncStorage
} from 'react-native';

export const store = createStore(
  rootReducer,
  EMPTY_STATE,
  applyMiddleware(thunk)
)
store.subscribe(() => {
  const state = store.getState()
  save(state)
  console.log(state);
})

let saved = true
function save(state){
  // const state = store.getState()
  if (saved) {
    saved = false
    AsyncStorage.setItem("state",JSON.stringify(state),(err) => {
      if (err) {
        throw err
      }
      saved = true
    })
  }
}
