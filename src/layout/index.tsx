import React, { Suspense } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { Spin } from "antd";
import { IStoreState } from "../store/types";
import "./index.scss";
import Sidebar from "./SideBar/index";
import { Settings } from "../store/module/settings";
import Header from "./Header";

import AuthRoutes from "./authRoutes";

interface LayoutProps {
  layout: Settings["layout"];

  colorWeak: boolean;

  fixedHeader: boolean;

  contentWidth: Settings["contentWidth"];
}

function Layout(props: LayoutProps) {
  return (
    <>
      <section
        className={classnames({
          layout: true,
          "layout--side-bar": props.layout === "side",
          "layout--weak": props.colorWeak,
        })}
      >
        {props.layout === "side" && <Sidebar />}
        <section className={classnames("layout__main")}>
          <Header />
          <div
            className={classnames("layout__container", {
              "layout__container--fix": props.fixedHeader,
              "layout__container--fixed":
                props.contentWidth === "fixed" && props.layout === "top",
            })}
          >
            <Suspense
              fallback={<Spin size="large" className="layout__loading" />}
            >
              <AuthRoutes />
            </Suspense>
          </div>
        </section>
      </section>
    </>
  );
}

export default connect(
  ({
    settings: { layout, colorWeak, fixedHeader, contentWidth },
  }: IStoreState) => ({
    layout,
    colorWeak,
    fixedHeader,
    contentWidth,
  })
)(Layout);
