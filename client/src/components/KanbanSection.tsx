import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import CardStatus from 'enums/CardStatus'
import Card from 'models/Card'
import KanbanCard from './KanbanCard'
import { Box, Typography } from '@mui/material'
import { getTitleByStatus } from 'utils/StringUtils'
import { useMemo } from 'react'
import { useDroppable } from '@dnd-kit/core'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'

interface Props {
  status: CardStatus
  cards: Card[]
}

const KanbanSection = ({ status, cards }: Props) => {
  const title = useMemo(() => getTitleByStatus(status), [status])
  const id = `${status}`;
  const {setNodeRef} = useDroppable({id});

  return (
    <SortableContext
      id={id}
      items={cards}
      strategy={verticalListSortingStrategy}
    >
      <Box ref={setNodeRef} className="rounded-xl border border-solid !min-h-[80vh] h-5/6 w-2/12">
        <Box className='flex justify-evenly'>
          <Typography className='!font-bold !my-6 !ml-6 uppercase !text-3xl'  variant="h2">{title}</Typography>
          <Button>
            <AddIcon/>
          </Button>
        </Box>
        {cards.map((card) => (
          <KanbanCard key={card.id} card={card} />
        ))}
      </Box>
    </SortableContext>
  )
}

export default KanbanSection
