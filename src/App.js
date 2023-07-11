import {Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import Layout from "@/pages/Layout";
import { AuthComponent } from "./components/AuthComponent";
import "./App.css";
import Publish from "./pages/Publish";
import Article from "./pages/Article";
import Home from "./pages/Home";
import { HistoryRouter, history } from './utils/history'
// import { Button } from "antd";

function App() {
  return (
    // 路由配置
    <HistoryRouter history={history}>
      <div className="App">
        {/* <Button type="primary">Button</Button> */}
        <Routes>
          {/*创建路由path和组件对应的关系 */}
          {/**layout需要鉴权处理 */}
          {/**这里的layout不能写死，要根据是否登录进行判断 */}
          <Route
            path="/"
            element={
              <AuthComponent>
                <Layout />
              </AuthComponent>
            }
          >
            {/* 二级路由默认页面 */}
            <Route index element={<Home />} />
            <Route path="article" element={<Article />} />
            <Route path="publish" element={<Publish />} />
          </Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
    </HistoryRouter>
  );
}

export default App;
