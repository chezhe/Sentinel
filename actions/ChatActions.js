import {
  REP_CHATS,
  CHAT_TO,
  CHAT_DELETE,
  CHAT_FROM,
  CHAT_VIEW
} from '../constants/ActionTypes'
import { io, checkCode, checkOpen} from '../store/IO'
import { store } from '../store/Store'
import { setSocialBadge } from './TabPageActions'

export function replaceChats(chats){
  return {
    type: REP_CHATS,
    chats
  }
}

export function viewChat(fid){
  return {
    type: CHAT_VIEW,
    fid
  }
}

export function chatFrom(data){
  const { badge } = store.getState()
  if (badge.selectedTab != 'social') {
    store.dispatch(setSocialBadge())    
  }
  return {
    type: CHAT_FROM,
    fromID: data.fromID,
    toID: data.toID,
    message: data.message,
    time: data.time
  }
}

export function chatTo(data){
  IOchatTo(data)
  return {
    type: CHAT_TO,
    fromID: data.fromID,
    toID: data.toID,
    message: data.message,
    time: data.time
  }
}

export function deleteChat(fid){
  return {
    type: CHAT_DELETE,
    fid
  }
}

function IOchatTo(data){
  if (checkOpen()) {
    io.emit('chatTo',data)
  }
}

io.on('chatFrom', (data) => {
  if (checkCode(data.code,"")) {
    for (var i = 0; i < data.chats.length; i++) {
      const chat = data.chats[i];
      store.dispatch(chatFrom(chat))
    }
  }
})
