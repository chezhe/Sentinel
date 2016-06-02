import {
  MAP_FETCH_ANNOTATIONS_OK,
  MAP_ANNOTATIONS_ALL,
  MAP_ANNOTATIONS_PICK,
  MAP_ANNOTATIONS_DROPED
} from '../constants/ActionTypes'

export default function annotations(state=[],action){
  switch (action.type) {
    case MAP_FETCH_ANNOTATIONS_OK:
      return [...state,action.ml]
      break;
    case MAP_ANNOTATIONS_DROPED:
      if (state.filter((item) => { item._id==action.ml._id}).length>0) {
          return state
      }
      return [...state,action.ml]
      break;
    case MAP_ANNOTATIONS_PICK:
      return state.filter((item) => {
        return item._id!=action._id
      })
      break;
    default:
      return state
  }
}
