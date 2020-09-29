import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuOutlined,
  UserOutlined,
  TeamOutlined,
  DashboardOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import { IRouteBase, IRouteMeta } from "../../router/config";
import "./index.scss";
import config from "../../config";

const iconMap: { [prop: string]: any } = {
  MenuUnfoldOutlined: <MenuUnfoldOutlined translate="yes" />,
  MenuOutlined: <MenuOutlined translate="yes" />,
  UserOutlined: <UserOutlined translate="yes" />,
  TeamOutlined: <TeamOutlined translate="yes" />,
  DashboardOutlined: <DashboardOutlined translate="yes" />,
  ReadOutlined: <ReadOutlined translate="yes" />,
};

function renderTitle(meta: IRouteMeta) {
  /* eslint-disable no-confusing-arrow */
  return (
    <span className="menu-item-inner">
      {meta.icon && iconMap[meta.icon]}
      <span className="menu-title"> {meta.title} </span>
    </span>
  );
}

function renderMenuRoute(menu: IRouteBase) {
  // console.log(222, menu.showMenu);
  if (menu.showMenu !== false) {
    return (
      <Menu.Item key={config.BASENAME + menu.path}>
        <Link to={menu.path}>{renderTitle(menu.meta)}</Link>
      </Menu.Item>
    );
  }
}

function renderSubMenu(menu: IRouteBase) {
  if (menu.showMenu !== false) {
    return (
      <Menu.SubMenu
        title={renderTitle(menu.meta)}
        key={config.BASENAME + menu.path}
      >
        {menu.children!.map((item: IRouteBase) =>
          item.children ? renderSubMenu(item) : renderMenuRoute(item)
        )}
      </Menu.SubMenu>
    );
  }
}

function renderMenu(menu: IRouteBase) {
  if (menu.children) {
    return renderSubMenu(menu);
  }
  return renderMenuRoute(menu);
}

export default renderMenu;
