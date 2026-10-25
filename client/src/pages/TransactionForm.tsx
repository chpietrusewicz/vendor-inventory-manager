import { useState, type FormEvent } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import type { Card } from '../types'
import { PageHeading } from '../components/PageHeading'

export function TransactionPage({ cards, setCards }: { cards: Card[]; setCards: Dispatch<SetStateAction<Card[]>> }) {
  const [name, setName] = useState('')
  const [set, setCardSet] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [condition, setCondition] = useState<Card['condition']>('Raw')
  const [quantity, setQuantity] = useState('1')
  const [price, setPrice] = useState('')
  const [message, setMessage] = useState('')

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const amount = Number(quantity)
    const unitPrice = Number(price)
    const existing = cards.find((card) => card.name.toLowerCase() === name.trim().toLowerCase() && card.set.toLowerCase() === set.trim().toLowerCase() && card.cardNumber.toLowerCase() === cardNumber.trim().toLowerCase())
    if (!name.trim() || !set.trim() || !cardNumber.trim() || !Number.isFinite(amount) || amount < 1 || !Number.isFinite(unitPrice) || unitPrice < 0) {
      setMessage('Enter the card, set, number, quantity, and a valid price.')
      return
    }
    if (!existing || existing.quantity < amount) {
      setMessage('There are not enough copies of this card in inventory.')
      return
    }
    setCards(cards.map((card) => card === existing ? { ...card, quantity: card.quantity - amount, status: card.quantity - amount <= 1 ? 'Low stock' : 'In stock' } : card))
    setName(''); setCardSet(''); setCardNumber(''); setCondition('Raw'); setQuantity('1'); setPrice(''); setMessage('Sale recorded successfully.')
  }

  return <><PageHeading eyebrow="Sales" title="Sell a trading card" description="Record a card sale and keep your collection counts accurate." /><div className="form-layout"><form className="panel form-card" onSubmit={submit}><h2>Card sale details</h2><label>Card name<input value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Charizard ex" /></label><div className="form-row"><label>Set<input value={set} onChange={(event) => setCardSet(event.target.value)} placeholder="e.g. Obsidian Flames" /></label><label>Card number<input value={cardNumber} onChange={(event) => setCardNumber(event.target.value)} placeholder="e.g. 125/197" /></label></div><div className="form-row"><label>Condition<select value={condition} onChange={(event) => setCondition(event.target.value as Card['condition'])}><option value="Raw">Raw</option><option value="Graded">Graded</option></select></label><label>Quantity<input type="number" min="1" value={quantity} onChange={(event) => setQuantity(event.target.value)} /></label></div><label>Unit price ($)<input type="number" min="0" step="0.01" value={price} onChange={(event) => setPrice(event.target.value)} placeholder="0.00" /></label><button className="primary-button" type="submit">Record card sale</button>{message && <p className="form-message" role="status">{message}</p>}</form></div></>
}
