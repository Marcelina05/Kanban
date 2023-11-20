import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import CardStatus from 'enums/CardStatus'
import Card from 'models/Card'
import KanbanCard from './KanbanCard'
import { Box, Dialog, DialogContent, Typography } from '@mui/material'
import { getTitleByStatus } from 'utils/StringUtils'
import { useEffect, useMemo, useState } from 'react'
import { useDroppable } from '@dnd-kit/core'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import CreateCard from 'components/CreateCard'
import Category from 'models/Category'
import { createCard, updateCard } from 'services/CardService'

interface Props {
  status: CardStatus
  cards: Card[]
  saveCard: (cardId: string) => void;
  onDeleteCard: (card: Card) => void;
  onUpdateCard: () => void;
}

const KanbanSection = ({ status, cards, saveCard, onDeleteCard, onUpdateCard }: Props) => {
  const [openDialogForm, setOpenDialogForm] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const title = useMemo(() => getTitleByStatus(status), [status])
  const id = `${status}`;
  const { setNodeRef } = useDroppable({ id });

  const closeForm = () => setOpenDialogForm(false);
  const openForm = () => setOpenDialogForm(true);

  const handleSaveCard = async (title: string, description: string, categories: Category[], cardId = '') => {
    if (!!cardId) {
      const card = cards.find(card => card.id === cardId)!;
      const updated = {
        ...card,
        title,
        description,
        categories: categories.map(cat => cat.id),
      } as unknown as Card;

      updateCard(updated);
      onUpdateCard();
      setSelectedCard(null);
      return;
    }

    const newCard = await createCard(title, description, categories.map(cat => cat.id), status, cards.length);
    saveCard(newCard.id);
  }

  const handleCardUpdate = () => {
    setOpenDialogForm(true);
  }

  useEffect(() => {
    if (!!selectedCard) {
      handleCardUpdate();
    }
  }, [selectedCard])

  return (
    <>
      <Dialog open={openDialogForm} onClose={closeForm} fullWidth maxWidth='lg'>
        <DialogContent className='bg-[#F2F6FA]'>
          <CreateCard onSave={handleSaveCard} onClose={closeForm} card={selectedCard} />
        </DialogContent>
      </Dialog>
      <SortableContext
        id={id}
        items={cards}
        strategy={verticalListSortingStrategy}
      >
        <Box ref={setNodeRef} className="rounded-xl border border-solid !min-h-[75vh] w-2/12 bg-[#F2F6FA]">
          <Box className='flex justify-between items-center w-5/6 m-auto'>
            <Typography className='!font-bold !my-6  uppercase !text-2xl' variant="h2">{title}</Typography>
            <Button onClick={openForm} className='!bg-[#d2defb] !w-10 !h-10 !min-w-0 !mb-2 !rounded-full'>
              <AddIcon />
            </Button>
          </Box>
          <Box className='w-5/6 m-auto'>
            {cards.map((card) => (
              <KanbanCard key={card.id} card={card} onDeleteCard={onDeleteCard} onUpdateCard={setSelectedCard} />
            ))}
          </Box>
        </Box>
      </SortableContext>
    </>
  )
}

export default KanbanSection
