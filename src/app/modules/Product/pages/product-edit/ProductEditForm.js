import { Input, Textarea } from "../../../../common/_partials/controls";
import { Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import * as actions from "../../redux/productActions";
import * as Yup from "yup";
import { FormattedMessage } from "react-intl";

function ProductEditForm({ product, intl, onSaveProduct }) {
  const [productEditing, setProductEditing] = useState({});

  const ProductSchema = () => {
    return Yup.object().shape({
      name: Yup.string().required(
        <FormattedMessage id="product_add_name_required" />
      ),
      description: Yup.string().required(
        <FormattedMessage id="product_add_description_required" />
      ),
    });
  };


  useEffect(() => {
    if (!product) return;
    setProductEditing(product);
  }, [product]);

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={productEditing}
        validationSchema={ProductSchema()}
        onSubmit={(values) => {
          onSaveProduct(values);
        }}
      >
        {({ handleSubmit, setFieldValue, values }) =>(
          <Form onSubmit={handleSubmit}>
            <div className="row mb-4">
              <div className="col-lg-12">
                <Field
                  component={Input}
                  name="name"
                  placeholder={intl.formatMessage({ id: "product_edit_name" })}
                  label={intl.formatMessage({ id: "product_edit_name" })}
                />
              </div>
              <div className="col-lg-12">
                <Field
                  component={Textarea}
                  name="description"
                  placeholder={intl.formatMessage({
                    id: "product_edit_description",
                  })}
                  rows={10}
                  label={intl.formatMessage({ id: "product_edit_description" })}
                />
              </div>
            </div>
            <div className="col-lg-12 d-flex justify-content-end align-items-center">
              <Button type="submit">
                {intl.formatMessage({ id: "common_save" })}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default ProductEditForm;
