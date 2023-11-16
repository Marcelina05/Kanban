import Board from 'models/Board'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import deleteIcon from 'assets/borrar.png'
import editIcon from 'assets/editar.png'
import Icon from '@mui/material/Icon'
import Button from '@mui/material/Button'

interface Props {
  board: Board
}

const BoardCard = ({ board }: Props) => {
  return (
    <Box className="items-center flex justify-between bg-slate-50 w-5/6 h-15 rounded-lg">
      <Box className="ml-4">
        <Typography className="!ml-4 !mt-2">{board.title}</Typography>
        <Typography className="!ml-4 !mt-1 text-[#495057] opacity-75">
          {`${board.created}`}
        </Typography>
      </Box>
      <Box className="mr-8 flex justify-between">
        <Button className="!m-1 grid justify-items-end">
          <Icon>
            <img src={editIcon} />
          </Icon>
        </Button>
        <Button>
          <Icon>
            <img src={deleteIcon} />
          </Icon>
        </Button>
      </Box>
    </Box>
  )
}
