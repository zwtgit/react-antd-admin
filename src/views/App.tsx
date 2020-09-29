import React, { Suspense } from "react";
import { Spin } from "antd";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import routes, { IRouteBase } from "../router/config";
// import { layoutRouteList } from "../router/utils";
import config from "../config";
// console.log(routes);
function App() {
  return (
    <Suspense fallback={<Spin size="large" className="layout__loading" />}>
      <Router basename={config.BASENAME}>
        <Switch>
          {routes.map((route: IRouteBase) => (
            <Route
              key={config.BASENAME + route.path}
              path={route.path}
              component={route.component}
            ></Route>
          ))}
          {/* <Redirect from="/*" to="/error/404" /> */}
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
