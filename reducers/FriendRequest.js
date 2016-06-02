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

export default function friendRequest(state=[],action){
  switch (action.type) {
    case FR_READ:
      return state.map((item) => {
        if (item.toID==action.id && !item.isReadByTo) {
          return Object.assign({},item,{
            isReadByTo: true
          })
        }
        if (item.fromID==action.id && item.isAnsweredByTo) {
          if (!item.isAnswerReadByFrom) {
            return Object.assign({},item,{
              isAnswerReadByFrom: true
            })
          }
        }
        return item
      })
      break;
    case REP_FR:
      return action.fr
      break;
    case FR_RECEIVE:
      return [...state,action.fr]
      break;
    case FR_OUT_REFUSED:
      return state.map((item) => {
        if (item.out && item.toID === action.toID) {
          return Object.assign({},item,{
            answer: false,
            isAnsweredByTo: true
          })
        }
        return item
      })
      break;
    case FR_OUT_ACCEPTED:
      return state.map((item) => {
        if (item.out && item.toID === action.toID) {
          return Object.assign({},item,{
            answer: true,
            isReadByTo: true,
            isAnsweredByTo: true,
          })
        }
        return item
      })
      break;
    case FR_IN_ACCEPT:
      return state.map((item) => {
        if (item.fromID === action.fromID) {
          return Object.assign({},item,{
            answer: true,
            isAnsweredByTo: true
          })
        }
        return item
      })
      break;
    case FR_IN_REFUSE:
      return state.map((item) => {
        if (item.fromID === action.fromID) {
          return Object.assign({},item,{
            answer: false,
            isAnsweredByTo: true
          })
        }
        return item
      })
      break;
    case FR_SEND_OUT:
      return [...state,{
        fromID: action.fromID,
        toID: action.toID,
        time: Date.now(),
        out: true,
        answer: false,
        isReadByTo: false,
        isAnsweredByTo: false,
        isAnswerReadByFrom: false
      }]
      break;
    default:
      return state
  }
}
