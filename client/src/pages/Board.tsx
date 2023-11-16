import { Box } from '@mui/material'
import MockBoard from 'mocks/MockBoard'
import Board from 'models/Board'
import Card from 'models/Card'
import { useEffect, useMemo, useState } from 'react'
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  DragCancelEvent
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import CardStatus from 'enums/CardStatus'
import KanbanSection from 'components/KanbanSection'
import { generateId } from 'utils/EntityUtils'
import { DragOverlay } from '@dnd-kit/core'
import KanbanCard from 'components/KanbanCard'
import Navbar from 'components/Navbar'

const BoardPage = () => {
  const [board, setBoard] = useState<Board>(MockBoard)
  const [cards, setCards] = useState<Card[]>([])
  const [activeId, setActiveId] = useState<string>('')

  const getCards = (status: CardStatus): Card[] => {
    return cards
      .filter((card) => card.status === status)
      .sort((c1, c2) => c1.order - c2.order)
  }

  const TodoCards = useMemo(() => getCards(CardStatus.TO_DO), [cards])
  const inProgressCards = useMemo(
    () => getCards(CardStatus.IN_PROGRESS),
    [cards]
  )
  const reviewCards = useMemo(() => getCards(CardStatus.REVIEW), [cards])
  const doneCards = useMemo(() => getCards(CardStatus.DONE), [cards])

  const items = {
    [CardStatus.TO_DO]: TodoCards,
    [CardStatus.IN_PROGRESS]: inProgressCards,
    [CardStatus.REVIEW]: reviewCards,
    [CardStatus.DONE]: doneCards
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  useEffect(() => {
    setCards(
      board.cards.map((card, index) => {
        return {
          ...card,
          id: generateId(),
          order: index + 1,
          title: `${card.title} ${index + 1}`
        }
      })
    )
  }, [board])

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(`${event.active.id}`)
  }

  const handleDragCancel = (event: DragCancelEvent) => {
    setActiveId('')
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    const id = active.id
    const overId = over?.id ?? ''

    // If dragging is not happen over a card we should return and do nothing
    if (!overId || id === overId) {
      return
    }

    // If over happens on a new category section of cards we change the status for card
    if (overId in CardStatus) {
      const status = overId as CardStatus
      const orderedCards = cards.map((card) => {
        if (card.id === id) {
          return {
            ...card,
            status
          }
        }

        return card
      })

      setCards(orderedCards)
      return
    }

    // If over element is an item

    // if the active element is placed below an element we should add to the array after the over element
    // Otherwise should be before
    const isBelowOverItem =
      over &&
      active.rect.current.translated &&
      active.rect.current.translated.top > over.rect.top + over.rect.height

    const indexModifier = isBelowOverItem ? 1 : 0

    // Retrieve both active and over card
    const activeCard = cards.find((card) => card.id === id) as Card
    const overCard = cards.find((card) => card.id === overId) as Card

    // Get status and index of over card
    const { status, order } = overCard

    const toAdd: Card = {
      ...activeCard,
      status,
      order: order + indexModifier
    }

    // Get cards only by type
    const typecards = [...getCards(status)].sort(
      (c1, c2) => c1.order - c2.order
    )

    const newIndex = isBelowOverItem
      ? order + indexModifier - 2
      : order + indexModifier - 1

    if (activeCard.status === overCard.status) {
      // If the status is the same we should delete the element that is in the array before of movement
      typecards.splice(activeCard.order - 1, 1)
    }

    // Add in new index the element to Add
    typecards.splice(newIndex, 0, toAdd)

    const ordered = typecards.map((card, index) => {
      return {
        ...card,
        order: index + 1
      }
    })

    setCards((oldCards) => {
      const newCards = oldCards.map((card) => {
        const newCard = ordered.find((tc) => tc.id === card.id)
        if (!!newCard) {
          return newCard
        }
        return card
      })

      return newCards
    })
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId('')
  }

  return (
    <Box>
      <Navbar />
      <Box className="flex mt-16 justify-evenly">
        <DndContext
          collisionDetection={closestCorners}
          sensors={sensors}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragCancel={handleDragCancel}
        >
          {Object.keys(items).map((key) => (
            //@ts-ignore
            <KanbanSection key={key} cards={items[key]} status={key} />
          ))}
          <DragOverlay>
            {!!activeId ? (
              <KanbanCard
                card={cards.find((card) => card.id === activeId) as Card}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </Box>
    </Box>
  )
}

export default BoardPage
