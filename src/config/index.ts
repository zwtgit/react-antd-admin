export interface Config {
  BASENAME?: string;

  SUCCESS_CODE: number;

  LOGIN_EXPIRE: number;

  API_URL: string;

  TOKEN_KEY: string;

  layout: "side" | "top";

  theme: "dark" | "light";

  fixedHeader: boolean;

  contentWidth: "fluid" | "fixed";

  colorWeak: boolean;

  title: string;

  logo?: string;
}

const AdminConfig: Config = {
  // react-router basename
  BASENAME: "/react-ant-admin",

  // 请求成功状态码
  SUCCESS_CODE: 200,

  // 登录过期，或者未登录
  LOGIN_EXPIRE: 400,

  // 统一请求地址
  API_URL: "https://www.landluck.com.cn/react-ant-admin-api",

  // 本地存储token 的key
  TOKEN_KEY: "Admin_Token_key",

  // 默认菜单栏位置 side|左侧 top|顶部菜单
  layout: "side",

  // 默认主题颜色
  theme: "dark",

  // 是否固定头部
  fixedHeader: true,

  // 固定宽度或者流式宽度 fluid|根据屏幕宽度自动  fixed|定宽
  contentWidth: "fluid",

  // 是否开启色弱模式
  colorWeak: false,

  // 项目名称
  title: "React Ant Admin",

  // logo
  logo:
    "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80",
};

export default AdminConfig;
