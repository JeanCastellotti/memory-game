import { Card } from '../types'

type Props = {
  card: Card
  flipped: boolean
  handleChoice: (card: Card) => void
}

function CardItem({ card, flipped, handleChoice }: Props) {
  function handleClick() {
    handleChoice(card)
  }

  return (
    <div className="relative transition hover:scale-105">
      <div className="h-[180px] w-[180px] object-cover">
        <img
          src={`/cards/${card.src}`}
          alt="card front"
          className={`absolute block h-full w-full rounded border-4 border-white transition duration-200 ease-in ${
            flipped ? 'delay-200' : ''
          }`}
          style={{ transform: flipped ? 'rotateY(0deg)' : 'rotateY(90deg)' }}
        />
        <img
          onClick={handleClick}
          src="/cards/cover.png"
          alt="card back"
          className={`block h-full w-full rounded border-4 border-white transition duration-200 ease-in ${
            flipped ? 'delay-0' : 'delay-200'
          }`}
          style={{
            transform: flipped ? 'rotateY(90deg)' : '',
          }}
        />
      </div>
    </div>
  )
}

export default CardItem
