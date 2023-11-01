import React from "react";
import {useFormikContext} from "formik";

export function Radio({ 
  field,
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  withFeedbackLabel = false,
  isSelected, onChange, children,
  ...props }) {
  
  const { setFieldValue } = useFormikContext();


  return (
    <>
    <label className="radio radio-lg radio-single">
        <input type="radio"
        onChange={val => {
          setFieldValue(field.name, val);
        }}
        checked={field.value === props.value}
        {...field}
        {...props}/>
        {children}
        <span />&nbsp;{label}
      </label>
    </>
  );
}
