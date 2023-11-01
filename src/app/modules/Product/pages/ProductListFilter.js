import { Formik } from "formik";
import { isEqual } from "lodash";
import React from "react";
import { InputGroup } from "react-bootstrap";

const prepareFilter = (queryParams, values) => {
  const { searchText } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  filter.search = searchText;
  newQueryParams.filter = filter;
  return newQueryParams;
};

export function ProductListFilter({ intl, listLoading, queryParams, setQueryParams }) {
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(queryParams, values);
    if (!isEqual(newQueryParams, queryParams)) {
      newQueryParams.pageNumber = 1;
      setQueryParams(newQueryParams);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          searchText: "",
        }}
        onSubmit={(values) => {
          applyFilter(values);
        }}
      >
        {({ values, handleSubmit, handleBlur, handleChange, setFieldValue }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <InputGroup className="mb-0 mt-0">
              <input
                type="search"
                className="form-control"
                name="searchText"
                autoComplete="off"
                placeholder={intl.formatMessage({
                  id: "common_search_place_holder",
                })}
                onBlur={handleBlur}
                onChange={(e) => {
                  setFieldValue("searchText", e.target.value);
                  if (e.target.value === "") {
                    handleSubmit();
                  }
                }}
              />
              <InputGroup.Append>
                <button type="submit" className="btn btn-secondary d-inline">
                  {intl.formatMessage({ id: "common_search" })}
                </button>
              </InputGroup.Append>
            </InputGroup>
          </form>
        )}
      </Formik>
    </>
  );
}
