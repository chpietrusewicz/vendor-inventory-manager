import { PageHeading } from '../components/PageHeading'

export function TradePage() {
  return <><PageHeading eyebrow="Card trading" title="Create a trade" description="Exchange trading cards with another collector and keep both sides documented." /><div className="form-layout"><form className="panel form-card" onSubmit={(event) => event.preventDefault()}><h2>Trade details</h2><label>Trading partner<input placeholder="Collector or vendor name" /></label><div className="form-row"><label>Cards you give<input placeholder="Search your card inventory" /></label><label>Cards you receive<input placeholder="Card name and set" /></label></div><label>Notes<textarea rows={4} placeholder="Add condition, grading, value, or delivery notes" /></label><button className="primary-button" type="submit">Save card trade</button></form></div></>
}
