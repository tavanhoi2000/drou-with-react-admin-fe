import { Input,Textarea } from "../../../../common/_partials/controls";
import { Field, Formik } from "formik";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FormattedMessage, useIntl } from "react-intl";
import * as Yup from "yup";

const ProductSchema = () => {
  return Yup.object().shape({
    name: Yup.string().required(
      <FormattedMessage id="product_add_name_required" />
    ),
    description: Yup.string().required(
      <FormattedMessage id="product_add_description_required" />
    ),
    code: Yup.string().required(<FormattedMessage id="product_add_code_required"/>)
  });
};

const ProductNewForm = ({ onHide, actionsLoading, saveProduct }) => {
  const intl = useIntl();

  const productValues = {
    name: "",
    description: "",
    code: "",
  };

  return (
    <>
      <Formik
        onSubmit={(values) => {
          saveProduct(values);
        }}
        enableReinitialize
        initialValues={productValues}
        validationSchema={ProductSchema()}
      >
        {({ handleSubmit, setFieldValue, errors, touched }) => {
          return (
            <Form>
              <Modal.Body className="overlay overlay-block cursor-default">
                {actionsLoading && (
                  <div className="overlay-layer bg-transparent">
                    <div className="spinner spinner-lg spinner-success" />
                  </div>
                )}
                <Form className="form form-label-right">
                  <div className="form-group row mb-4">
                    <div className="col-lg-6">
                      <Field
                        component={Input}
                        name="name"
                        placeholder={intl.formatMessage({
                          id: "product_add_name",
                        })}
                        label={intl.formatMessage({ id: "product_add_name" })}
                        customFeedbackLabel
                        withFeedbackLabel
                      />
                    </div>
                    <div className="col-lg-6">
                      <Field
                        component={Input}
                        name="code"
                        placeholder={intl.formatMessage({
                          id: "product_add_code",
                        })}

                        label={intl.formatMessage({ id: "product_add_code" })}
                        customFeedbackLabel
                        withFeedbackLabel
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-4">
                    <div className="col-lg-12">
                      <Field
                        component={Textarea}
                        name="description"
                        placeholder={intl.formatMessage({
                          id: "product_add_description",
                        })}
                        rows={10}
                        label={intl.formatMessage({
                          id: "product_add_description",
                        })}
                        customFeedbackLabel
                        withFeedbackLabel
                      />
                    </div>
                  </div>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <button
                  type="button"
                  onClick={onHide}
                  className="btn btn-light btn-elevate"
                >
                  {intl.formatMessage({ id: "common_cancel" })}
                </button>
                <Button
                  type="submit"
                  disabled={actionsLoading}
                  onClick={handleSubmit}
                >
                  {intl.formatMessage({ id: "common_save" })}
                </Button>
              </Modal.Footer>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
export default ProductNewForm;
