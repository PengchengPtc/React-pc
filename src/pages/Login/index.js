import { Card, message } from "antd";
import logo from "@/assets/logo.png";
import "./index.scss";
import { Form, Input, Button, Checkbox } from "antd";
import { useStore } from "@/store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loginStore } = useStore();
  // 获取跳转实例对象
  const navigate = useNavigate();
  async function onfinish(values) {
    console.log(values);
    // values: 放置所有表单项中用户输入的内容
    // todo：登录
    await loginStore.setToken({
      mobile: values.username,
      code: values.password,
    });
    // 跳转到首页
    navigate("/", { replace: true });
    message.success("登录成功！");
  }
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        {/** 子项中用到的触发事件，需要在form中都声明一下 */}
        <Form
          initialValues={{ remember: true }}
          validateTrigger={["onBlur", "onChange"]}
          onFinish={onfinish}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "请输入手机号!" },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: "手机号码格式不对",
                validateTrigger: "onBlur",
              },
            ]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { len: 6, message: "验证码6个字符", validateTrigger: "onBlur" },
              { required: true, message: "请输入验证码" },
            ]}
          >
            <Input size="large" placeholder="请输入验证码" />
          </Form.Item>
          <Form.Item name="remember">
            <Checkbox className="login-checkbox-label">
              我已阅读并同意「用户协议」和「隐私条款」
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
