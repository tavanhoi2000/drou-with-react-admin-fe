import React from "react";
import { useField, useFormikContext } from "formik";
import "./SelectSearch.css";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import { FieldFeedbackLabel } from "..";

const getFieldCSSClasses = (touched, errors) => {
  const classes = [];
  if (touched && errors) {
    classes.push("is-invalid-select");
  }

  if (touched && !errors) {
    classes.push("is-valid-select");
  }

  return classes.join(" ");
};

const customStyles = {
  control: (provided) => ({
    ...provided,
    height: "calc(1.5em + 1.3rem + 3.7px)",
    borderRadius: "0.42rem",
    border: "1px solid #E4E6EF",
  }),
};

export function AsyncSelectSearch({
  label,
  loadOptions,
  notifyChange,
  defaultOptions,
  ...props
}) {
  const [field, meta] = useField(props);

  const { setFieldValue, errors, touched } = useFormikContext();

  return (
    <>
      {label && <label>{label}</label>}
      <AsyncSelect
        cacheOptions
        className={getFieldCSSClasses(touched[field.name], errors[field.name])}
        classNamePrefix="select"
        loadOptions={loadOptions}
        defaultOptions={defaultOptions}
        {...field}
        {...props}
        styles={customStyles}
        onChange={(val) => {
          notifyChange && notifyChange(val);
          setFieldValue(field.name, val);
        }}
      />
    </>
  );
}

export function SelectSearch({
  label,
  options,
  notifyChange,
  withFeedbackLabel = true,
  customFeedbackLabel,
  ...props
}) {
  const [field, meta] = useField(props);

  const { setFieldValue, errors, touched } = useFormikContext();

  return (
    <>
      {label && <label>{label}</label>}
      <Select
        cacheOptions
        classNamePrefix="select"
        options={options}
        {...field}
        {...props}
        styles={customStyles}
        onChange={(val) => {
          notifyChange && notifyChange(val);
          setFieldValue(field.name, val);
        }}
      />
      {withFeedbackLabel && (
        <FieldFeedbackLabel
          error={errors[field.name]}
          touched={touched[field.name]}
          label={label}
          customFeedbackLabel={customFeedbackLabel}
        />
      )}
    </>
  );
}
