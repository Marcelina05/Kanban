import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { InputAdornment } from '@mui/material'
import searchIcon from 'assets/lupa.png'
import { Avatar } from '@mui/material'
import { getUsername, getAvatarUrl } from 'services/userService'
import Dropdown from '@mui/joy/Dropdown'
import Menu from '@mui/joy/Menu'
import MenuButton from '@mui/joy/MenuButton'
import MenuItem from '@mui/joy/MenuItem'
import { logOut } from 'services/authService'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/joy'

const Navbar = () => {
  const navigate = useNavigate()
  const handleLogOut = () => {
    logOut()
    navigate('/')
  }
  const VisuallyHiddenInput = styled('input')`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1px;
  `

  return (
    <Box className="flex justify-between items-center bg-slate-50 border-solid border-2 border-gray-800 h-16">
      <Typography className="!ml-8 !text-xl">KANBAN ZEN</Typography>
      <TextField
        variant="outlined"
        placeholder="try search a card"
        className="w-1/3"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <img
                src={searchIcon}
                alt="search icon"
                style={{ width: '1.3rem', height: '1.3rem' }}
              />
            </InputAdornment>
          )
        }}
      />
      <Dropdown>
        <MenuButton className="flex justify between items-center !mr-8 !border-none">
          <Box className="flex justify between items-center">
            <Typography className="!mr-4">{getUsername()}</Typography>
            <Avatar className=" !ml-2" alt="user avatar" src={getAvatarUrl()} />
          </Box>
        </MenuButton>
        <Menu>
          <MenuItem component={'label'}>
            Change Avatar
            <VisuallyHiddenInput type="file" />
          </MenuItem>
          <MenuItem onClick={handleLogOut}>Logout</MenuItem>
        </Menu>
      </Dropdown>
    </Box>
  )
}

export default Navbar
