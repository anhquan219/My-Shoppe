import { useContext, useEffect } from 'react'
import useRouterElement from './useRouterElement'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AppContext } from './contexts/app.context'
import { LocalStorageEventTarget } from './utils/auth'

function App() {
  const routeElements = useRouterElement()
  const { reset } = useContext(AppContext)

  useEffect(() => {
    // Lắng nghe sự kiện, nếu bắt được sự kiện 'clearLS' thì chạy func reset
    LocalStorageEventTarget.addEventListener('clearLS', reset)

    // Remove sự kiện khi app bị distroy tránh tràn bộ nhớ
    return () => {
      LocalStorageEventTarget.removeEventListener('clearCL', reset)
    }
  }, [reset])

  return (
    <div>
      {routeElements}
      <ToastContainer />
    </div>
  )
}

export default App
