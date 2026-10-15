import { useState } from 'react'
import { PageHeading } from '../components/PageHeading'

export function SettingsPage() {
  const [saved, setSaved] = useState(false)
  return <><PageHeading eyebrow="Workspace" title="Settings" description="Manage your workspace preferences and account details." /><form className="panel settings-card" onSubmit={(event) => { event.preventDefault(); setSaved(true) }}><div className="settings-section"><h2>Workspace profile</h2><label>Workspace name<input defaultValue="Vendor Inventory Management" /></label><label>Owner name<input defaultValue="User" /></label></div><div className="settings-section"><h2>Preferences</h2><label className="toggle-row"><span><strong>Low stock alerts</strong><small>Show a warning when an item has fewer than 8 units.</small></span><input type="checkbox" defaultChecked /></label><label className="toggle-row"><span><strong>Weekly summary emails</strong><small>Receive a summary of sales and inventory activity.</small></span><input type="checkbox" /></label></div><button className="primary-button" type="submit">Save settings</button>{saved && <p className="form-message" role="status">Settings saved.</p>}</form></>
}
