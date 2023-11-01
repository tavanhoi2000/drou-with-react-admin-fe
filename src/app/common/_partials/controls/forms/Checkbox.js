import React, { useEffect, useState } from "react";
import {useField, useFormikContext} from "formik";

export function Checkbox({ 
  field,
  form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  value="0",
  topLabel,
  withFeedbackLabel = false,
  customFeedbackLabel,
  isSelected, children,
  ...props }) {
  
  const { setFieldValue } = useFormikContext();
  //const [field] = useField(props);


  return (
    <>
    {topLabel && <label>{topLabel}</label>}
    <label className="checkbox checkbox-lg checkbox-single">
      <input type="checkbox"
      checked={field.value}
      {...field}
      {...props}/>
      <span />&nbsp;{label}
    </label>
    </>
  );
}
