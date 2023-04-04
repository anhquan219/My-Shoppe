import { Outlet } from 'react-router-dom'
import UserSideNav from 'src/components/UserSideNav'

export function UserLayout() {
  return (
    <div>
      <UserSideNav />
      <Outlet />
    </div>
  )
}
