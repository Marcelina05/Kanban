import { Close } from '@mui/icons-material'
import Dropdown from '@mui/joy/Dropdown'
import Menu from '@mui/joy/Menu'
import MenuButton from '@mui/joy/MenuButton'
import MenuItem from '@mui/joy/MenuItem'
import { Avatar, IconButton, Input, InputAdornment, SxProps, Theme } from '@mui/material'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import searchIcon from 'assets/lupa.png'
import Routes from 'enums/Routes'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NotificationService from 'services/NotificationService'
import { logOut } from 'services/authService'
import { getAvatarUrl, getUsername, updateAvatar } from 'services/userService'

interface Props {
  onSearch?: (text: string) => void;
  hideSearch?: boolean;
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

const Navbar = ({ onSearch, hideSearch }: Props) => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState<string>();
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    fetchAvatar()
  }, [])

  const fetchAvatar = async (url?: string) => {
    setAvatar(await getAvatarUrl(url))
  }

  const handleLogOut = () => {
    logOut()
    window.location.reload()
  }

  const handleAvatarUpload = async (event: any) => {
    try {
      const file = event.target.files![0];
      const updatedModel = await updateAvatar(file);
      fetchAvatar(updatedModel.avatar);
      NotificationService.success('Avatar image updated successfully');
    } catch {
      NotificationService.error('Error updating avatar');
    }
  }

  const handleOnSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSearch(value);
  }

  const navigateHome = () => {
    navigate(Routes.HOME);
  }

  useEffect(() => {
    onSearch!(search);
  }, [search])

  return (
    <Box className="flex justify-between items-center bg-slate-50 border-solid border-2 border-gray-800 h-16">
      <Typography className="!ml-8 !text-xl cursor-pointer" onClick={navigateHome} >KANBAN ZEN</Typography>
      {!hideSearch &&
        <TextField
          variant="outlined"
          placeholder="try search a card"
          className="w-1/3"
          size="small"
          onChange={handleOnSearch}
          value={search}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img
                  src={searchIcon}
                  alt="search icon"
                  style={{ width: '1.3rem', height: '1.3rem' }}
                />
              </InputAdornment>
            ),
            endAdornment: (
              !!search ? (<InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" onClick={() => setSearch('')} edge="end">
                  <Close sx={{ fill: 'black' }} />
                </IconButton>
              </InputAdornment>) : (<></>)
            ),
          }}
        />}
      <Dropdown>
        <MenuButton className="flex justify between items-center !mr-8 !border-none">
          <Box className="flex justify between items-center">
            <Typography className="!mr-4">{getUsername()}</Typography>
            <Avatar className=" !ml-2" alt="user avatar" src={avatar} />
          </Box>
        </MenuButton>
        <Menu keepMounted>
          <MenuItem component={'label'}>
            Change Avatar
            <Input type='file' inputProps={{ accept: 'image/*' }} sx={hiddenInputStyles} onChange={handleAvatarUpload} />
          </MenuItem>
          <MenuItem onClick={handleLogOut}>Logout</MenuItem>
        </Menu>
      </Dropdown>
    </Box>
  )
}

export default Navbar