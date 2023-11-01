/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
  ModalProgressBar,
} from "../../../../common/_partials/controls";
import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/productActions";
import { useSnackNotification } from "../../../../layout/_core/SnackNotificationProvider";
import ProductEditForm from "./ProductEditForm";

export function ProductEdit({
  history,
  match: {
    params: { id },
  },
  onSaveSuccess,
}) {
  const dispatch = useDispatch();
  const snackNotification = useSnackNotification();
  const intl = useIntl();
  let { actionsLoading, productForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.product.actionsLoading,
      productForEdit: state.product.productForEdit,
    }),
    shallowEqual
  );

  const onSaveProduct = (values) => {
    const currentformValues = {
      productId: id,
      name: values.name,
      description: values.description,
      code: values.code,
    };

    dispatch(actions.updateProductAction(currentformValues)).then((res) => {
      if (res.data.success) {
        snackNotification.showSuccess(
          intl.formatMessage({ id: "common_save_success" })
        );
        onSaveSuccess && onSaveSuccess();
        backToProductList()
      } else {
        snackNotification.showError(
          intl.formatMessage({ id: "common_save_error" })
        );
      }
    });
  };

  const loadProduct = () => {
    const params = {
      productId: id,
    };
    dispatch(actions.fetchProductAction(params));
  };
  useEffect(() => {
    loadProduct();
  }, [id, dispatch]);

  const backToProductList = () => {
    history.push(`/product/list`);
  };

  return (
    <Card>
      {actionsLoading && <ModalProgressBar />}
      <CardHeader title={productForEdit?.name}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToProductList}
            className="btn btn-light"
          >
            <i className="fa fa-arrow-left"></i>
            {intl.formatMessage({ id: "common_back" })}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        {productForEdit && (
          <ProductEditForm
            product={productForEdit}
            intl={intl}
            onSaveProduct={onSaveProduct}
          />
        )}
      </CardBody>
    </Card>
  );
}
