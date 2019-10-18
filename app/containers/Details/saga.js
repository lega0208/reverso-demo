import { all, takeLatest, put, select } from 'redux-saga/effects';
import { SET_SELECTION } from '../Dashboard/constants';
import { CLOSE_DETAILS } from './constants';
import { setDetails } from './actions';
import { setData } from '../Dashboard/actions';

export function* setDetailsSaga(action) {
  const { selectionId } = action;
  const selectionData = yield select(
    ({ dashboard: { data } }) => data[selectionId],
  );

  yield put(setDetails(selectionData));
}

export function* closeDetailsSaga(action) {
  const detailsData = yield select(({ details: { data } }) => data);

  if (action.save) {
    console.log(detailsData);
    yield put(setData(detailsData, detailsData.id));
    return;
  }
  const oldData = yield select(
    ({ dashboard: { data } }) => data[detailsData.id],
  );
  yield put(setDetails(oldData, detailsData.id));
}

// Individual exports for testing
export default function* detailsSaga() {
  yield all([
    yield takeLatest(SET_SELECTION, setDetailsSaga),
    yield takeLatest(CLOSE_DETAILS, closeDetailsSaga),
  ]);
}
