import { useEffect, useState } from 'react'
import './App.css'
import { initialCards } from './data/inventory'
import { Sidebar } from './components/Sidebar'
import { BuyPage } from './pages/BuyPage'
import { DashboardPage } from './pages/DashboardPage'
import { InventoryPage } from './pages/InventoryPage'
import { SellPage } from './pages/SellPage'
import { SettingsPage } from './pages/SettingsPage'
import { TradePage } from './pages/TradePage'
import type { Card, Page } from './types'

function App() {
  const [page, setPage] = useState<Page>(() => getPage(window.location.hash))
  const [cards, setCards] = useState<Card[]>(initialCards)

  useEffect(() => {
    const onHashChange = () => setPage(getPage(window.location.hash))
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const navigate = (nextPage: Page) => {
    window.location.hash = nextPage
    setPage(nextPage)
  }

  return (
    <main className="dashboard">
      <Sidebar page={page} />
      <section className="dashboard-content">
        {page === 'dashboard' && <DashboardPage navigate={navigate} />}
        {page === 'buy' && <BuyPage cards={cards} setCards={setCards} />}
        {page === 'sell' && <SellPage cards={cards} setCards={setCards} />}
        {page === 'trade' && <TradePage />}
        {page === 'inventory' && <InventoryPage cards={cards} />}
        {page === 'settings' && <SettingsPage />}
      </section>
    </main>
  )
}

function getPage(hash: string): Page {
  const value = hash.replace('#', '') as Page
  return ['dashboard', 'buy', 'sell', 'trade', 'inventory', 'settings'].includes(value) ? value : 'dashboard'
}

export default App
