/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */
import {
  GET_DATA,
  GET_DATA_SUCCESS,
  GET_DATA_ERROR,
  SET_DATA,
  SET_SELECTION,
} from './constants';

export function getData() {
  return {
    type: GET_DATA,
  };
}

export function getDataSuccess(data) {
  return {
    type: GET_DATA_SUCCESS,
    data,
  };
}

export function getDataError(error) {
  return {
    type: GET_DATA_ERROR,
    error,
  };
}

export function setData(data) {
  if (Array.isArray(data)) {
    return {
      type: SET_DATA,
      data,
    };
  }
  if (data.id !== undefined) {
    return {
      type: SET_DATA,
      id: data.id,
      data,
    };
  }
  return { type: SET_DATA };
}

export function setSelection(selectionId) {
  return {
    type: SET_SELECTION,
    selectionId,
  };
}
