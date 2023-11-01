/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { Icon } from "@material-ui/core";
import { toAbsoluteUrl, checkIsActive } from "../../../../common/_helpers";
import { useIntl } from "react-intl";

export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  const intl = useIntl();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open menu-item-not-hightlighted`
      : "";
  };

  return (
    <>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level*/}
        <li className={`menu-item ${getMenuItemActive("/dashboard", false)}`} aria-haspopup="true">
          <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">{intl.formatMessage({ id: "menu_dashboard" })}</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

        
        {/*begin::1 Level*/}
        <li className={`menu-item ${getMenuItemActive("/product", false)}`} aria-haspopup="true">
          <NavLink className="menu-link" to="/product">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Stamp.svg")} />
            </span>
            <span className="menu-text">Dịch vụ</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

      </ul>

      {/* end::Menu Nav */}
    </>
  );
}
