import Dropdown from '@mui/joy/Dropdown'
import Menu from '@mui/joy/Menu'
import MenuButton from '@mui/joy/MenuButton'
import MenuItem from '@mui/joy/MenuItem'
import { Avatar, Input, InputAdornment, SxProps, Theme } from '@mui/material'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import searchIcon from 'assets/lupa.png'
import { useNavigate } from 'react-router-dom'
import NotificationService from 'services/NotificationService'
import { logOut } from 'services/authService'
import { getAvatarUrl, getUsername, updateAvatar } from 'services/userService'

const Navbar = () => {
  const handleLogOut = () => {
    logOut()
    window.location.reload()
  }

  const hiddenInputStyles: SxProps<Theme> = {
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: '1px',
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: '1px',
  }

  const handleAvatarUpload = (event: any) => {
    try {
      const file = event.target.files![0];
      updateAvatar(file);
      NotificationService.success('Avatar image updated successfully');
    } catch {
      NotificationService.error('Error updating avatar');
    }
  }

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
        <Menu keepMounted>
          <MenuItem component={'label'}>
            Change Avatar
            <Input type='file' inputProps={{accept: 'image/*'}} sx={hiddenInputStyles} onChange={handleAvatarUpload} />
          </MenuItem>
          <MenuItem onClick={handleLogOut}>Logout</MenuItem>
        </Menu>
      </Dropdown>
    </Box>
  )
}

export default Navbar