import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Navbar from 'components/Navbar'
import { Chip, Dialog, DialogContent, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useEffect, useState } from 'react'
import Category from 'models/Category'
import NotificationService from 'services/NotificationService'
import CreateCategory from './CreateCategory'
import Colors from 'enums/Colors'
import AddIcon from '@mui/icons-material/Add'
import { createCategory, getAllCategories } from 'services/categoryService'
import { getUserId } from 'services/userService'
import CategoryChip from './CategoryChip'


interface Props {
  onSave: (title: string, description: string, categories: Category[]) => void;
  onClose: () => void;
}

const CreateCard = ({ onSave, onClose }: Props) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [updateOn, setUpdateOn] = useState<Date>(new Date());
  const [categories, setCategories] = useState<Category[]>([]);
  const [availableCategories, setAvailableCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    const response = await getAllCategories(getUserId());
    setAvailableCategories(response);
  }

  useEffect(() => {
    fetchCategories();
  }, [updateOn]);

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

  const closeForm = () => setOpenDialog(false);

  const handleCategoryCreation = async (name: string, color: Colors) => {
    await createCategory(name, color, getUserId());
    setUpdateOn(new Date());
  }

  return (
    <>
      <Dialog open={openDialog} onClose={closeForm} fullWidth maxWidth='md'>
        <DialogContent className='bg-[#F2F6FA]'>
          <CreateCategory onClose={closeForm} onSave={handleCategoryCreation} />
        </DialogContent>
      </Dialog>
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
          <Box className="bg-[#E2EAF4] flex flex-col items-center w-[100%] my-2">
            <Box className='flex relative w-[80%] items-baseline'>
              <Typography className="!mt-2 !text-lg w-[100%] text-center">Categories</Typography>
              <Button onClick={() => setOpenDialog(true)} className='!bg-[#d2defb] !w-10 !h-10 !min-w-0 !mb-2 !rounded-full !absolute !right-12'>
                <AddIcon />
              </Button>
            </Box>
            {!!availableCategories.length &&
              <Select
                size='small'
                multiple
                className='w-2/3 !my-8 bg-neutral-100 rounded-lg'
                value={categories}
                onChange={(event: SelectChangeEvent<Category[]>) => {
                  setCategories(event.target.value as Category[]);
                }}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((category) => (
                      <CategoryChip key={category.id} category={category} />
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
            }
          </Box>
          <Button
            onClick={handleCreate}
            variant="contained"
            className="!m-auto !mb-8 w-1/3"
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
    </>
  )
}

export default CreateCard
