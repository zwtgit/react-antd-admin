import React from "react";
export interface IRouteMeta {
  title: string;
  icon?: string;
  // 是否校验权限
  roles?: string[];
}
export interface IRouteBase {
  // 路由路径
  path: string;
  // 路由组件
  component?: any;
  // 302 跳转
  redirect?: string;
  // 路由信息
  meta: IRouteMeta;
  // 是否校验权限
  roles?: string[];
  // 是否在菜单展示
  showMenu?: boolean;
  children?: IRouteBase[];
}
const routes: IRouteBase[] = [
  {
    path: "/login",
    showMenu: false,
    component: React.lazy(() => import("../views/login/index")),
    meta: {
      title: "登录",
    },
  },
  {
    path: "/",
    showMenu: true,
    component: React.lazy(() => import("../layout/index")),
    meta: {
      title: "系统",
    },
    redirect: "/home",
    children: [
      {
        showMenu: true,
        path: "/home",
        meta: {
          title: "首页",
          roles: ["USER", "ADMIN"],
          icon: "dashboard",
        },
        component: React.lazy(() => import("../views/home")),
      },
      // 以下菜单为系统权限管理
      {
        path: "/test",
        showMenu: true,
        meta: {
          title: "权限管理",
          icon: "setting",
          roles: ["USER", "ADMIN"],
        },
        redirect: "/test/1",
        children: [
          {
            path: "/test/1",
            showMenu: true,
            meta: {
              title: "菜单管理",
              icon: "menu",
              roles: ["USER", "ADMIN"],
            },
            component: React.lazy(() => import("../views/test/1")),
          },
          {
            path: "/test/2",
            showMenu: true,
            meta: {
              title: "角色管理",
              icon: "team",
              roles: ["USER", "ADMIN"],
            },
            component: React.lazy(() => import("../views/test/2")),
          },
        ],
      },
      // 以下的路由改动请小心，涉及权限校验模块
      {
        path: "/error",
        showMenu: false,
        meta: {
          title: "错误页面",
          roles: ["USER", "ADMIN"],
        },
        redirect: "/error/404",
        children: [
          {
            path: "/error/404",
            component: React.lazy(() => import("../views/error/404")),
            meta: {
              title: "页面不存在",
              roles: ["USER", "ADMIN"],
            },
          },
          // {
          //   path: "/error/403",
          //   component: React.lazy(() => import("../views/error/403")),
          //   meta: {
          //     title: "暂无权限",
          //     roles: ["USER", "ADMIN"],
          //   },
          // },
        ],
      },
      {
        path: "/*",
        showMenu: false,
        meta: {
          title: "错误页面",
          roles: ["USER", "ADMIN"],
        },
        component: React.lazy(() => import("../views/error/404")),
        redirect: "/error/404",
      },
    ],
  },
];
export default routes;
