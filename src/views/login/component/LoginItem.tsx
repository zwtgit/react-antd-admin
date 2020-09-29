import React, { memo, useCallback } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { InputProps } from "antd/lib/input";
import { FormItemProps, FormInstance } from "antd/lib/form";
import FormInputItem from "./FormItem";

export interface LoginItemType {
  Account: React.FC<LoginItemProps>;
  Password: React.FC<LoginItemProps>;
  Confirm: React.FC<LoginItemProps>;
  Mobile: React.FC<LoginItemProps>;
}

interface LoginItemConfig {
  name: string;
  rules: any[];
  inputProps: InputProps & { visibilityToggle?: boolean };
}

interface LoginItemProps {
  countStatic?: number;
  onGetMobileCode?: (cb: () => void) => void;
  form: FormInstance;
}

const config: { [key in keyof LoginItemType]: LoginItemConfig } = {
  Account: {
    name: "account",
    inputProps: {
      prefix: <UserOutlined translate="yes" />,
      placeholder: "6-18位账号",
      type: "text",
    },
    rules: [{ required: true, message: "请输入合法账号", min: 6, max: 18 }],
  },
  Mobile: {
    name: "mobile",
    inputProps: {
      prefix: <UserOutlined translate="yes" />,
      placeholder: "11位合法手机号",
      type: "mobile",
    },
    rules: [{ required: true, message: "请输入合法手机号", len: 11 }],
  },
  Password: {
    name: "password",
    inputProps: {
      prefix: <LockOutlined translate="yes" />,
      placeholder: "大于6位的密码",
      type: "password",
      visibilityToggle: true,
    },
    rules: [{ required: true, message: "请输入合法密码", min: 5 }],
  },
  Confirm: {
    name: "repassword",
    inputProps: {
      id: "confirm",
      prefix: <LockOutlined translate="yes" />,
      placeholder: "确认密码",
      type: "password",
      visibilityToggle: true,
    },
    rules: [],
  },
};

const formProps: FormItemProps = {
  hasFeedback: true,
  children: null,
};

function Account(props: LoginItemProps) {
  return <FormInputItem formProps={formProps} {...config.Account} {...props} />;
}

function Password(props: LoginItemProps) {
  return (
    <FormInputItem formProps={formProps} {...config.Password} {...props} />
  );
}

function Confirm(props: LoginItemProps) {
  return (
    <FormInputItem
      formProps={formProps}
      {...config.Confirm}
      {...props}
      rules={[
        { required: true, message: "请输入合法密码" },
        {
          validator: (
            rules: any,
            value: string,
            callback: (message?: string) => void
          ) => {
            if (value && value !== props.form.getFieldValue("password")) {
              callback("两次输入的密码不一致，请重新输入");
            }

            callback();
          },
        },
      ]}
    />
  );
}

function Mobile(props: LoginItemProps) {
  return <FormInputItem formProps={formProps} {...config.Mobile} {...props} />;
}

const LoginItem: LoginItemType = {
  Account: memo(Account),
  Password: memo(Password),
  Confirm: memo(Confirm),
  Mobile: memo(Mobile),
};

export default LoginItem;
