import React from "react";
import AsyncSelect from "react-select/async";
import Select from "react-select";


const customStyles = {
  control: (provided) => ({
    ...provided,
    borderRadius: "0.42rem",
    minHeight: "calc(1.5em + 1.3rem + 2px)",
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
  return (
    <>
      {label && <label>{label}</label>}
      <AsyncSelect
        cacheOptions
        classNamePrefix="select"
        loadOptions={loadOptions}
        defaultOptions={defaultOptions}
        {...props}
        styles={customStyles}
      />
    </>
  );
}

export function SelectSearch({
  label,
  options,
  ...props
}) {
  
  return (
    <>
      {label && <label>{label}</label>}
      <Select
        cacheOptions
        classNamePrefix="select"
        options={options}
        {...props}
        styles={customStyles}
      />
    </>
  );
}
