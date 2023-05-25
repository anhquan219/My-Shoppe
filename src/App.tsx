import { useContext, useEffect } from 'react'
import useRouterElement from './useRouterElement'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AppContext, AppProvider } from './contexts/app.context'
import { LocalStorageEventTarget } from './utils/auth'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ErrorBoundary from './components/ErrorBoundary'
import { HelmetProvider } from 'react-helmet-async' // Hỗ trợ viết thẻ meta (SEO) cho từng page

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
    <HelmetProvider>
      <AppProvider>
        <ErrorBoundary>
          {routeElements}
          <ToastContainer />
        </ErrorBoundary>
      </AppProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </HelmetProvider>
  )
}

export default App
