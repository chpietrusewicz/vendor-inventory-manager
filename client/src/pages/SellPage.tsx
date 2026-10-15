import type { Dispatch, SetStateAction } from 'react'
import { TransactionPage } from './BuyPage'
import type { Card } from '../types'

export function SellPage({ cards, setCards }: { cards: Card[]; setCards: Dispatch<SetStateAction<Card[]>> }) {
  return <TransactionPage type="sell" cards={cards} setCards={setCards} />
}
