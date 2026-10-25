import type { Page } from '../types'

const navItems: { id: Page; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '⌂' },
  { id: 'make-transaction', label: 'Make transaction', icon: '↔' },
  { id: 'sell', label: 'Sell', icon: '$' },
  { id: 'inventory', label: 'Inventory', icon: '▣' },
]

export function Sidebar({ page }: { page: Page }) {
  return (
    <aside className="sidebar">
      <header className="brand"><strong>Vendor Inventory Management</strong><span>by Foil House</span></header>
      <nav className="sidebar-nav" aria-label="Main navigation">
        {navItems.map((item) => <a className={`nav-item ${page === item.id ? 'active' : ''}`} href={`#${item.id}`} key={item.id}><span className="nav-icon" aria-hidden="true">{item.icon}</span>{item.label}</a>)}
      </nav>
      <a className={`nav-item settings ${page === 'settings' ? 'active' : ''}`} href="#settings"><span className="nav-icon" aria-hidden="true">⚙</span>Settings</a>
    </aside>
  )
}
