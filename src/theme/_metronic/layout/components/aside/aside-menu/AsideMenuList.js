/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "app/common/_helpers";

export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
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
            <span className="menu-text">Dashboard</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/* Account */}
        {/* begin::section */}
        <li className="menu-section ">
          <h4 className="menu-text">Accounts</h4>
          <i className="menu-icon flaticon-more-v2"></i>
        </li>
        {/* end:: section */}

        {/* Account Pages */}
        {/*begin::1 Level*/}
        <li className={`menu-item ${getMenuItemActive("/account", false)}`} aria-haspopup="true">
          <NavLink className="menu-link" to="/account">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Stamp.svg")} />
            </span>
            <span className="menu-text">Accounts</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/* Tool */}
        {/* begin::section */}
        <li className="menu-section ">
          <h4 className="menu-text">Tools</h4>
          <i className="menu-icon flaticon-more-v2"></i>
        </li>
        {/* end:: section */}

        {/* Account Pages */}
        {/*begin::1 Level*/}
        <li className={`menu-item ${getMenuItemActive("/tool", false)}`} aria-haspopup="true">
          <NavLink className="menu-link" to="/tool">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Join-1.svg")} />
            </span>
            <span className="menu-text">Sessions</span>
          </NavLink>
        </li>

        {/*end::1 Level*/}
      </ul>

      {/* end::Menu Nav */}
    </>
  );
}
