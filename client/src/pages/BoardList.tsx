import Box from '@mui/material/Box'
import plusIcon from 'assets/plus.png'
import Icon from '@mui/material/Icon'
import Button from '@mui/material/Button'
import Navbar from 'components/Navbar'

const BoardList = () => {
  return (
    <Box className="flex flex-col">
      <Navbar/>
      <Box className="flex flex-col w-[90vw] h-[80vh]  my-8 mx-16 bg-[#E2EAF4] rounded-xl">
        <Box className='flex justify-end mr-4 mt-4'>
          <Button className="!bg-[#C7D6FA] !min-w-0 !w-12 !h-12 !rounded-full ">
            <Icon className="!w-12 !h-12">
              <img src={plusIcon} />
            </Icon>
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default BoardList
