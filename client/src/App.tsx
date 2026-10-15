import './App.css'

type Action = {
  label: string
  className: string
  icon: React.ReactNode
}

type Display = {
  label: string
  value: string
  detail: string
  className: string
  icon: React.ReactNode
}

const actions: Action[] = [
  {
    label: 'Buy',
    className: 'buy',
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 8v32M32 15.5c-1.7-2-4.2-3.2-7.3-3.2-4.7 0-8.2 2.5-8.2 6.1 0 8.7 15.6 4.8 15.6 13.2 0 3.7-3.6 6.1-8.5 6.1-3.2 0-6.2-1.4-7.8-3.7" />
      </svg>
    ),
  },
  {
    label: 'Sell',
    className: 'sell',
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M10 17.5 24 10l14 7.5v15L24 40l-14-7.5v-15Z" />
        <path d="m10 17.5 14 8 14-8M24 25.5V40" />
      </svg>
    ),
  },
  {
    label: 'Trade',
    className: 'trade',
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M9 16h25M28 10l6 6-6 6M39 32H14M20 26l-6 6 6 6" />
      </svg>
    ),
  },
  {
    label: 'Inventory',
    className: 'inventory',
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M10 13.5 24 7l14 6.5v21L24 41l-14-6.5v-21Z" />
        <path d="m10 13.5 14 7 14-7M24 20.5V41M17 10.5l14 7" />
      </svg>
    ),
  },
]

const displays: Display[] = [
  {
    label: 'Current Sales',
    value: '$2,840',
    detail: 'this month so far',
    className: 'sales',
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 8v32M32 15.5c-1.7-2-4.2-3.2-7.3-3.2-4.7 0-8.2 2.5-8.2 6.1 0 8.7 15.6 4.8 15.6 13.2 0 3.7-3.6 6.1-8.5 6.1-3.2 0-6.2-1.4-7.8-3.7" />
      </svg>
    ),
  },
  {
    label: 'Inventory Value',
    value: '$18,420',
    detail: 'across 238 items',
    className: 'value',
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="m9 33 10-10 7 6 13-15" />
        <path d="M30 14h9v9" />
      </svg>
    ),
  },
]

const recentActivity = [
  { type: 'Sold', item: 'Vintage Denim Jacket', detail: '$85.00 · 12 min ago', className: 'sold' },
  { type: 'Bought', item: 'Canvas Work Totes', detail: '24 units · 2 hrs ago', className: 'bought' },
  { type: 'Added', item: 'Ceramic Tableware Set', detail: '8 items · Yesterday', className: 'added' },
]

function App() {
  return (
    <main className="dashboard">
      <aside className="sidebar">
        <header className="brand">
          <strong>Vendor Inventory Management</strong>
          <span>by Foil House</span>
        </header>

        <nav className="sidebar-nav" aria-label="Main navigation">
          <a className="nav-item active" href="#dashboard">
            <span className="nav-icon" aria-hidden="true">⌂</span>
            Dashboard
          </a>
          {actions.map((action) => (
            <a className="nav-item" href={`#${action.className}`} key={action.label}>
              <span className="nav-icon" aria-hidden="true">{action.label[0]}</span>
              {action.label}
            </a>
          ))}
        </nav>

        <a className="nav-item settings" href="#settings">
          <span className="nav-icon" aria-hidden="true">⚙</span>
          Settings
        </a>
      </aside>

      <section className="dashboard-content" id="dashboard">
        <div className="content-heading">
          <span className="section-kicker">Workspace</span>
          <h1>Welcome, User</h1>
        </div>
        <section className="action-grid" aria-label="Dashboard overview">
          {displays.map((display) => (
            <article className={`action-card ${display.className}`} key={display.label}>
              <span className="action-icon">{display.icon}</span>
              <span className="display-label">{display.label}</span>
              <strong>{display.value}</strong>
              <span className="display-detail">{display.detail}</span>
            </article>
          ))}
          <div className="right-column">
            <article className="action-card activity" aria-labelledby="activity-heading">
              <div className="activity-heading">
                <span className="action-icon" aria-hidden="true">
                  <svg viewBox="0 0 48 48">
                    <path d="M24 10a14 14 0 1 0 14 14" />
                    <path d="M24 16v9l6 4M31 10h7v7" />
                  </svg>
                </span>
                <span>
                  <span className="display-label">Recent Activity</span>
                  <strong id="activity-heading">Latest inventory moves</strong>
                </span>
              </div>
              <div className="activity-list">
                {recentActivity.map((item) => (
                  <div className="activity-item" key={item.item}>
                    <span className={`activity-dot ${item.className}`} />
                    <span className="activity-copy">
                      <strong>{item.type}</strong>
                      <span>{item.item}</span>
                      <small>{item.detail}</small>
                    </span>
                  </div>
                ))}
              </div>
            </article>
            <button className="begin-show" type="button">
              <span>
                <small>Live workspace</small>
                <strong>Begin Show</strong>
              </span>
              <span className="begin-show-arrow" aria-hidden="true">→</span>
            </button>
          </div>
        </section>
      </section>
    </main>
  )
}

export default App
