'use strict'

import {
  AppStateIOS,
} from 'react-native'

import './UserAgent'
import socket from 'socket.io-client/socket.io'
import RNFS from 'react-native-fs'

import { SOCKET_IP } from '../constants/Configure'
import { Alarm } from '../components/Widget'
import { store } from './Store'
let open=false,lastNotOpen = new Date()
let status = "connecting"

const io = socket(SOCKET_IP,{
  jsonp: false,
  transports: ['websocket']
})

io.on('connect', function(data){
  open = true;
  status = "connected"
  const {account} = store.getState()
  if (account._id != undefined) {
    io.emit('identify',{
      id: account._id,
      name: account.name
    })
  }
  // Alarm("连接！","YES",null)
});
io.on('disconnect', (e) => {
  open = false;
  status = "disconnected"
  // Alarm("断开连接！","YES",null)
});
io.on('error',(e) => {
  status = "error"
});
io.on('reconnect', () => {
  status = "reconnecting"
})
io.on('reconnect', () => {
  status = "reconnecting"
})


AppStateIOS.addEventListener('change',() => {
  switch (AppStateIOS.currentState) {
    case "inactive":
      io.disconnect()
      break;
    case "active":
      io.connect()
      break;
    default:

  }
})

//检查网络是否断开
function checkOpen(){
  if (!open) {
    if ((new Date()).getTime() - lastNotOpen.getTime() > 1000*10) {
      lastNotOpen = new Date();
      Alarm("网络连接已断开","重试",() => {
        io.connect();
      })
    }else {

    }
    return false;
  }
  return true;
}

//检查操作是否正常
function checkCode(code,msg){
  if (code == 0) {
    return true;
  }
  return false;
}

module.exports = {
  io: io,
  checkCode: checkCode,
  checkOpen: checkOpen
}
