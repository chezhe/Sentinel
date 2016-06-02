import {
  REP_ACCOUNT,
  M_NAME,
  M_GENDER,
  M_DISTRICT,
  M_SIGNATURE,
  M_AVATAR,
  M_REGISTER,
  M_REGISTER_OK,
  M_IDENTIFY,
  M_NEWFRIEND
} from '../constants/ActionTypes'
import { IP } from '../constants/Configure'
import { io, checkCode, checkOpen} from '../store/IO'
import { store } from '../store/Store'

export function identifyAccount(_id,name){
  IOidentify(_id,name)
  return {
    type: M_IDENTIFY
  }
}

export function replaceAccount(account){
  return {
    type: REP_ACCOUNT,
    account
  }
}

export function newFriend(fid){
  return {
    type: M_NEWFRIEND,
    fid
  }
}

export function register(name,token){
  let account = {
    name,
    token,
    avatar: {uri:'http://139.129.23.20:5000/avatarLib/avatar.png'},
    gender: "男",
    signature:"",
    district:{
      province:"省份",
      city:"城市",
      provinceKey: "beijing",
      cityIndex: 0,
    },
    lastUpdate: Date.now(),
    friendList: [],
    dropList: [],
    pickList: [],
    favourList: [],
    lastLocation: {
      latitude: 0,
      longitude: 0
    }
  }
  IOregister(account)
  return {
    type: M_REGISTER,
    account
  }
  return (dispatch,getState) => {

  }
}

export function registerOK(_id){
  return {
    type: M_REGISTER_OK,
    _id
  }
}

export function modifyName(text,_id){
  IOupdateAccount({
    name: text
  },_id)
  return { type:M_NAME, text }
  return (dispatch,getState) => {

  }
}

export function modifyGender(text,_id){
  IOupdateAccount({
    gender: text
  },_id)
  return { type:M_GENDER, text }
  return (dispatch,getState) => {

  }
}

export function modifyDistrict(ds,_id){
  IOupdateAccount({
    district: ds
  },_id)
  return { type:M_DISTRICT, ds}
  return (dispatch,getState) => {

  }
}

export function modifySignature(text,_id){
  IOupdateAccount({
    signature: text
  },_id)
  return { type:M_SIGNATURE, text}
  return (dispatch,getState) => {

  }
}

export function modifyAvatar(avatar,_id){
  XHRupdateAvatar(avatar,_id)
  return {
    type:M_AVATAR,
    avatar
  }
  return (dispatch,getState) => {

  }
}

function XHRupdateAvatar(avatar,name){
  let xhr = new XMLHttpRequest()
  xhr.open('PUT', IP+'updateAvatar')
  xhr.onload = () => {
    if (xhr.status === 200) {

    } else {

    }
  }
  xhr.onerror = function(err){

  }
  var formdata = new FormData();
  formdata.append("file",{
    uri: avatar.uri,
    type: "image/png",
    name: name
  })
  xhr.send(formdata)
}

//注册
function IOregister(data){
  if (checkOpen()) {
    io.emit('register',data);
  }
};

io.on('registered', (data) => {
  if (checkCode(data.code,"")) {
    store.dispatch(registerOK(data.uid))
  }
});
//
function IOidentify(_id,name){
  if (checkOpen()) {
    io.emit('identify',{
      id:_id,
      name:name
    });
  }
}

//更新用户信息
function IOupdateAccount(data,_id){
  if (checkOpen()) {
    io.emit('updateAccount',{
      uid: _id,
      data: data,
    })
  }
}
io.on('accountUpdated', (data) => {
  if (checkCode(data.code,"")) {
    //make it
  }
})
