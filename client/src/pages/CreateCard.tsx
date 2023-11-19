import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Navbar from 'components/Navbar'
import { Chip, MenuItem, Select } from '@mui/material'
import { useState } from 'react'
import Category from 'models/Category'
import NotificationService from 'services/NotificationService'

interface Props {
  onSave: (title: string, description: string, categories: Category[]) => void;
  onClose: () => void;
}

const CreateCard = ({ onSave, onClose }: Props) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [availableCategories, setAvailableCategories] = useState<Category[]>([]);

  const handleTitleChange: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTitle(value);
  }

  const handleDescriptionChange: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setDescription(value);
  }

  const handleCreate = () => {
    try {
      onSave(title, description, categories);
      onClose();
    } catch {
      NotificationService.error('Error creating card. Check the info!');
    }
  }

  return (
    <Box>
      <Box className="flex flex-col items-center justify-center w-[90%] h-[90%]  my-8 mx-16 bg-[#E2EAF4] rounded-xl">
        <Box className="bg-[#E2EAF4] flex flex-col items-center w-[100%] my-2">
          <Typography className="!mt-2 !text-lg">Title</Typography>
          <TextField
            value={title}
            onChange={handleTitleChange}
            placeholder="Insert the title"
            className="w-2/3 !mb-2 bg-neutral-100 rounded-lg"
            size="small"
          />
        </Box>
        <Box className="bg-[#E2EAF4] flex flex-col items-center w-[100%] my-2">
          <Typography className="!mt-2 !text-lg">Description</Typography>
          <TextField
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Insert a description"
            className="w-2/3 !mb-2 bg-neutral-100 rounded-lg"
            multiline
            size='small'
            rows={4}
            maxRows={4}
          />
        </Box>
        {!!availableCategories.length &&
          <Box className="bg-[#E2EAF4] flex flex-col items-center w-[100%] my-2">
            <Typography className="!mt-2 !text-lg">Categories</Typography>
            <Select
              size='small'
              multiple
              className='w-2/3 !mb-2 bg-neutral-100 rounded-lg'
              value={categories}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value.id} label={value.name} />
                  ))}
                </Box>
              )}
            >
              {availableCategories.map(category => (
                //@ts-ignore
                <MenuItem
                  key={category.id}
                  value={category}
                >
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        }
        <Button
          onClick={handleCreate}
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
    </Box>
  )
}

export default CreateCard
