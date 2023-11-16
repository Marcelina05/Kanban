import { InputAdornment, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import LockIcon from '@mui/icons-material/Lock'
import AccountCircle from '@mui/icons-material/AccountCircle'
import PasswordIcon from 'assets/candado.png'
import PasswordOnIcon from 'assets/password_on.png'
import PasswordOffIcon from 'assets/password_off.png'
import UserIcon from 'assets/usuario.png'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { useFormik } from 'formik'
import { login, signUp } from 'services/authService'
import { Form } from 'formik'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const toggleForm = () => setIsLogin((value) => !value)
  const navigate = useNavigate()

  const handleLogin = (values: any) => {
    login(values.username, values.password)
      .then((_) => navigate('/boards'))
      .catch((error) =>
        toast.error(`Invalid credentials`, {
          position: toast.POSITION.TOP_RIGHT
        })
      )
  }

  const handleSignup = (values: any) => {
    signUp(
      values.username,
      values.email,
      values.password,
      values.passwordConfirmation
    )
      .then((_) => navigate('/boards'))
      .catch((error) => {
        console.log('error: ', error)
        toast.error('Invalid inputs', {
          position: toast.POSITION.TOP_RIGHT
        })
      })
  }

  const loginForm = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: handleLogin
  })

  const signupForm = useFormik({
    initialValues: {
      username: '',
      password: '',
      email: '',
      passwordConfirmation: ''
    },
    onSubmit: handleSignup
  })

  return (
    <Box className="flex">
      <Box className="relative overflow-hidden h-screen w-1/2">
        <Box className="absolute z-30 left-0 -top-7 rounded-r-full overflow-hidden h-[108%] my-auto  w-9/12 bg-light border-solid border-2 border-light" />
        <Box className="absolute z-20 left-0 -top-7 rounded-r-full overflow-hidden h-[108%] my-auto w-10/12 bg-medium border-solid border-2 border-medium" />
        <Box className="absolute z-10 left-0 -top-7 rounded-r-full overflow-hidden h-[108%] my-auto w-11/12 bg-dark border-solid border-2 border-dark" />
      </Box>
      <Box className="w-1/2 flex flex-col my-auto">
        <Box className="flex justify-evenly w-4/5">
          <Button
            className={`!text-xl w-2/5 !py-2 !underline !font-roboto !text-black !border-0 ${
              isLogin ? '!bg-light' : ''
            }`}
            variant="outlined"
            onClick={() => setIsLogin(true)}
          >
            Login
          </Button>
          <Button
            className={`!text-xl w-2/5 !py-2 !underline !font-roboto !text-black !border-0 ${
              !isLogin ? '!bg-light' : ''
            }`}
            variant="outlined"
            onClick={() => setIsLogin(false)}
          >
            Sign-Up
          </Button>
        </Box>
        {isLogin ? (
          <form
            onSubmit={loginForm.handleSubmit}
            className="flex flex-col p-8 w-4/5 h-1/2"
          >
            <TextField
              name="username"
              onChange={loginForm.handleChange}
              value={loginForm.values.username}
              label="Username or email"
              className="!m-auto !my-3 w-4/5 bg-neutral-100"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img
                      src={UserIcon}
                      alt="user icon"
                      style={{ width: '1.3rem', height: '1.3rem' }}
                    />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              name="password"
              type={showPassword ? 'text' : 'password'}
              onChange={loginForm.handleChange}
              value={loginForm.values.password}
              label="Password"
              className="!m-auto !my-3 w-4/5 bg-neutral-100"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img
                      src={PasswordIcon}
                      alt="password icon"
                      style={{ width: '1.65rem', height: '1.65rem' }}
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="start">
                    <Button
                      sx={{
                        width: '1.75rem',
                        height: '1.45rem',
                        minWidth: 'unset',
                        padding: '0 !important'
                      }}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <img
                        src={showPassword ? PasswordOffIcon : PasswordOnIcon}
                        alt="password icon"
                        style={{ width: '1.65rem', height: '1.65rem' }}
                      />
                    </Button>
                  </InputAdornment>
                )
              }}
            />
            <Button
              type="submit"
              variant="contained"
              className="!m-auto !my-3 w-4/5"
              sx={{
                backgroundColor: '#9F8BF9',
                '&:hover': { backgroundColor: '#BEB1FB' }
              }}
              size="medium"
            >
              Login
            </Button>
          </form>
        ) : (
          <form
            onSubmit={signupForm.handleSubmit}
            className="flex flex-col p-8 w-4/5 h-1/2"
          >
            <TextField
              name="username"
              onChange={signupForm.handleChange}
              value={signupForm.values.username}
              label="Username"
              className="!m-auto !my-3 w-4/5 bg-neutral-100"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img
                      src={UserIcon}
                      alt="user icon"
                      style={{ width: '1.3rem', height: '1.3rem' }}
                    />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              name="email"
              onChange={signupForm.handleChange}
              value={signupForm.values.email}
              label="Email"
              className="!m-auto !my-3 w-4/5 bg-neutral-100"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img
                      src={UserIcon}
                      alt="user icon"
                      style={{ width: '1.3rem', height: '1.3rem' }}
                    />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              name="password"
              type={showPassword ? 'text' : 'password'}
              onChange={signupForm.handleChange}
              value={signupForm.values.password}
              label="Password"
              className="!m-auto !my-3 w-4/5 bg-neutral-100"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img
                      src={PasswordIcon}
                      alt="password icon"
                      style={{ width: '1.65rem', height: '1.65rem' }}
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="start">
                    <Button
                      sx={{
                        width: '1.75rem',
                        height: '1.45rem',
                        minWidth: 'unset',
                        padding: '0 !important'
                      }}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <img
                        src={showPassword ? PasswordOffIcon : PasswordOnIcon}
                        alt="password icon"
                        style={{ width: '1.65rem', height: '1.65rem' }}
                      />
                    </Button>
                  </InputAdornment>
                )
              }}
            />
            <TextField
              name="passwordConfirmation"
              onChange={signupForm.handleChange}
              value={signupForm.values.passwordConfirmation}
              label="Confirm Password"
              className="!m-auto !my-3 w-4/5 bg-neutral-100"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img
                      src={PasswordIcon}
                      alt="password icon"
                      style={{ width: '1.65rem', height: '1.65rem' }}
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="start">
                    <Button
                      sx={{
                        width: '1.75rem',
                        height: '1.45rem',
                        minWidth: 'unset',
                        padding: '0 !important'
                      }}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <img
                        src={showPassword ? PasswordOffIcon : PasswordOnIcon}
                        alt="password icon"
                        style={{ width: '1.65rem', height: '1.65rem' }}
                      />
                    </Button>
                  </InputAdornment>
                )
              }}
            />
            <Button
              type="submit"
              variant="contained"
              className="!m-auto !my-3 w-4/5"
              sx={{
                backgroundColor: '#9F8BF9',
                '&:hover': { backgroundColor: '#BEB1FB' }
              }}
              size="medium"
            >
              Sign up
            </Button>
          </form>
        )}
      </Box>
    </Box>
  )
}

export default Login
