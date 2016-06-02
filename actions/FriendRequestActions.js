import {
  REP_FR,
  FR_IN_ACCEPT,
  FR_IN_REFUSE,
  FR_SEND_OUT,
  FR_RECEIVE,
  FR_OUT_ACCEPTED,
  FR_OUT_REFUSED,
  FR_READ
} from '../constants/ActionTypes'
import { io, checkCode, checkOpen} from '../store/IO'
import { fetchApeToCache } from './CacheApeActions'
import { newFriend } from './ModifyAccountActions'
import { setAccountBadge } from './TabPageActions'
import { store } from '../store/Store'

//self id
export function readFR(id){
  return {
    type: FR_READ,
    id
  }
}

export function replaceFR(fr){
  return {
    type: REP_FR,
    fr
  }
}
export function getFriend(fromID){
  return {
    type: FR_IN_ACCEPT,
    fromID
  }
}

export function frRefused(toID){
  return {
    type: FR_OUT_REFUSED,
    toID
  }
}

export function frAccepted(toID){
  return {
    type: FR_OUT_ACCEPTED,
    toID
  }
}

export function acceptFR(fromID){
  const {account} = store.getState()
  IOanswerFR({
    fromID,
    toID: account._id,
    toName: account.name,
    answer:true
  })
  store.dispatch(newFriend(fromID))
  return {
    type: FR_IN_ACCEPT,
    fromID
  }
}

export function refuseFR(fromID){
  const {account} = store.getState()
  IOanswerFR({
    fromID,
    toID: account._id,
    toName: account.name,
    answer: false
  })
  return {
    type: FR_IN_REFUSE,
    fromID
  }
}

export function sendFR(fr){
  IOsendFR(fr)
  return {
    type: FR_SEND_OUT,
    fromID: fr.fromID,
    toID: fr.toID,
    fromName: fr.fromName
  }
}

export function receiveFR(fr){
  const { badge } = store.getState()
  if (badge.selectedTab != 'account') {
    store.dispatch(setAccountBadge())
  }
  return {
    type: FR_RECEIVE,
    fr
  }
}

function IOsendFR(fr){
  if (checkOpen()) {
    io.emit('sendFR',fr);
  }
}


function IOanswerFR(answer){
  if (checkOpen()) {
    io.emit('answerFR',answer);
  }
}

io.on('receiveFR', (data) => {
  if (checkCode(data.code,"")) {
    for (var i = 0; i < data.frs.length; i++) {
      const fr = data.frs[i]
      store.dispatch(receiveFR(fr))

      const cacheApe = store.getState().cacheApe
      if (cacheApe.filter((item) => { return item._id === fr.fromID}).length == 0) {
        store.dispatch(fetchApeToCache(fr.fromID))
      }
    }
  }
});
io.on('frFetched', (data) => {
  if (checkCode(data.code,"")) {
    for (var i = 0; i < data.frs.length; i++) {
      const fr = data.frs[i]
      store.dispatch(receiveFR(fr))
    }
  }
});

io.on('frAnswered', (data) => {
  if (checkCode(data.code,"")) {
    for (var i = 0; i < data.frs.length; i++) {
      const fr = data.frs[i]
      if (fr.answer) {
        store.dispatch(frAccepted(fr.toID))
        store.dispatch(newFriend(fr.toID))
      }else {
        store.dispatch(frRefused(fr.toID))
      }
    }
  }
})

io.on('fraFetched', (data) => {
  if (checkCode(data.code,"")) {
    for (var i = 0; i < data.frs.length; i++) {
      const fr = data.frs[i]
      if (fr.answer) {
        store.dispatch(frAccepted(fr.toID))
        store.dispatch(newFriend(fr.toID))
      }else {
        store.dispatch(frRefused(fr.toID))
      }
    }
  }
})
