import React from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { Menu } from "antd";
import Logo from "../SidebarLogo";
import { IStoreState } from "../../store/types";
import { AppState } from "../../store/module/app";
import { IRouteBase } from "../../router/config";
import renderMenu from "../SideMenu";
import "./index.scss";
import { Settings } from "../../store/module/settings";

interface LayoutSideBarProps extends Settings {
  sidebar: AppState["sidebar"];
  routes: AppState["routes"];
  init: boolean;
}
function getPagePathList(pathname?: string): string[] {
  return (pathname || window.location.pathname)
    .split("/")
    .filter(Boolean)
    .map((value, index, array) =>
      "/".concat(array.slice(0, index + 1).join("/"))
    );
}
function LayoutSideBar({ theme, layout, sidebar, routes }: LayoutSideBarProps) {
  const inlineCollapsed: { inlineCollapsed?: boolean } = {};

  if (layout === "side") {
    inlineCollapsed.inlineCollapsed = !sidebar.opened;
  }

  const { pathname } = window.location;
  return (
    <aside
      className={classnames(
        "layout__side-bar",
        `layout__side-bar--${theme}`,
        `layout__side-bar--${layout}`,
        {
          "layout__side-bar--close": !sidebar.opened && layout === "side",
        }
      )}
    >
      <div className={`layout__side-bar__logo--${layout}`}>
        <Logo opened={!sidebar.opened} layout={layout!} />
      </div>
      <div className="layout__side-bar__menu">
        <Menu
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={
            layout === "side" && sidebar.opened ? getPagePathList(pathname) : []
          }
          theme={theme}
          mode={layout === "side" ? "inline" : "horizontal"}
          {...inlineCollapsed}
        >
          {routes.map((menu: IRouteBase) => renderMenu(menu))}
        </Menu>
      </div>
    </aside>
  );
}

export default connect(
  ({ settings, app: { sidebar, routes, init } }: IStoreState) => ({
    ...settings,
    sidebar,
    routes,
    init,
  })
)(LayoutSideBar);
