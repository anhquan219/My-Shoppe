import { Outlet, useRoutes, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Registertlayout from './layouts/RegistertLayout'
import Login from './pages/login'
import ProductList from './pages/ProductList'
import Profile from './pages/Profile'
import Register from './pages/Register'

const isAuthenticated = true

function ProtectedRoute() {
  // Đi vào Outlet sẽ truy cập tiếp vào các children
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' /> // to='/' trỏ đến vị trí index = true
}

export default function useRouterElement() {
  const routerElement = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: 'login',
          element: (
            <Registertlayout>
              <Login />
            </Registertlayout>
          )
        },
        {
          path: 'register',
          element: (
            <Registertlayout>
              <Register />
            </Registertlayout>
          )
        }
      ]
    },
    {
      path: '',
      index: true, // Xác định trang chính để k bị vòng lặp khi đặt sai vị trí (Trang k đăng nhâp cũng có thể vào)
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: 'profile',
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        }
      ]
    }
  ])
  return routerElement
}
