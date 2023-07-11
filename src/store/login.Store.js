// login module
import { makeAutoObservable } from "mobx";
import { http ,setToken,clearToken} from "@/utils";

class LoginStore {
  token = "";
  constructor() {
    // 响应式,创建实例对象就调用
    makeAutoObservable(this);
  }
  // async来修饰了，则settoken返回值为一个promise对象，login里面的index.js也得用async去修饰，代表异步，异步跳转
  setToken = async ({ mobile, code }) => {
    const res = await http.post("http://geek.itheima.net/v1_0/authorizations", {
      mobile,
      code,
    });
    console.log(res.data);
    this.token = res.data.token;
    // 存入token
    setToken(this.token)
  };
   // 退出登录
   loginOut = () => {
    this.token = ''
    clearToken()
  }
}
export default LoginStore;
