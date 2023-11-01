import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "../redux/auth";

import { productSlice } from "../app/modules/Product/redux/productSlice";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  product: productSlice.reducer,
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
