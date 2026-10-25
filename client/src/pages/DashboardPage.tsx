import type { Page } from '../types'
import { PageHeading } from '../components/PageHeading'

export function DashboardPage({ navigate }: { navigate: (page: Page) => void }) {
  const activity = [
    { type: 'Sold', item: 'Charizard ex · Obsidian Flames', detail: '$85.00 · 12 min ago', className: 'sold' },
    { type: 'Bought', item: 'Mickey Mantle · 1952 Topps', detail: '1 copy · 2 hrs ago', className: 'bought' },
    { type: 'Added', item: 'Luffy Alternate Art', detail: 'Romance Dawn · Yesterday', className: 'added' },
  ]
  return <><PageHeading eyebrow="Trading card workspace" title="Welcome, User" description="Track your card collection, sales, and transactions in one place." /><section className="stat-grid" aria-label="Trading card overview"><StatCard label="Card sales" value="$2,840" detail="this month so far" /><StatCard label="Collection value" value="$18,420" detail="across 11 cards" /><article className="panel activity-panel"><div className="panel-heading"><div><span className="display-label">Recent activity</span><h2>Latest card moves</h2></div><span className="activity-icon" aria-hidden="true">◷</span></div><div className="activity-list">{activity.map((item) => <div className="activity-item" key={item.item}><span className={`activity-dot ${item.className}`} /><span className="activity-copy"><strong>{item.type}</strong><span>{item.item}</span><small>{item.detail}</small></span></div>)}</div></article><button className="quick-action" type="button" onClick={() => navigate('make-transaction')}><span><small>Quick action</small><strong>Make a transaction</strong></span><span className="begin-show-arrow" aria-hidden="true">→</span></button></section></>
}

function StatCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <article className="stat-card"><span className="stat-mark" aria-hidden="true">↗</span><span className="display-label">{label}</span><strong>{value}</strong><span className="display-detail">{detail}</span></article>
}
