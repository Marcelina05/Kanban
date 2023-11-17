import Board from 'models/Board'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import deleteIcon from 'assets/borrar.png'
import editIcon from 'assets/editar.png'
import Icon from '@mui/material/Icon'
import Button from '@mui/material/Button'
import { deleteBoard } from 'services/boardService'
import NotificationService from 'services/NotificationService'
import { useState } from 'react'
import ConfirmationDialog from './ConfirmationDialog'

interface Props {
  board: Board;
  /**
   * Function for notify change to parent component
  */
  notify: () => void;
  onUpdate: (board: Board) => void;
}

const BoardCard = ({ board, notify, onUpdate: onEdit }: Props) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const toggleDialog = () => setOpenDialog(value => !value);


  const handleDelete = async () => {
    try {
      const wasDeleted = await deleteBoard(board.id);
      notify();
      NotificationService.success('Board deleted successfully');
    } catch (error) {
      NotificationService.error(`Error deleting board ${board.title}`);
    }
  }

  const handleUpdate = async () => { }

  return (
    <>
      <Box className="items-center flex justify-between bg-slate-50 w-5/6 h-15 rounded-lg my-2">
        <Box className="ml-4">
          <Typography className="!ml-4 !mt-2">{board.title}</Typography>
          <Typography className="!ml-4 !mt-1 text-[#495057] opacity-75">
            {`${board.created}`}
          </Typography>
        </Box>
        <Box className="mr-8 flex justify-between">
          <Button className="!m-1 grid justify-items-end" onClick={() => onEdit(board)}>
            <Icon>
              <img src={editIcon} />
            </Icon>
          </Button>
          <Button onClick={toggleDialog}>
            <Icon>
              <img src={deleteIcon} />
            </Icon>
          </Button>
        </Box>
      </Box>
      <ConfirmationDialog open={openDialog} onClose={toggleDialog} onSuccess={handleDelete} />
    </>
  )
}

export default BoardCard;