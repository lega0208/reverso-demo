/*
 *
 * Details reducer
 *
 */

import produce from 'immer';
import { buildUrl, fixParamString } from 'utils/url';
import {
  OPEN_DETAILS,
  CLOSE_DETAILS,
  SET_DETAILS,
  SET_DATA,
} from './constants';

export const initialState = {
  isOpen: false,
  selectionId: false,
  data: {},
};

/* eslint-disable default-case, no-param-reassign */
const detailsReducer = produce((draft, action) => {
  switch (action.type) {
    case OPEN_DETAILS:
      if (draft.selectionId !== false && draft.selectionId !== undefined) {
        draft.isOpen = true;
      }
      return;
    case CLOSE_DETAILS:
      draft.isOpen = false;
      return;
    case SET_DETAILS:
      draft.data = action.data;
      draft.selectionId = action.data.id;
      return;
    case SET_DATA:
      if (action.key.includes('.')) {
        const keys = action.key.split('.');
        draft.data[keys[0]][keys[1]] = action.val;
        draft.data.url = buildUrl(draft.data);

        return;
      }

      draft.data[action.key] = action.val;
      draft.data.extraParams = fixParamString(draft.data.extraParams);

      draft.data.url = buildUrl(draft.data);
  }
}, initialState);

export default detailsReducer;
