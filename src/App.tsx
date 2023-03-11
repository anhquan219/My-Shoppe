import useRouterElement from './useRouterElement'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const routeElements = useRouterElement()
  return (
    <div>
      {routeElements}
      <ToastContainer />
    </div>
  )
}

export default App
