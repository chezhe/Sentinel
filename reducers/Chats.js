import {
  REP_CHATS,
  CHAT_TO,
  CHAT_DELETE,
  CHAT_FROM,
  CHAT_VIEW
} from '../constants/ActionTypes'

export default function chats(state=[],action){
  switch (action.type) {
    case CHAT_VIEW:
      return state.map((item) => {
        if (item.fid === action.fid) {
          return Object.assign({},item,{
            badge: 0
          })
        }
        return item
      })
    case REP_CHATS:
      return action.chats
    case CHAT_FROM:
      const findit = state.find((item) => { return item.fid===action.fromID});
      if (findit==undefined || findit.length==0) {
        return [...state,{
          fid: action.fromID,
          badge: 1,
          msg: [{
            fromID: action.fromID,
            toID: action.toID,
            message: action.message,
            time: action.time
          }]
        }]
      }else {
        return state.map((item) => {
          if (item.fid === action.fromID) {
            return Object.assign({},item,{
              badge: item.badge+1,
              msg:[...item.msg,{
                fromID: action.fromID,
                toID: action.toID,
                message: action.message,
                time: action.time
              }]
            })
          }
          return item
        })
      }
    case CHAT_TO:
      const {fromID,toID,message,time}=action
      if (state.filter((item) => { return item.fid===action.toID }).length==0) {
        return [...state,{
          fid:action.toID,
          badge: 0,
          msg:[{
            fromID,
            toID,
            message,
            time
          }]
        }]
      }else {
        return state.map((item) => {
          if (item.fid === action.toID) {
            return Object.assign({},item,{
              badge: 0,
              msg:[...item.msg,{
                fromID,
                toID,
                message,
                time
              }]
            })
          }
          return item
        })
      }
    case CHAT_DELETE:
      return state.map((item) => {
        if (item.fid === action.fid) {
          return Object.assign({},item,{
            msg: [],
            badge: 0
          })
        }
        return item
      })
    default:
      return state
  }
}
