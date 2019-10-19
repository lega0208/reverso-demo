/**
 * Gets the data from the API
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { parseUrl } from 'utils/url';
import { GET_DATA } from './constants';
// eslint-disable-next-line import/named
import { getDataError, getDataSuccess } from './actions';

export const formatData = (modelsData = []) =>
  modelsData.map((modelData, i) => ({
    id: i,
    ...modelData,
    ...parseUrl(modelData.url),
  }));

function addDummyData(data = []) {
  const startIndex = data.length;
  const dummyData = [
    {
      id: startIndex,
      name: 'tf1',
      url: 'tf://192.168.0.92:83?tuneId=1234&modelId=abcd&someParam=2&arg=yes',
      type: 'tf',
      activate: false,
      enabled: false,
      langFrom: 'en',
      langTo: 'fr',
      tuneId: '1234',
      modelId: 'abcd',
      preprocessors: {},
      extraParams: { someParam: 2, arg: 'yes' },
    },
    {
      id: startIndex + 1,
      name: 'tf2',
      url: 'tf://192.168.0.92:83?tuneId=1235&modelId=abce',
      type: 'tf',
      activate: false,
      enabled: false,
      langFrom: 'en',
      langTo: 'de',
      tuneId: '1235',
      modelId: 'abce',
      preprocessors: {},
      extraParams: {},
    },
  ];

  return [...data, ...dummyData];
}

/**
 * Data request/response handler
 */
export function* getDataSaga() {
  const requestURL = `http://nmt-api.reverso.net/v1/models`;

  try {
    // Call our request helper (see 'utils/request')
    const data = yield call(request, requestURL);
    const formattedData = yield call(formatData, data);
    yield put(getDataSuccess(addDummyData(formattedData)));
  } catch (err) {
    console.log(err);
    yield put(getDataError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* dataSaga() {
  // Watches for GET_DATA actions and calls getData when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(GET_DATA, getDataSaga);
}
