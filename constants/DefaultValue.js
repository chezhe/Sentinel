import {DefaultAvatar} from './Configure'

export function defaultChat(id){
  return {
    fid: id,
    badge: 0,
    msg:[]
  }
}

export function defaultApe(){
  return {
    avatar: DefaultAvatar,
    name: "无名氏"
  }
}

export function defaultFR(fr){
  const {fromID,fromName,toID} = fr

  return {
    fromID,
    fromName,
    toID,
    answer: false,
    isReadByTo: false,
    isAnsweredByTo: false,
    isAnswerReadByFrom: false
  }
}
