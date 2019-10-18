/*
 *
 * Details actions
 *
 */

import {
  OPEN_DETAILS,
  SET_DETAILS,
  CLOSE_DETAILS,
  SET_DATA,
} from './constants';

export function openDetails() {
  return {
    type: OPEN_DETAILS,
  };
}

export function closeDetails(save = false) {
  return {
    type: CLOSE_DETAILS,
    save,
  };
}

export function setDetails(data = {}, id) {
  if (id) {
    return {
      type: SET_DETAILS,
      data,
      id,
    };
  }
  return {
    type: SET_DETAILS,
    data,
  };
}

export function setData(key, val) {
  return {
    type: SET_DATA,
    key,
    val,
  };
}
