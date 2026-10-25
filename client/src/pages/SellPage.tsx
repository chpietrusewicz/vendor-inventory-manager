import type { Dispatch, SetStateAction } from 'react'
import { TransactionPage } from './TransactionForm'
import type { Card } from '../types'

export function SellPage({ cards, setCards }: { cards: Card[]; setCards: Dispatch<SetStateAction<Card[]>> }) {
  return <TransactionPage cards={cards} setCards={setCards} />
}
