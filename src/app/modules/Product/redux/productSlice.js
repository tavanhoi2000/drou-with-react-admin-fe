import { createSlice } from "@reduxjs/toolkit";

const initialProductState = {
  listLoading: false,
  actionsLoading: false,
  countProduct: 0,
  productList: null,
  productForEdit: undefined,
  lastError: null,
};

export const callTypes = {
  list: "list",
  action: "action",
};

export const productSlice = createSlice({
  name: "product",
  initialState: initialProductState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    endCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else if (action.payload.callType === callTypes.action) {
        state.actionsLoading = false;
      }
    },
    productsFetched: (state, action) => {
      const { totalCount, data } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.productList = data;
      state.countProduct = totalCount;
    },
    productCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.productList.push(action.payload.product);
    },
    productFetched: (state, action) => {
      const { data } = action.payload;
      state.actionsLoading = false;
      state.productForEdit = data || {};
      state.error = null;
    },
  },
});
