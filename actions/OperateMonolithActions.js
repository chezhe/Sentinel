import {
  REP_MONOLITHS,
  ML_DELETE,
  ML_DROP,
  ML_DROP_OK,
  ML_PICK,
  ML_PICKED,
  ML_FAVOUR,
  ML_LIST_DROP,
  ML_LIST_PICK,
  ML_VIEW,
  ML_COMMENT,
  ML_REPORT,
  ML_ILLEGAL,
  ML_RECEIVE,
  ML_REQUEST
} from '../constants/ActionTypes'
import { io, checkCode, checkOpen} from '../store/IO'
import { IP } from '../constants/Configure'
import { fetchApeToCache } from './CacheApeActions'
import { setMonolithBadge } from './TabPageActions'
import { dropAnnotation } from './AnnotationActions'
import { pickAnnotations } from './AnnotationActions'
import { store } from '../store/Store'
import RNFS from 'react-native-fs'
import Sound from 'react-native-sound'

//被举报
export function illegalML(_id){
  return {
    type: ML_ILLEGAL,
    _id
  }
}
//覆盖Monolith，用于初始化
export function replaceMonoliths(mls){
  return {
    type: REP_MONOLITHS,
    mls
  }
}
//列出丢弃的dropml，暂时无用，而是用Array.filter
export function listDropML(){
  return {
    type: ML_LIST_DROP
  }
}
export function listPickML(){
  return {
    type: ML_LIST_PICK
  }
}
//捡取ML
export function pickML(ml){
  store.dispatch(pickAnnotations(ml._id))
  IOpickML({
    readerID: ml.readerID,
    readerName: ml.readerName,
    mlID: ml._id,
    authorID: ml.authorID,
    deathday: ml.deathday
  })
  return {
    type: ML_PICK,
    ml
  }
}
//被捡取
export function picked(_id,readerID,deathday){
  return {
    type: ML_PICKED,
    _id,
    readerID,
    deathday
  }
}
//丢
export function dropML(uml){
  const { account,region } = store.getState()
  var ml = {
    media: uml.media,
    authorID: account._id,
    authorName: account.name,
    content: uml.content,
    droped: true,
    comments: [],
    birthday: Date.now(),
    longitude: region.longitude,
    latitude: region.latitude,
    favoured: false,
    deleted: false,
    badge: 0
  }
  switch (ml.media) {
    case "image":
      {
        let name = ml.authorID+"_"+Date.now()
        const dest = RNFS.DocumentDirectoryPath + '/'+name+'.jpg'
        RNFS.moveFile(ml.content.cxt.uri,dest)
            .then(()=>{
              XHRdropImage(dest,name)              
            }).catch((err) =>{
              throw err
            })
        ml.content.cxt = {uri:name+'.jpg'}
      }
      break;
     case "audio":
     {
       let name = ml.authorID+"_"+Date.now()
       const dest = RNFS.DocumentDirectoryPath + '/'+name+'.caf'
       RNFS.moveFile(ml.content.cxt.uri,dest)
            .then((a,b,c)=>{
              XHRdropAudio(dest,name)
            }).catch((err) =>{
              throw err
            })
       ml.content.cxt = {uri:name+'.caf'}
     }
      break;
    default:

  }
  IOdropML(ml)
  store.dispatch(dropAnnotation(ml))
  return {
    type: ML_DROP,
    ml
  }
}
//丢下操作完成
export function dropMLOK(birthday,_id){
  return {
    type: ML_DROP_OK,
    birthday,
    _id
  }
}
//举报
export function reportML(_id,reason){
  IOreport(_id,reason)
  return {
    type: ML_REPORT,
    _id,
    reason
  }
}
//收藏
export function favourML(_id,favoured,uid,authorID){
  IOfavourML(_id,favoured,uid,authorID)
  return {
    type:ML_FAVOUR,
    _id,
    favoured
  }
}
//查看
export function viewML(_id){
  return {
    type:ML_VIEW,
    _id
  }
}
//删除
export function deleteML(uid,_id,self){
  IOdeleteML(uid,_id,self)
  return {
    type:ML_DELETE,
    _id
  }
}
//被评论
export function commented(_id,comment){
  const { badge } = store.getState()
  if (badge.selectedTab != 'monolith') {
    store.dispatch(setMonolithBadge())
  }
  return {
    type:ML_COMMENT,
    _id,
    comment
  }
}
//评论
export function commentML(cmt){//_id,comment,toID,commenter
  IOcommentML(cmt)
  return {
    type:ML_COMMENT,
    _id: cmt._id,
    comment: cmt.comment
  }
}

export function requestML(url) {
  
}

function IOreportML(mlId,reason){
  if (checkOpen()) {
    io.emit('reportML',{
      mlID,
      reason,
      uid: store.getState().account._id
    })
  }
}
io.on('mlReported', (data) => {
  if (checkCode(data.code,"")) {

  }
})

function IOcommentML(cmt) {//_id,comment,toID,commenter
  if (checkOpen()) {
    io.emit('commentML',{
      toID: cmt.toID,
      mlID: cmt._id,
      commenterName: cmt.commenterName,
      content: cmt.comment.content,
      commenterID: cmt.comment.commenterID
    });
  }
}
//收到评论
io.on('mlCommented', (data) => {
  if (checkCode(data.code,"")) {
    for (var i = 0; i < data.cms.length; i++) {
      const cm = data.cms[i];
      store.dispatch(commented(cm.mlID,{
        commenterID: cm.commenterID,
        content: cm.content
      }))
    }
  }
});
//拉取未读评论
io.on('mlcFeteched', (data) => {
  if (checkCode(data.code,"")) {
    for (var i = 0; i < data.cms.length; i++) {
      const cm = data.cms[i];
      store.dispatch(commented(cm.mlID,{
        commenterID: cm.commenterID,
        content: cm.content
      }))
    }
  }
})

function IOdropML(ml){
  if (checkOpen()) {
    io.emit('dropML',ml);
  }
}

io.on('mlDroped', (data) => {
  if (checkCode(data.code,"")) {
    store.dispatch(dropMLOK(data.birthday,data.mlID))
  }
})
//捡取
function IOpickML(data){
  if (checkOpen()) {
    io.emit('pickML',data)
  }
}

io.on('pickDone', (data) => {
  if (checkCode(data.code,"")) {

  }
})
//被捡
io.on('picked', (data) => {
  if (checkCode(data.code,"")) {
    for (var i = 0; i < data.mls.length; i++) {
      const ml = data.mls[i]
      store.dispatch(picked(ml.mlID,ml.readerID,ml.deathday))
      const cacheApe = store.getState().cacheApe
      if (cacheApe.filter((item) => { return item._id === ml.readerID}).length == 0) {
        store.dispatch(fetchApeToCache(ml.readerID))
      }
    }
  }
})
//收藏
function IOfavourML(_id,favoured,uid,authorID){
  if (checkOpen()) {
    io.emit('favourML',{
      mlID: _id,
      favoured: favoured,
      uid: uid,
      time: Date.now(),
      authorID: authorID
    })
  }
}
io.on('mlFavoured', (data) => {
  if (checkCode(data.code,"")) {
    //make it
  }
})

function IOdeleteML(uid,mlID,self){
  if (checkOpen()) {
    io.emit('deleteML',{
      uid,
      mlID,
      self
    })
  }
}

io.on('mlDeleted', (data) => {
  if (checkCode(data.code,"")) {

  }
})

io.on('illegalML', (data) => {
  if (checkCode(data.code,"")) {
    for (var i = 0; i < data.ils.length; i++) {
      store.dispatch(illegalML(data.ils[i]))
    }
  }
})

function XHRfetchImage(url) {
  let xhr = new XMLHttpRequest()
  xhr.responseType = 'Blob'
  xhr.open('GET', IP+'imageLib/'+file_name)
  xhr.onload = () => {
    if (xhr.status === 200) {

    } else {

    }
  }
  xhr.onerror = function(err){

  }
}

function XHRdropImage(uri,name){
  let xhr = new XMLHttpRequest()
  xhr.open('PUT', IP+'mlImage')
  xhr.onload = () => {
    if (xhr.status === 200) {

    } else {

    }
  }
  xhr.onerror = function(err){

  }
  var formdata = new FormData();
  formdata.append("file",{
    uri: uri,
    type: "image/jpeg",
    name: name
  })
  xhr.send(formdata)
}

function XHRdropAudio(uri,name){
  let xhr = new XMLHttpRequest()
  xhr.open('PUT', IP+'mlAudio')
  xhr.onload = () => {
    if (xhr.status === 200) {

    } else {

    }
  }
  xhr.onerror = function(err){

  }
  var formdata = new FormData();
  formdata.append("file",{
    uri: uri,
    type: "audio/x-caf",
    name: name
  })
  xhr.send(formdata)
}
