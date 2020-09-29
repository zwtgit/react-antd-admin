import React, { memo } from "react";
import { connect } from "react-redux";
import { IStoreState } from "../../store/types";
import { setSideBarRoutes, clearSideBarRoutes } from "../../store/module/app";
import { AppState } from "../../store/module/app";
import { Button } from "antd";
import { IRouteBase } from "../../router/config";
interface testProps {
  routes: AppState["routes"];
  clearSideBarRoutes: () => void;
  setSideBarRoutes: (routes: IRouteBase[]) => void;
}
function test(props: testProps) {
  console.log(props);
  const onButtonClick = () => {
    props.clearSideBarRoutes();
    let routers = props.routes;
    routers.forEach((item) => {
      if (item.path === "/test" && item.children) {
        item.children[1].showMenu = !item.children[1].showMenu;
      }
    });
    props.setSideBarRoutes(routers);
  };
  return (
    <div>
      <Button size="small" type="link" onClick={() => onButtonClick()}>
        更改点击权限
      </Button>
    </div>
  );
}

export default connect(({ app: { routes } }: IStoreState) => ({ routes }), {
  setSideBarRoutes,
  clearSideBarRoutes,
})(memo(test));
