import { useState, type FormEvent } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import type { Card } from '../types'
import { PageHeading } from '../components/PageHeading'

type ItemKind = 'cash' | 'card'
type TransactionItem = {
  id: number
  kind: ItemKind
  bills: number[]
  name: string
  set: string
  cardNumber: string
  condition: Card['condition']
  quantity: string
  value: string
}

const denominations = [1, 5, 10, 20, 50, 100]
const newCashItem = (id: number): TransactionItem => ({ id, kind: 'cash', bills: [], name: '', set: '', cardNumber: '', condition: 'Raw', quantity: '1', value: '' })
const newCardItem = (id: number): TransactionItem => ({ id, kind: 'card', bills: [], name: '', set: '', cardNumber: '', condition: 'Raw', quantity: '1', value: '' })

export function MakeTransactionPage({ cards, setCards }: { cards: Card[]; setCards: Dispatch<SetStateAction<Card[]>> }) {
  const [nextId, setNextId] = useState(3)
  const [giving, setGiving] = useState([newCashItem(1)])
  const [getting, setGetting] = useState([newCashItem(2)])
  const [message, setMessage] = useState('')

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const give = parseItems(giving)
    const get = parseItems(getting)
    if (!give || !get) {
      setMessage('Complete every item on both sides of the transaction.')
      return
    }

    let nextCards = cards
    for (const item of give.filter((entry) => entry.kind === 'card')) {
      const existing = findCard(nextCards, item)
      if (!existing || existing.quantity < item.quantity) {
        setMessage(`There are not enough copies of ${item.name} in inventory.`)
        return
      }
      nextCards = nextCards.map((card) => card === existing
        ? { ...card, quantity: card.quantity - item.quantity, status: card.quantity - item.quantity <= 1 ? 'Low stock' : 'In stock' }
        : card)
    }
    for (const item of get.filter((entry) => entry.kind === 'card')) {
      const existing = findCard(nextCards, item)
      nextCards = existing
        ? nextCards.map((card) => card === existing ? { ...card, quantity: card.quantity + item.quantity, status: 'In stock' } : card)
        : [...nextCards, { name: item.name, set: item.set, cardNumber: item.cardNumber, condition: item.condition, quantity: item.quantity, cost: item.value, status: 'In stock' }]
    }

    setCards(nextCards)
    setGiving([newCashItem(nextId)])
    setGetting([newCashItem(nextId + 1)])
    setNextId(nextId + 2)
    setMessage('Transaction recorded successfully.')
  }

  return (
    <>
      <PageHeading eyebrow="Card transactions" title="Make a transaction" description="Add what you give and what you get. Each side can include multiple cash or card items." />
      <form className="transaction-form" onSubmit={submit}>
        <div className="transaction-sides">
          <TransactionSide title="What you give" items={giving} setItems={setGiving} nextId={nextId} setNextId={setNextId} />
          <TransactionSide title="What you get" items={getting} setItems={setGetting} nextId={nextId} setNextId={setNextId} />
        </div>
        <button className="primary-button" type="submit">Save transaction</button>
        {message && <p className="form-message" role="status">{message}</p>}
      </form>
    </>
  )
}

function TransactionSide({ title, items, setItems, nextId, setNextId }: { title: string; items: TransactionItem[]; setItems: Dispatch<SetStateAction<TransactionItem[]>>; nextId: number; setNextId: Dispatch<SetStateAction<number>> }) {
  const update = (id: number, patch: Partial<TransactionItem>) => setItems((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item))
  const addCard = () => {
    setItems((current) => [...current, newCardItem(nextId)])
    setNextId((current) => current + 1)
  }

  return (
    <section className="panel transaction-side">
      <div className="transaction-side-heading"><span className="display-label">Exchange side</span><h2>{title}</h2></div>
      <div className="transaction-items">
        {items.map((item, index) => <TransactionItemForm key={item.id} item={item} index={index} update={(patch) => update(item.id, patch)} remove={() => setItems((current) => current.filter((entry) => entry.id !== item.id))} canRemove={item.kind === 'card'} />)}
      </div>
      <button className="secondary-button" type="button" onClick={addCard}>＋ Add card</button>
    </section>
  )
}

function TransactionItemForm({ item, index, update, remove, canRemove }: { item: TransactionItem; index: number; update: (patch: Partial<TransactionItem>) => void; remove: () => void; canRemove: boolean }) {
  const addBill = (bill: number) => update({ bills: [...item.bills, bill] })
  const undoBill = () => update({ bills: item.bills.slice(0, -1) })

  return (
    <div className="transaction-item">
      <div className="transaction-item-heading"><span className="transaction-subheading">{item.kind === 'cash' ? 'Cash' : `Card ${index}`}</span>{canRemove && <button className="remove-item" type="button" onClick={remove}>Remove</button>}</div>
      {item.kind === 'cash' ? <div className="cash-picker"><span className="field-label">Select bills</span><div className="bill-options">{denominations.map((bill) => <button className="bill-button" type="button" key={bill} onClick={() => addBill(bill)}>${bill}</button>)}</div><div className="cash-total" aria-live="polite">Total cash: <strong>${item.bills.reduce((total, bill) => total + bill, 0)}</strong></div><button className="undo-button" type="button" onClick={undoBill} disabled={item.bills.length === 0}>Undo</button></div> : <><label>Card name<input value={item.name} onChange={(event) => update({ name: event.target.value })} placeholder="e.g. Charizard ex" /></label><div className="form-row"><label>Set<input value={item.set} onChange={(event) => update({ set: event.target.value })} placeholder="Set" /></label><label>Card number<input value={item.cardNumber} onChange={(event) => update({ cardNumber: event.target.value })} placeholder="Number" /></label></div><div className="form-row"><label>Condition<select value={item.condition} onChange={(event) => update({ condition: event.target.value as Card['condition'] })}><option value="Raw">Raw</option><option value="Graded">Graded</option></select></label><label>Quantity<input type="number" min="1" value={item.quantity} onChange={(event) => update({ quantity: event.target.value })} /></label></div><label>Value per card ($)<input type="number" min="0" step="0.01" value={item.value} onChange={(event) => update({ value: event.target.value })} placeholder="0.00" /></label></>}
    </div>
  )
}

type ParsedItem = { kind: ItemKind; quantity: number; name: string; set: string; cardNumber: string; condition: Card['condition']; value: number }

function parseItems(items: TransactionItem[]): ParsedItem[] | null {
  const parsed: Array<ParsedItem | null | undefined> = items.map((item) => {
    if (item.kind === 'cash') {
      const amount = item.bills.reduce((total, bill) => total + bill, 0)
      return item.bills.length > 0 ? { kind: item.kind, quantity: 1, name: '', set: '', cardNumber: '', condition: 'Raw' as const, value: amount } : null
    }
    const quantity = Number(item.quantity)
    const value = Number(item.value)
    return item.name.trim() && item.set.trim() && item.cardNumber.trim() && Number.isInteger(quantity) && quantity > 0 && Number.isFinite(value) && value >= 0
      ? { kind: item.kind, quantity, name: item.name.trim(), set: item.set.trim(), cardNumber: item.cardNumber.trim(), condition: item.condition, value }
      : undefined
  })
  if (parsed.some((item) => item === undefined)) return null
  const validItems = parsed.filter((item) => item !== null) as ParsedItem[]
  return validItems.length > 0 ? validItems : null
}

function findCard(cards: Card[], item: ParsedItem) {
  return cards.find((card) => card.name.toLowerCase() === item.name.toLowerCase() && card.set.toLowerCase() === item.set.toLowerCase() && card.cardNumber.toLowerCase() === item.cardNumber.toLowerCase())
}
