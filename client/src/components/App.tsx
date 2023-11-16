import BoardPage from 'pages/Board'
import CreateCard from 'pages/CreateCard'
import Home from 'pages/Home'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PrivateRoute from 'components/PrivateRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/kanban',
    element: (
      <PrivateRoute>
        <BoardPage />
      </PrivateRoute>
    )
  },
  {
    path: '/create',
    element: (
      <PrivateRoute>
        <CreateCard />
      </PrivateRoute>
    )
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App
