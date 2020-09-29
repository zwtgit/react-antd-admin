import React, { memo } from "react";
import { Spin } from "antd";
import { connect } from "react-redux";
import routes, { IRouteBase } from "../router/config";
import { businessRoute } from "../router/utils";
import { IStoreState } from "../store/types";
import { setSideBarRoutes } from "../store/module/app";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Route, Switch } from "react-router-dom";

interface TransitionMainProps {
  children: React.ReactNode;
}
interface AsyncRoutesProps {
  children: React.ReactNode;
  init: boolean;
  setSideBarRoutes: (routes: IRouteBase[]) => void;
}

function AsyncRoutes(props: AsyncRoutesProps) {
  if (!props.init) {
    // apiGetMenuList()
    //   .then(({ data }) => {
    setTimeout(() => {
      let list = [
        {
          id: 5,
          name: "首页",
          url: "/home",
          icon: "DashboardOutlined",
          desc: "首页",
        },
        {
          id: 1,
          name: "权限管理",
          url: "/test",
          icon: "MenuUnfoldOutlined",
          desc: "权限管理",
          sort: 10,
          parentId: 0,
          level: 1,
        },
        {
          id: 1,
          name: "权限管理1",
          url: "/test/1",
          icon: "MenuUnfoldOutlined",
          desc: "权限管理",
          sort: 10,
          parentId: 0,
          level: 1,
        },
        {
          id: 1,
          name: "权限管理2",
          url: "/test/2",
          icon: "MenuUnfoldOutlined",
          desc: "权限管理",
          sort: 10,
          parentId: 0,
          level: 1,
        },
      ];
      let sideBarRoutes: IRouteBase[] = formatMenuToRoute(
        businessRoute!.children!
      );
      // if (businessRoute && businessRoute.children) {
      //   sideBarRoutes = formatMenuToRoute(businessRoute.children);
      // }
      function formatMenuToRoute(routes: IRouteBase[]): IRouteBase[] {
        const result: IRouteBase[] = [];
        routes.forEach((item) => {
          const route: IRouteBase = {
            path: item.path,
            meta: item.meta,
            showMenu: list.some((sub) => sub.url === item.path),
          };
          if (item.children) {
            route.children = formatMenuToRoute(item.children);
          }
          result.push(route);
        });
        return result;
      }
      // console.log(2222, sideBarRoutes);
      props.setSideBarRoutes(sideBarRoutes);
    }, 1000);

    // })
    // .catch(() => {});
    return <Spin className="layout__loading" />;
  }
  return (
    <Route
      render={({ location }) => (
        <TransitionGroup className="layout__route">
          <CSSTransition
            key={location.pathname}
            classNames="layout__route"
            timeout={300}
          >
            <Switch location={location}>{props.children}</Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
    ></Route>
  );
}

export default connect(({ app }: IStoreState) => ({ init: app.init }), {
  setSideBarRoutes,
})(memo(AsyncRoutes));
