import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import AddIcon from '@mui/icons-material/Add'
import { Box, Button, Chip, Paper, Typography } from '@mui/material'
import Card from 'models/Card'
import ColorUtils from 'utils/ColorUtils'
import DateUtils from 'utils/DateUtils'


interface Props {
  card: Card
}

const KanbanCard = ({ card }: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: card.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <Paper
      elevation={1}
      className={`${isDragging ? 'opacity-50' : ''} select-none my-4 w-[100%] mx-auto py-4 !rounded-lg`}
      ref={setNodeRef}
      sx={style}

    >
      <Box className='!mx-2 items-baseline'>
        {card.categories.map(category => (
          <Chip
            key={category.id}
            label={category.name}
            onClick={() => console.log("")}
            sx={{
              backgroundColor: ColorUtils.getColorBackground(category.color),
              color: ColorUtils.getColorTitle(category.color),
            }}
          />))}
        <Button className='!bg-[#d2defb] !mx-2 !w-4 !h-4 !min-w-0 !rounded-full'>
          <AddIcon sx={{ width: '0.8rem' }} />
        </Button>
      </Box>
      <Box {...attributes} {...listeners}>
        <Typography className="!mx-4 !my-2 uppercase">{card.title}</Typography>
        <Typography className="!mx-4">{card.description}</Typography>
        <Typography className='!mx-4 capitalize !mt-4 text-[#495057] opacity-75' >{DateUtils.formatDate(card.created)}</Typography>
      </Box>
    </Paper>
  )
}

export default KanbanCard
