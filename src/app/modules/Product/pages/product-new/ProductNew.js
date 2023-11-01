import React, { useEffect } from "react";
import { useSnackNotification } from "../../../../../app/layout/_core/SnackNotificationProvider";
import { Modal } from "react-bootstrap";
import { injectIntl } from "react-intl";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/productActions";
import ProductNewForm from "./ProductNewForm";

const ProductNew = ({ show, onHide, intl }) => {
  const dispatch = useDispatch();
  const snackNotification = useSnackNotification();

  const saveProduct = (params) => {
    const requestParams = {
      name: params.name,
      description: params.description,
      code: params.code,
    };

    dispatch(actions.createProductAction(requestParams)).then((res) => {
      if (res.data.success) {
        snackNotification.showSuccess(
          intl.formatMessage({ id: "common_save_success" })
        );
        onHide && onHide();
        loadProducts();
      } else {
        snackNotification.showError(
          intl.formatMessage({ id: "product_add_error" }) +
            ": " +
            res.data.message
        );
      }
    });
  };
  const loadProducts = () => {
    dispatch(actions.fetchProductsAction());
  };
  useEffect(() => {
    loadProducts();
  }, [dispatch]);

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {intl.formatMessage({ id: "product_add_new" })}
        </Modal.Title>
      </Modal.Header>
      <ProductNewForm saveProduct={saveProduct} onHide={onHide} />
    </Modal>
  );
};
export default injectIntl(ProductNew);
