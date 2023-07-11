import { Layout, Menu, Popconfirm } from "antd";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { useStore } from "@/store";
import { useEffect } from "react";
// 刷新的时候跟新一下
import { observer } from "mobx-react-lite";

const { Header, Sider } = Layout;

const GeekLayout = () => {
  const { userStore, loginStore } = useStore();
  const location = useLocation();
  useEffect(() => {
    try {
      userStore.getUserInfo();
      console.log(userStore);
    } catch {}
  }, [userStore]);
  const navigate = useNavigate();
  const onLogout = () => {
    loginStore.loginOut();
    navigate("/login");
  };
  // 这里是当前浏览器上的路径地址
  const selectedKey = location.pathname;
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{userStore.userInfo.mobile}</span>
          <span className="user-logout">
            <Popconfirm
              onConfirm={onLogout}
              title="是否确认退出？"
              okText="退出"
              cancelText="取消"
            >
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          {/**高亮的原理：defaultSelectedKeys === item key */}
          {/**获取当前激活的path路径？ */}
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={[selectedKey]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item icon={<HomeOutlined />} key="/">
              <Link to="/">数据概览</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/article">
              <Link to="/article">内容管理</Link>
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} key="/publish">
              <Link to="/publish">发布文章</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/**二级路由出口 */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default observer(GeekLayout);
