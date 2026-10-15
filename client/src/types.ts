export type Page = 'dashboard' | 'buy' | 'sell' | 'trade' | 'inventory' | 'settings'
export type Card = {
  name: string
  set: string
  cardNumber: string
  condition: 'Raw' | 'Graded'
  quantity: number
  cost: number
  status: 'In stock' | 'Low stock'
}
