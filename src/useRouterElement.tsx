import { useRoutes } from 'react-router-dom'
import Registertlayout from './layouts/RegistertLayout'
import Login from './pages/login'
import ProductList from './pages/ProductList'
import Register from './pages/Register'

export default function useRouterElement() {
  const routerElement = useRoutes([
    {
      path: '/',
      element: <ProductList />
    },
    {
      path: '/login',
      element: (
        <Registertlayout>
          <Login />
        </Registertlayout>
      )
    },
    {
      path: '/register',
      element: (
        <Registertlayout>
          <Register />
        </Registertlayout>
      )
    }
  ])
  return routerElement
}
