import produce from 'immer';
import {
  GET_DATA_SUCCESS,
  GET_DATA,
  GET_DATA_ERROR,
  SET_DATA,
  SET_SELECTION,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  data: [],
};

/* eslint-disable default-case, no-param-reassign */
const dashboardReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_DATA:
        draft.loading = true;
        draft.error = false;
        draft.data = [];
        return;

      case GET_DATA_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.data = action.data;
        return;

      case GET_DATA_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.data = [];
        return;

      case SET_DATA:
        if (!action.data) return;
        if (action.id) {
          draft.data[action.id] = action.data;
          return;
        }
        draft.data = action.data;
        return;

      case SET_SELECTION:
        draft.selection = action.selectionId;
    }
  });

export default dashboardReducer;
