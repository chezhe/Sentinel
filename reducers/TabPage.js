import {
  TAB_MONOLITH,
  TAB_EXPLORE,
  TAB_SOCIAL,
  TAB_ACCOUNT,
  SET_MONOLITH,
  SET_EXPLORE,
  SET_SOCIAL,
  SET_ACCOUNT
} from '../constants/ActionTypes'

export default function badge(state={},action){
  switch (action.type) {
    case SET_MONOLITH:
      return Object.assign({},state,{
        monolith: state.monolith==undefined?1:(state.monolith+1)
      })
      break;
    case SET_SOCIAL:
      return Object.assign({},state,{
        social: state.social==undefined?1:(state.social+1)
      })
      break;
    case SET_EXPLORE:
      return Object.assign({},state,{
        explore: state.explore==undefined?1:(state.explore+1)
      })
      break;
    case SET_ACCOUNT:
      return Object.assign({},state,{
        account: state.account==undefined?1:(state.account+1)
      })
      break;
    case TAB_MONOLITH:
      return Object.assign({},state,{
        monolith: 0,
        selectedTab: "monolith"
      })
      break;
    case TAB_SOCIAL:
      return Object.assign({},state,{
        social: 0,
        selectedTab: "social"
      })
      break;
    case TAB_ACCOUNT:
      return Object.assign({},state,{
        account: 0,
        selectedTab: "account"
      })
      break;
    case TAB_EXPLORE:
      return Object.assign({},state,{
        account: 0,
        selectedTab: "explore"
      })
      break;
    default:
      return state
  }
}
