import { toAbsoluteUrl } from "../../../common/_helpers";
import React from "react";
import SVG from "react-inlinesvg";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export const ActionsColumnFormatter = (cell, row, rowIndex, { translate, openEdit }) => {
  return (
    <OverlayTrigger
      overlay={<Tooltip id="user-detail-tooltip">{translate({ id: "common_edit" })}</Tooltip>}
    >
      <a
        className="btn btn-icon btn-light btn-hover-primary btn-sm"
        key="edit"
        onClick={() => openEdit(row)}
      >
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")} />
        </span>
      </a>
    </OverlayTrigger>
  );
};
