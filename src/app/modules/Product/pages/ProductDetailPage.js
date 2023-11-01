import React from "react";
import { useIntl } from "react-intl";

function ProductDetailPage({ productDetail, onClose, openEdit }) {
  const intl = useIntl();
  return (
    <>
      <div id="kt_quick_panel" className="pt-5 pb-10 w-500px">
        <div className="offcanvas-header offcanvas-header-navs">
          <span>&nbsp;</span>
        </div>
        <div
          className="offcanvas-close mt-n1 pr-5"
          style={{ position: "absolute", top: "15px", right: "10px" }}
        >
          <div
            className="btn btn-xs btn-icon btn-light btn-hover-primary"
            id="kt_quick_panel_close"
            onClick={onClose}
          >
            <i className="ki ki-close icon-xs text-muted"></i>
          </div>
        </div>
        <div className="flex-row-auto pl-10 pr-10" id="kt_profile_aside">
          {/* begin::Class */}
          <div className="d-flex align-items-center">
            <div>
              <a
                href="#"
                className="font-weight-bolder font-size-h5 text-dark-75 text-hover-primary"
              >
                {productDetail.name}
              </a>
            </div>
          </div>

          <div className="py-9">
            <div className="d-flex align-items-center mb-2">
              <span className="text-70 mr-2 font-weight-bold">
                {intl.formatMessage({ id: "product_detail_name" })}:
              </span>
              <span className="text-hover-primary ">
                {productDetail.name}
              </span>
            </div>
            <div className="mb-2">
              <div className="text-70 mr-2 font-weight-bold">
                {intl.formatMessage({ id: "product_detail_description" })}:
              </div>
              <span
                className="text-hover-primary "
                dangerouslySetInnerHTML={{ __html: productDetail.description }}
              ></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailPage;
