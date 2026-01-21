import { call, put, takeLatest } from "redux-saga/effects";
import { API } from "../../utils/constant";
import {
  fetchRestaurants,
  fetchRestaurantsSuccess,
  fetchRestaurantsFailure,
} from "../restaurantSlice";

function* fetchRestaurantsWorker() { // why generator function : to handle async code with yield
  // why yield : to pause the function execution until the promise is resolved like async/await
  // why yeild instead of await : because saga middleware handles the promise resolution internally when we yield effects like call, put etc.
  // why we can not use async await here 
  try {
    const response = yield call(fetch, `${API}/api/restaurants`); //call(fetch(API_URL)) call is js method to make api call
    const data = yield response.json();
    yield put(fetchRestaurantsSuccess(data)); // Dispatch success action with fetched data
  } catch (error) {
    yield put(fetchRestaurantsFailure(error.message)); // Dispatch failure action with error message
  }
}

export function* watchRestaurantSaga() { // generator function : watches for dispatched actions 
  yield takeLatest(fetchRestaurants.type, fetchRestaurantsWorker);
}
