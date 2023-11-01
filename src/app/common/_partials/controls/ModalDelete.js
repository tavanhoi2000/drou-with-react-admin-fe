import { Modal } from "react-bootstrap";
import { useIntl } from "react-intl";
import React from "react";

export function ModalDelete({
  show,
  close,
  deleteName,
  onClick: handleClick,
  title,
  content,
  children,
}) {
  const intl = useIntl();
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children ? (
          children
        ) : (
          <>
            {content} <strong>{deleteName}</strong>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-light btn-elevate btn-primary font-weight-bold mr-2 py-2 px-3 px-xxl-5 my-1"
          onClick={close}
        >
          {intl.formatMessage({ id: "common_cancel" })}
        </button>
        <button
          type="button"
          className="btn btn-sm btn-danger font-weight-bold mr-2 py-2 px-3 px-xxl-5 my-1"
          onClick={handleClick}
        >
          {intl.formatMessage({ id: "common_delete" })}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
