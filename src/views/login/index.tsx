import React, { useState, useCallback } from "react";
import { Tabs, Checkbox, Button, Form, Typography, Layout } from "antd";
import { Link, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { apiUserLogin } from "../../api/login";
import { Helmet } from "react-helmet";
import { getPageTitle } from "../../router/utils";
import { setUserInfo, UserState } from "../../store/module/user";
import LoginItem from "./component/LoginItem";
import routes from "../../router/config";
interface LoginProps extends RouteComponentProps {
  setUserInfo: (userInfo: UserState) => void;
}

interface FormProp {
  account?: string;
  password?: string;
  code?: number;
}

function Login(props: LoginProps) {
  console.log(props);
  const [form] = Form.useForm();

  const next = () => {
    const params = new URLSearchParams(window.location.search);
    const redirectURL = params.get("redirectURL");
    if (redirectURL) {
      window.location.href = redirectURL;
      return;
    }
    props.history.push("/");
  };

  const onSubmit = useCallback(() => {
    form.validateFields().then((res) => {
      const values = res as FormProp;
      if (values.account && values.password) {
        // apiUserLogin({
        //   account: values.account,
        //   password: values.password,
        // })
        //   .then(({ data }: { data: UserState }) => {
        const data: UserState = {
          token: "1098fec36d421e90410146cbc8f7ed05",
          account: "q438721",
          avatar: "",
          id: 117,
          role: 1,
          // status: 1,
        };
        props.setUserInfo(data);
        next();
        // })
        // .catch(() => {});
        return;
      }
    });
  }, []);
  const title = getPageTitle(routes);
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>
      <div className="container">
        <div className="content">
          <div className="top">
            <Typography.Title className="header">
              <span className="title">React Ant Admin </span>
            </Typography.Title>
            <div className="desc">React Ant Admin 是 Admin 这条街最靓的仔</div>
          </div>
          <div
            className="page-login"
            style={{
              width: "300px",
              margin: "80px auto 0",
            }}
          >
            <Form onFinish={onSubmit} form={form}>
              <LoginItem.Account form={form} />
              <LoginItem.Password form={form} />

              <Form.Item>
                <Button block htmlType="submit" type="primary">
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <Layout.Footer style={{ textAlign: "center" }}>
          学习 使我 快乐
        </Layout.Footer>
      </div>
    </>
  );
}

export default connect(() => ({}), {
  setUserInfo,
})(Login);
