import * as requestFromServer from "./productApi";
import { productSlice, callTypes } from "./productSlice";

const { actions } = productSlice;

export const fetchProductsAction = (lms, queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllProducts(lms, queryParams)
    .then((response) => {
      const totalCount = response.data.total;
      const data = response.data.result;
      dispatch(actions.productsFetched({ totalCount, data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find product";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchProductAction = (params) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getProductById(params)
    .then((response) => {
      const data = response.data.result;
      dispatch(actions.productFetched({ data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find product";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const createProductAction = (params) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer.createProduct(params).catch((error) => {
    error.clientMessage = "Can't create product";
    dispatch(actions.catchError({ error, callType: callTypes.action }));
  });
};
export const updateProductAction = (product) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateProduct(product)
    .catch((error) => {
      error.clientMessage = "Can't update product";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    })
    .finally(() => {
      dispatch(actions.endCall({ callType: callTypes.action }));
    });
};
export const deleteProductAction = (params) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));

  return requestFromServer
    .deleteProduct(params)
    .catch((error) => {
      error.clientMessage = "Can't delete product";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    })
    .finally(() => {
      dispatch(actions.endCall({ callType: callTypes.action }));
    });
};
export const deleteListProductAction = (params) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));

  return requestFromServer
    .deleteListProduct(params)
    .catch((error) => {
      error.clientMessage = "Can't delete product";
    })
    .finally(() => {
      dispatch(actions.endCall({ callType: callTypes.action }));
    });
};
