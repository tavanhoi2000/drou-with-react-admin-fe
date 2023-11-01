import React from "react";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import TimePicker from "react-bootstrap-time-picker";

const getFieldCSSClasses = (touched, errors) => {
  const classes = ["form-control"];
  if (touched && errors) {
    classes.push("is-invalid");
  }

  return classes.join(" ");
};

export function TimePickerField({ ...props }) {
  const { errors, touched } = useFormikContext();
  const [field] = useField(props);
  return (
    <>
      {props.label && <label>{props.label}</label>}
      <TimePicker
        className={getFieldCSSClasses(touched[field.name], errors[field.name])}
        style={{ width: "100%" }}
        autoComplete="off"
        {...field}
        {...props}
        value={field.value || null}
        format={24}
      />
      {errors[field.name] && touched[field.name] ? (
        <div className="invalid-datepicker-feedback">
          {errors[field.name].toString()}
        </div>
      ) : (
        <div className="feedback"></div>
      )}
    </>
  );
}
