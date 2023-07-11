// https://github.com/remix-run/react-router/issues/8264

// 导入一个函数
import { createBrowserHistory } from 'history'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'


const history = createBrowserHistory()

export {
  HistoryRouter,
  history
}