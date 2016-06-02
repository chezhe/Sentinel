import {
  REP_CACHE_APE,
  CACHE_APE_GET,
  CACHE_APE_FETCH,
  CACHE_APE_FETCHED
} from '../constants/ActionTypes'
import { io, checkCode, checkOpen} from '../store/IO'
import { store } from '../store/Store'

export function replaceCacheApe(ca){
  return {
    type: REP_CACHE_APE,
    ca
  }
}

export function getCacheApe(filter){
  return {
    type: CACHE_APE_GET,
    filter
  }
}

export function apeInfoFetched(ape){
  return {
    type: CACHE_APE_FETCHED,
    ape
  }
}

export function fetchApeToCache(_id){
  IOfetchApeInfo(_id)
  return {
    type: CACHE_APE_FETCH,
    _id
  }
}

//获取用户信息
function IOfetchApeInfo(uid){
  if (checkOpen()) {
    io.emit('fetchApeInfo',{
      uid: uid,
    })
  }
}
io.on('apeInfoFetched', (data) => {
  if (checkCode(data.code,"")) {
    for (var i = 0; i < data.apes.length; i++) {
      store.dispatch(apeInfoFetched(data.apes[i]))
    }
  }
})
