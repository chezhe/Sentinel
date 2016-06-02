import { combineReducers } from 'redux'
import account from './ModifyAccount'
import badge from './TabPage'
import monoliths from './OperateMonolith'
import annotations from './Annotations'
import friendRequest from './FriendRequest'
import chats from './Chats'
import cacheApe from './CacheApe'
import region from './Region'

const rootReducer = combineReducers({
  account,
  badge,
  monoliths,
  annotations,
  friendRequest,
  chats,
  cacheApe,
  region
})

export default rootReducer
