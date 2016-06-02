import {
  REP_ACCOUNT,
  M_NAME,
  M_GENDER,
  M_DISTRICT,
  M_SIGNATURE,
  M_AVATAR,
  M_REGISTER,
  M_REGISTER_OK,
  M_NEWFRIEND
} from '../constants/ActionTypes'
import { IP } from '../constants/Configure'

export default function account(state={},action){
  switch (action.type) {
    case M_NEWFRIEND:
      return Object.assign({},state,{
        friendList: [...state.friendList,action.fid]
      })
      break;
    case REP_ACCOUNT:
      return Object.assign({},action.account)
      break;
    case M_REGISTER:
      return Object.assign({}, state,action.account)
      break;
    case M_REGISTER_OK:
      return Object.assign({},state,{
        _id: action._id
      })
      break;
    case M_AVATAR:
      return Object.assign({}, state, {
        avatar: action.avatar
      })
      break;
    case M_NAME:
      return Object.assign({}, state, {
        name: action.text
      })
      break;
    case M_GENDER:
      return Object.assign({}, state, {
        gender: action.text
      })
      break;
    case M_DISTRICT:
      return Object.assign({}, state,{
        district: action.ds
      })
      break;
    case M_SIGNATURE:
      return Object.assign({}, state,{
        signature: action.text
      })
      break;
    default:
      return state
  }
}
