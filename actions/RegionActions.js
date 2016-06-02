import { MAP_REGION } from '../constants/ActionTypes'
import { io, checkCode, checkOpen} from '../store/IO'
import { store } from '../store/Store'

export function followRegion(region){
  return {
    type: MAP_REGION,
    region
  }
}
