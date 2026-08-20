import { useEffect, useState } from 'react'
import { getCollection } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => { getCollection('activities').then(setActivities).catch((loadError) => setError(loadError.message)) }, [])

  return (
    <section>
      <div className="page-heading"><p className="eyebrow">Live feed</p><h1>Activities</h1><p className="lead">A running record of every session.</p></div>
      {error && <div className="alert alert-warning">{error}</div>}
      <div className="table-responsive data-card p-0"><table className="table align-middle mb-0"><thead><tr><th>Athlete</th><th>Activity</th><th>Duration</th><th>Calories</th><th>Date</th></tr></thead><tbody>{activities.map((activity) => <tr key={activity._id}><td>{activity.user?.displayName || activity.user?.username || activity.user || 'Unknown'}</td><td>{activity.type}</td><td>{activity.duration} min</td><td>{activity.calories}</td><td>{activity.date ? new Date(activity.date).toLocaleDateString() : '—'}</td></tr>)}</tbody></table></div>
      {!error && activities.length === 0 && <p className="empty-state">No activities logged yet.</p>}
    </section>
  )
}

export default Activities
