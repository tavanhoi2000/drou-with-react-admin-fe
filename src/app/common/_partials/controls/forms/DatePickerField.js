import React from "react";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FieldFeedbackLabel } from "..";

const getFieldCSSClasses = (touched, errors) => {
  const classes = ["form-control"];
  if (touched && errors) {
    classes.push("is-invalid");
  }

  if (touched && !errors) {
    classes.push(" ");
  }

  return classes.join(" ");
};

export function DatePickerField({
  label,
  withFeedbackLabel = false,
  customFeedbackLabel,
  onChange,
  ...props
}) {
  const { setFieldValue, errors, touched } = useFormikContext();
  const [field] = useField(props);

  return (
    <>
      {label && <label>{label}</label>}
      <DatePicker
        className={getFieldCSSClasses(touched[field.name], errors[field.name])}
        style={{ width: "100%" }}
        selected={(field.value && new Date(field.value)) || null}
        {...field}
        {...props}
        onChange={
          onChange
            ? onChange
            : (val) => {
                setFieldValue(field.name, val);
              }
        }
        timeFormat="HH:mm"
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
