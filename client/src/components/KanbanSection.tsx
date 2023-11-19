import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import CardStatus from 'enums/CardStatus'
import Card from 'models/Card'
import KanbanCard from './KanbanCard'
import { Box, Dialog, DialogContent, Typography } from '@mui/material'
import { getTitleByStatus } from 'utils/StringUtils'
import { useMemo, useState } from 'react'
import { useDroppable } from '@dnd-kit/core'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import CreateCard from 'pages/CreateCard'
import Category from 'models/Category'
import { createCard } from 'services/CardService'

interface Props {
  status: CardStatus
  cards: Card[]
  saveCard: (cardId: string) => void;
}

const KanbanSection = ({ status, cards, saveCard }: Props) => {
  const [openDialogForm, setOpenDialogForm] = useState<boolean>(false);
  const title = useMemo(() => getTitleByStatus(status), [status])
  const id = `${status}`;
  const { setNodeRef } = useDroppable({ id });

  const closeForm = () => setOpenDialogForm(false);
  const openForm = () => setOpenDialogForm(true);

  const handleSaveCard = async (title: string, description: string, categories: Category[]) => {
    const newCard = await createCard(title, description, categories, status, cards.length);
    saveCard(newCard.id);
  }

  return (
    <>
      <Dialog open={openDialogForm} onClose={closeForm} fullWidth maxWidth='md'>
        <DialogContent className='bg-[#F2F6FA]'>
          <CreateCard onSave={handleSaveCard} onClose={closeForm} />
        </DialogContent>
      </Dialog>
      <SortableContext
        id={id}
        items={cards}
        strategy={verticalListSortingStrategy}
      >
        <Box ref={setNodeRef} className="rounded-xl border border-solid !min-h-[80vh] h-5/6 w-2/12 bg-[#F2F6FA]">
          <Box className='flex justify-between items-center w-5/6 m-auto'>
            <Typography className='!font-bold !my-6  uppercase !text-2xl' variant="h2">{title}</Typography>
            <Button onClick={openForm} className='!bg-[#d2defb] !w-10 !h-10 !min-w-0 !mb-2 !rounded-full'>
              <AddIcon />
            </Button>
          </Box>
          <Box className='w-5/6 m-auto'>
            {cards.map((card) => (
              <KanbanCard key={card.id} card={card} />
            ))}
          </Box>
        </Box>
      </SortableContext>
    </>
  )
}

export default KanbanSection
