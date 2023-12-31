// 1.判断token是否存在
// 2.如果存在，直接正常渲染
// 3.如果不存在，重定向到登录路由
import { getToken } from '@/utils'
import { Navigate } from 'react-router-dom'
// 高阶组件：把一个组件当成另一个组件的参数传入
// 然后通过一定的判断，返回新的组件

function AuthComponent ({ children }) {
    const isToken = getToken()
    if (isToken) {
      return <>{children}</>
    } else {
        // 重定向组件
      return <Navigate to="/login" replace />
    }
  }

// <AuthComponent> <Layout/> </AuthComponent>
// 登录和不登录返回不同的值
// 登录：<><Layout/></> 
// 非登录：<Navigate to="/login" replace />

export {
    AuthComponent
}