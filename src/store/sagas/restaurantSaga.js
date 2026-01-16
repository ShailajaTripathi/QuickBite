import { call, put, takeLatest } from "redux-saga/effects";
import { API } from "../../utils/constant";
import {
  fetchRestaurants,
  fetchRestaurantsSuccess,
  fetchRestaurantsFailure,
} from "../restaurantSlice";

// const API = "http://localhost:3000";

function* fetchRestaurantsWorker() {
  try {
    const response = yield call(fetch, `${API}/api/restaurants`);
    const data = yield response.json();
    yield put(fetchRestaurantsSuccess(data));
  } catch (error) {
    yield put(fetchRestaurantsFailure(error.message));
  }
}

export function* watchRestaurantSaga() {
  yield takeLatest(fetchRestaurants.type, fetchRestaurantsWorker);
}
