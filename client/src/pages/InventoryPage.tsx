import { useState } from 'react'
import type { Card } from '../types'
import { PageHeading } from '../components/PageHeading'

export function InventoryPage({ cards }: { cards: Card[] }) {
  const [query, setQuery] = useState('')
  const filtered = cards.filter((card) => `${card.name} ${card.set} ${card.cardNumber}`.toLowerCase().includes(query.toLowerCase()))
  return <><PageHeading eyebrow="Card catalog" title="Inventory" description={`${cards.length} cards · ${cards.reduce((total, card) => total + card.quantity, 0)} total copies`} action={<button className="primary-button" type="button" onClick={() => window.location.hash = 'make-transaction'}>＋ Add card</button>} /><section className="panel inventory-panel"><div className="table-toolbar"><h2>All cards</h2><input aria-label="Search card inventory" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search cards, sets, numbers" /></div><div className="table-wrap"><table><thead><tr><th>Card</th><th>Set · No.</th><th>Condition</th><th>Copies</th><th>Cost</th><th>Status</th></tr></thead><tbody>{filtered.map((card) => <tr key={`${card.name}-${card.set}-${card.cardNumber}`}><td><strong>{card.name}</strong></td><td>{card.set} · {card.cardNumber}</td><td>{card.condition}</td><td>{card.quantity}</td><td>${card.cost.toFixed(2)}</td><td><span className={`status ${card.status === 'Low stock' ? 'low' : ''}`}>{card.status}</span></td></tr>)}</tbody></table>{filtered.length === 0 && <p className="empty-state">No cards match that search.</p>}</div></section></>
}
