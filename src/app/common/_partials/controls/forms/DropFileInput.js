import React, { useRef, useState } from "react";
import "./DropFileInput.css";
import { Icon } from "@material-ui/core";
import { useIntl } from "react-intl";

function DropFileInput({ onChange, accept }) {
  const intl = useIntl();

  const wrapperRef = useRef();

  const onUploadFile = (e) => {
    const files = e.target.files;
    if (!files) return;
    const file = files[0];
    onChange(file);
    e.target.value = null;
  };

  const onDragEnter = () => {
    wrapperRef.current.classList.add("dragover");
  };

  const onDragLeave = () => {
    wrapperRef.current.classList.remove("dragover");
  };

  const onDrop = () => {
    wrapperRef.current.classList.remove("dragover");
  };

  return (
    <div
      className="w-100 h-100px"
      ref={wrapperRef}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="drop-file-label bg-light w-100 h-100">
        <input type="file" onChange={onUploadFile} accept={accept || "*"}></input>
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
          <Icon className="fas fa-cloud-upload-alt w-30px text-secondary"></Icon>
          <p className="mb-0 text-secondary">
            {intl.formatMessage({
              id: "common_field_file_upload",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DropFileInput;
