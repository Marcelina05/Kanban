import { useEffect, useState } from 'react'
import { userIsLogged } from 'services/authService'
import BoardList from 'pages/BoardList'
import PrivateRoute from 'components/PrivateRoute'
import Login from 'pages/Login'
import NotificationService from 'services/NotificationService'
import { useLocation } from 'react-router-dom'

const Home = () => {
  const location = useLocation();

  const handleError = () => {
    if (!!location.state?.error) {
      NotificationService.error('Page not found');
    }
  }

  useEffect(() => {
    handleError();
  }, [])

  return userIsLogged() ? (
    <PrivateRoute>
      <BoardList />
    </PrivateRoute>
  ) : (
    <Login />
  )
}

export default Home
