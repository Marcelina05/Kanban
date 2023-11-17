import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import LoginForm from 'components/LoginForm'
import RegisterForm from 'components/RegisterForm'
import { useState } from 'react'

const Login = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true)
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
            className={`!text-xl w-2/5 !py-2 !underline !font-roboto !text-black !border-0 ${isLogin ? '!bg-light' : ''
              }`}
            variant="outlined"
            onClick={() => setIsLogin(true)}
          >
            Login
          </Button>
          <Button
            className={`!text-xl w-2/5 !py-2 !underline !font-roboto !text-black !border-0 ${!isLogin ? '!bg-light' : ''
              }`}
            variant="outlined"
            onClick={() => setIsLogin(false)}
          >
            Sign-Up
          </Button>
        </Box>
        {isLogin ? (
          <LoginForm />
        ) : (
          <RegisterForm />
        )}
      </Box>
    </Box>
  )
}

export default Login
