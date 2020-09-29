import routes, { IRouteBase } from "./config";
import config from "../config";
export const businessRoute = routes.find((route) => route.path === "/");
export const businessRouteList = getBusinessRouteList();
/**
 *
 * 将路由转换为一维数组
 * @param routeList 路由
 * @param deep 是否深层转化
 */
export function flattenRoute(
  routeList: IRouteBase[],
  deep: boolean
): IRouteBase[] {
  const result: IRouteBase[] = [];

  for (let i = 0; i < routeList.length; i += 1) {
    const route = routeList[i];
    result.push(route);

    if (route.children && deep) {
      result.push(...flattenRoute(route.children, deep));
    }
  }

  return result;
}
function getBusinessRouteList(): IRouteBase[] {
  const routeList = routes.filter((route) => route.path === "/");

  if (routeList.length > 0) {
    return flattenRoute(routeList, true);
  }
  return [];
}

export function getPageTitle(routeList: IRouteBase[]): string {
  const route = routeList.find(
    (child) => config.BASENAME + child.path === window.location.pathname
  );
  return route ? route.meta.title : "";
}

export function getPagePathList(pathname?: string): string[] {
  return (pathname || window.location.pathname)
    .split("/")
    .filter(Boolean)
    .map((value, index, array) =>
      "/".concat(array.slice(0, index + 1).join("/"))
    );
}

// function getLayoutRouteList(): IRouteBase[] {
//   return flattenRoute(routes, false);
// }

// function getSystemRouteList(): IRouteBase[] {
//   const routeList = routes.filter((route) => route.path === "/system");

//   if (routeList.length > 0) {
//     return flattenRoute(routeList, true);
//   }
//   return [];
// }

/**
 * 这里会将 config 中所有路由解析成三个数组
 * 第一个: 最外层的路由，例如  Layout UserLayout ...
 * 第二个: 系统路由, 例如 Login Register RegisterResult
 * 第三个: 业务路由，为 / 路由下的业务路由
 */

// export const layoutRouteList = getLayoutRouteList();

// export const systemRouteList = getSystemRouteList();

// function findRoutesByPaths(
//   pathList: string[],
//   routeList: IRouteBase[],
//   basename?: string
// ): IRouteBase[] {
//   return routeList.filter(
//     (child: IRouteBase) =>
//       pathList.indexOf((basename || "") + child.path) !== -1
//   );
// }

/**
 * 只有业务路由会有面包屑
 */
// export function getBreadcrumbs(): IRouteBase[] {
//   return findRoutesByPaths(
//     getPagePathList(),
//     businessRouteList,
//     config.BASENAME
//   );
// }
