import {
  REP_CACHE_APE,
  CACHE_APE_GET,
  CACHE_APE_FETCH,
  CACHE_APE_FETCHED
} from '../constants/ActionTypes'

export default function cacheApe(state=[],action){
  switch (action.type) {
    case CACHE_APE_FETCHED:
      return [...state,action.ape]
      break;
    case CACHE_APE_GET:
      return action.filter
      break;
    case REP_CACHE_APE:
      return action.ca
      break;
    default:
      return state
  }
}
