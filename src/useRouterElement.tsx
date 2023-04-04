import path from 'src/constants/path'
import { useContext } from 'react'
import { Outlet, useRoutes, Navigate } from 'react-router-dom'
import { AppContext } from './contexts/app.context'
import MainLayout from './layouts/MainLayout'
import Registertlayout from './layouts/RegistertLayout'
import Login from './pages/login'
import ProductList from './pages/ProductList'
import Profile from './pages/Profile'
import Register from './pages/Register'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import CartLayout from './layouts/CartLayout'
import UserLayout from './pages/User/UserLayout'
import ChangePassword from './pages/User/pages/ChangePassword'
import HistoryPurchase from './pages/User/pages/HistoryPurchase'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  // render Outlet sẽ truy cập tiếp vào các children
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  // render Outlet sẽ truy cập tiếp vào các children
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' /> // to='/' trỏ đến vị trí index = true
}

export default function useRouterElement() {
  const routerElement = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <Registertlayout>
              <Login />
            </Registertlayout>
          )
        },
        {
          path: path.register,
          element: (
            <Registertlayout>
              <Register />
            </Registertlayout>
          )
        }
      ]
    },
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
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
          path: path.cart,
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
          )
        },
        {
          path: path.user,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: <Profile />
            },
            {
              path: path.changePassword,
              element: <ChangePassword />
            },
            {
              path: path.hitoryPurchase,
              element: <HistoryPurchase />
            }
          ]
        }
      ]
    }
  ])
  return routerElement
}
