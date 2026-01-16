import { all } from "redux-saga/effects";
import { watchRestaurantSaga } from "./restaurantSaga";
import { watchMenuSaga } from "./menuSaga";

export default function* rootSaga() {
  yield all([watchRestaurantSaga(), watchMenuSaga()]);
}
