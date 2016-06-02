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

export function tabExplore(){
  return { type:TAB_EXPLORE }
}

export function setExploreBadge(){
  return {
    type: SET_EXPLORE
  }
}

export function tabMonolith(){
  return { type:TAB_MONOLITH }
}

export function setMonolithBadge(){
  return {
    type: SET_MONOLITH
  }
}

export function tabSocial(){
  return { type:TAB_SOCIAL }
}

export function setSocialBadge(){
  return {
    type: SET_SOCIAL
  }
}

export function tabAccount(){
  return { type:TAB_ACCOUNT }
}

export function setAccountBadge(){
  return {
    type: SET_ACCOUNT
  }
}
