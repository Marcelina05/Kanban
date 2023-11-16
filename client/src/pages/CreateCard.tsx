import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const CreateCard = () => {
  return (
    <Box className="flex flex-col items-center justify-center w-[90vw] h-[80vh]  my-8 mx-16 bg-[#E2EAF4] rounded-xl">
      <Box className="bg-[#E2EAF4] flex flex-col items-center w-2/4">
        <Typography className="!mt-2 !text-lg">Title</Typography>
        <TextField
          placeholder="Try search a card"
          className="w-2/3 !mb-2 bg-neutral-100 rounded-lg"
          size="small"
        />
      </Box>
      <Box className="bg-[#E2EAF4] flex flex-col items-center w-2/4">
        <Typography className="!mt-2 !text-lg">Description</Typography>
        <TextField
          placeholder="Insert a description"
          className="w-2/3 !mb-2 bg-neutral-100 rounded-lg"
          multiline
          maxRows={4}
        />
      </Box>
      <Box className="bg-[#E2EAF4] flex flex-col items-center w-2/4">
        <Typography className="!mt-2 !text-lg">Categories</Typography>
        <TextField
          placeholder='select a category' 
          className="w-2/3 !mb-2 bg-neutral-100 rounded-lg"
          size="small"
          select
        />
      </Box>
      <Button
              variant="contained"
              className="!m-auto !my-3 w-1/3"
              sx={{
                backgroundColor: '#9F8BF9',
                '&:hover': { backgroundColor: '#BEB1FB' }
              }}
              size="medium"
            >
              Create
            </Button>
    </Box>
  )
}

export default CreateCard
