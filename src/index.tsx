import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css'
import './styles/index.styl'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import * as serviceWorker from './serviceWorker'
import routes from '@/routes'
import { Provider } from 'react-redux'
import store from '@/store'

interface RouteItem {
  path: string
  component: React.FC
}
// 解构 route
// function renderRoutes(routes: RouteItem[], contextPath: String) {
//   return (
//   <Switch>
//     {routes.map(item => (
//       <Route key={item.path} component={item.component} path={item.path}></Route>
//     ))}
//   </Switch>)
// }

// const children = renderRoutes(routes, '/')

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        <Switch>
          {routes.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              component={item.component}
            >
            </Route>
          ))}
        </Switch>
      </Provider>
      
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
