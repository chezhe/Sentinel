import {
  MAP_FETCH_ANNOTATIONS_OK,
  MAP_FETCH_ANNOTATIONS,
  MAP_ANNOTATIONS_ALL,
  MAP_ANNOTATIONS_PICK,
  MAP_ANNOTATIONS_DROPED
} from '../constants/ActionTypes'
import { io, checkCode, checkOpen} from '../store/IO'
import { store } from '../store/Store'

export function dropAnnotation(ml){
  return {
    type: MAP_ANNOTATIONS_DROPED,
    ml
  }
}

export function fetchAnnotationsOK(ml){
  return {
    type: MAP_FETCH_ANNOTATIONS_OK,
    ml
  }
}

export function pickAnnotations(_id){
  return {
    type: MAP_ANNOTATIONS_PICK,
    _id
  }
}

export function fetchAnnotations(region,_id){
  IOavailableML(region,_id)
  return {
    type: MAP_FETCH_ANNOTATIONS
  }
}

function IOavailableML(region,_id){
  io.emit('availableML',{
    uid: _id,
    latitude: region.latitude,
    longitude: region.longitude
  });
}

io.on('mlFetched', (data) => {
  if (checkCode(data.code,"")) {
    for (var i = 0; i < data.mls.length; i++) {
      let ml = data.mls[i]
      store.dispatch(fetchAnnotationsOK(ml))
    }
  }
})
