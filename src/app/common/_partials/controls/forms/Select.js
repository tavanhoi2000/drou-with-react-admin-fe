import React from "react";
import { useField, useFormikContext } from "formik";
import { FieldFeedbackLabel } from "./FieldFeedbackLabel";

const getFieldCSSClasses = (touched, errors) => {
  const classes = ["form-control"];
  if (touched && errors) {
    classes.push("is-invalid-select");
  }

  if (touched && !errors) {
    classes.push("is-valid-select");
  }

  return classes.join(" ");
};

export function Select({
  label,
  withFeedbackLabel = true,
  customFeedbackLabel,
  notifyChange,
  children,
  ...props
}) {
  const [field, meta] = useField(props);
  const { touched, error } = meta;
  const { setFieldValue } = useFormikContext();

  field.onChange = (event) => {
    setFieldValue(field.name, event.target.value);
    notifyChange && notifyChange(event.target.value);
  };

  return (
    <>
      {label && <label>{label}</label>}
      <select className={getFieldCSSClasses(touched, error)} {...field} {...props}>
        {children}
      </select>
      {withFeedbackLabel && (
        <FieldFeedbackLabel
          error={error}
          touched={touched}
          label={label}
          customFeedbackLabel={customFeedbackLabel}
        />
      )}
    </>
  );
}
