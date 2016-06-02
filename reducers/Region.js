import { MAP_REGION } from '../constants/ActionTypes'

export default function region(state={},action){
  switch (action.type) {
    case MAP_REGION:
        return Object.assign({},state,action.region)
    default:
      return state
  }
}
