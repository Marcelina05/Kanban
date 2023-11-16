import { useSortable } from '@dnd-kit/sortable'
import { Box, Typography } from '@mui/material'
import Card from 'models/Card'
import { CSS } from '@dnd-kit/utilities'

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
    <Box
      className={`${isDragging? 'opacity-50': ''} select-none my-4 border-2 border-solid border-slate-500 w-5/6 mx-auto py-4`}
      ref={setNodeRef}
      sx={style}
      {...attributes}
      {...listeners}
    >
      <Typography className="!mx-4">{card.title}</Typography>
      <Typography className="!mx-4">{card.description}</Typography>
    </Box>
  )
}

export default KanbanCard
