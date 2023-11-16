import { useEffect, useState } from 'react'
import { userIsLogged } from 'services/authService'
import BoardList from 'pages/BoardList'
import PrivateRoute from 'components/PrivateRoute'
import Login from 'pages/Login'

const Home = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false)

  const verifyPermission = () => {
    setIsLogged(userIsLogged())
  }

  useEffect(() => {
    verifyPermission()
  }, [])

  return isLogged ? (
    <PrivateRoute>
      <BoardList />
    </PrivateRoute>
  ) : (
    <Login />
  )
}

export default Home
