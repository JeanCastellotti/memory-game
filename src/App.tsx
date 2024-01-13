import { useEffect, useState } from 'react'
import CardItem from './components/CardItem'
import { Card } from './types'

const cards = [
  'sword.png',
  'shield.png',
  'potion.png',
  'scroll.png',
  'ring.png',
  'helmet.png',
]

function App() {
  const [shuffledCards, setShuffledCards] = useState<Card[]>([])
  const [turns, setTurns] = useState(0)
  const [choices, setChoices] = useState<Card[]>([])
  const [matchedCards, setMatchedCards] = useState<number[]>([])

  function shuffleCards() {
    setShuffledCards(
      [...cards, ...cards]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({ src: card, id: Math.random() })),
    )
    setChoices([])
    setTurns(0)
  }

  function handleChoice(card: Card) {
    if (choices.length === 2) return
    choices.at(0)
      ? setChoices((c) => [c[0], card])
      : setChoices((c) => [...c, card])
  }

  useEffect(() => {
    if (choices.length < 2) return
    if (choices[0].src === choices[1].src) {
      setMatchedCards((matchedCards) => [
        ...matchedCards,
        ...choices.map((choice) => choice.id),
      ])
      nextTurn()
    } else {
      setTimeout(() => nextTurn(), 1000)
    }
  }, [choices])

  useEffect(() => shuffleCards(), [])

  function nextTurn() {
    setChoices([])
    setTurns((t) => t + 1)
  }

  return (
    <div className="min-h-screen bg-[#1b1523] p-10">
      <main className="mx-auto flex max-w-screen-md flex-col items-center gap-10">
        <h1 className="text-4xl font-bold text-white">Memory Game</h1>
        <button
          onClick={shuffleCards}
          className="rounded border-white bg-white px-2 py-1.5 text-lg font-medium text-[#1b1523] transition hover:scale-110"
        >
          New Game
        </button>

        <div className="grid grid-cols-4 gap-6">
          {shuffledCards.map((card) => (
            <CardItem
              key={card.id}
              card={card}
              flipped={
                matchedCards.includes(card.id) ||
                choices.some((c) => c.id === card.id)
              }
              handleChoice={handleChoice}
            />
          ))}
        </div>

        <span className="text-white">Turns: {turns}</span>
      </main>
    </div>
  )
}

export default App
