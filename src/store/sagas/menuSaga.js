import { call, put, takeLatest } from "redux-saga/effects";
import { fetchMenu, fetchMenuSuccess, fetchMenuFailure } from "../menuSlice";
import { API } from "../../utils/constant";
// const API = "http://localhost:3000";

function* fetchMenuWorker(action) {
  try {
    const resId = action.payload;
    const response = yield call(fetch, `${API}/api/menu/${resId}`);
    const data = yield response.json();
    yield put(fetchMenuSuccess(data));
  } catch (error) {
    yield put(fetchMenuFailure(error.message));
  }
}

export function* watchMenuSaga() {
  yield takeLatest(fetchMenu.type, fetchMenuWorker);
}
