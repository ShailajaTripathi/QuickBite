// import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "./cartSlice";

// const store = configureStore({
//   reducer: {
//     cart: cartReducer
//   }
// });
// export default store;

import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import restaurantReducer from "./restaurantSlice";
import menuReducer from "./menuSlice";
import cartReducer from "./cartSlice";
import rootSaga from "./sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    restaurants: restaurantReducer,
    menu: menuReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;