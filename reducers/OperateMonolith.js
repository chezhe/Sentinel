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
  ML_ILLEGAL
} from '../constants/ActionTypes'

export default function monoliths(state=[],action){
  switch (action.type) {
    case REP_MONOLITHS:
      return action.mls
    case ML_VIEW:
      return state.map((item) => {
        if (item._id === action._id) {
          return Object.assign({},item,{
            badge: 0
          })
        }
        return item
      })
    case ML_DROP:
      return [action.ml,...state]
    case ML_DROP_OK:
      return state.map((item) => {
        if (item.droped && item.birthday===action.birthday) {
          return Object.assign({},item,{_id:action._id})
        }
        return item
      })
    case ML_PICK:
      return [action.ml,...state]
    case ML_PICKED:
      return state.map((item) => {
        if (item.droped && item._id===action._id) {
          return Object.assign({},item,{
            readerName: action.readerName,
            readerID: action.readerID,
            deathday: action.deathday
          })
        }
        return item
      })
    case ML_REPORT:
      return state.map((item) => {
        if (item._id === action._id) {
          return Object.assign({},item,{
            report: {
              reason: action.reason
            }
          })
        }
        return item
      })
    case ML_COMMENT:
      const _id = action._id
      const comment = action.comment
      return state.map((item) => {
        if (item._id === _id) {
          let badge = item.badge==undefined?0:item.badge
          if ((item.droped&&item.authorID==comment.commenterID)||(!item.droped&&item.authorID==comment.commenterID)) {
            badge = badge+1
          }
          return Object.assign({},item,{
            comments: [...item.comments,comment],
            badge: badge
          })
        }
        return item
      })
    case ML_FAVOUR:
      return state.map((item) => {
        if (item._id === action._id) {
          return Object.assign({},item,{
            favoured: !item.favoured
          })
        }
        return item
      })
    case ML_DELETE:
      return state.map( (item) => {
        if (item._id === action._id) {
          return Object.assign({},item,{
            deleted: !item.deleted
          })
        }
        return item
      })
    case ML_ILLEGAL:
      return state.map( (item) => {
        if (item._id === action._id) {
          return Object.assign({},item,{
            deleted: !item.deleted
          })
        }
        return item
      })
    default:
      return state
  }
}
