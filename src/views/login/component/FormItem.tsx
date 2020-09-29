import React, { memo, useEffect, useState, useRef } from "react";
import { Button, Col, Row, Form } from "antd";
import { FormItemProps } from "antd/lib/form";
import Input, { InputProps } from "antd/lib/input";

const COUNT_STATIC = 60;
function useCount(defaultValue: number): [number, () => void, () => void] {
  const timer = useRef<NodeJS.Timer | null>(null);

  const [count, setCount] = useState(defaultValue);

  const closeTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  const beiginTimer = () => {
    setCount((value) => {
      if (value === 0) {
        closeTimer();
        return defaultValue;
      }

      timer.current = setTimeout(() => {
        beiginTimer();
      }, 1000);

      return value - 1;
    });
  };

  return [count, beiginTimer, closeTimer];
}
export interface FormInputItemProps {
  name: string;
  rules: any[];
  formProps: FormItemProps;
  inputProps: InputProps & { visibilityToggle?: boolean };
  countStatic?: number;
  onGetMobileCode?: (cb: () => void) => void;
}

function FormInputItem(props: FormInputItemProps) {
  const [count, beginTimer, closeTimer] = useCount(COUNT_STATIC);

  const onTimerClick = () => {
    if (props.onGetMobileCode) {
      props.onGetMobileCode(() => {
        beginTimer();
      });
    }
  };

  useEffect(
    () => () => {
      // 在验证码情况下，需要在组件卸载的时候清除定时器，防止内存泄漏
      if (props.name === "code") {
        closeTimer();
      }
    },
    []
  );

  return (
    <Form.Item {...props.formProps} name={props.name} rules={props.rules}>
      {(() => {
        switch (props.inputProps.type) {
          case "password":
            return <Input.Password {...props.inputProps}></Input.Password>;
          case "code":
            return (
              <Row gutter={10}>
                <Col span={16}>
                  <Input {...props.inputProps} type="text" />
                </Col>
                <Col span={8}>
                  <Button
                    disabled={(props.countStatic || COUNT_STATIC) !== count}
                    block
                    onClick={onTimerClick}
                  >
                    {count === COUNT_STATIC ? "验证码" : `${count}S`}
                  </Button>
                </Col>
              </Row>
            );
          default:
            return <Input {...props.inputProps}></Input>;
        }
      })()}
    </Form.Item>
  );
}

export default memo(FormInputItem);
