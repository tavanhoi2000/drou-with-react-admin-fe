import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { FieldFeedbackLabel } from "./FieldFeedbackLabel";
import { get } from "lodash";

const getFieldCSSClasses = (touched, errors) => {
  const classes = ["form-control"];
  if (touched && errors) {
    classes.push("is-invalid");
  }
  /*
  if (touched && !errors) {
    classes.push("is-valid");
  }
  */
  return classes.join(" ");
};

export function Input({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  withFeedbackLabel = false,
  customFeedbackLabel,
  type = "text",
  focus = false,
  ...props
}) {
  const inputRef = useRef();
  useEffect(() => {
    focus && inputRef.current.focus();
  }, [focus]);

  return (
    <>
      {label && <label>{label}</label>}
      <input
        ref={inputRef}
        type={type}
        autoComplete={props.autoComplete || "off"}
        {...field}
        {...props}
        className={`${props.className} ${getFieldCSSClasses(
          get(touched, field.name),
          get(errors, field.name)
        )}`}
      />
      {withFeedbackLabel && (
        <FieldFeedbackLabel
          error={errors[field.name]}
          touched={touched[field.name]}
          label={label}
          type={type}
          customFeedbackLabel={customFeedbackLabel}
        />
      )}
    </>
  );
}
