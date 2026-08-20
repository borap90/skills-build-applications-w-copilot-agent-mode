import { useEffect, useState } from 'react'
import { getCollection } from '../api.js'

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard`
  : 'http://localhost:8000/api/leaderboard'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')

  useEffect(() => { getCollection(leaderboardEndpoint).then(setEntries).catch((loadError) => setError(loadError.message)) }, [])

  return (
    <section>
      <div className="page-heading"><p className="eyebrow">Competition</p><h1>Leaderboard</h1><p className="lead">Small gains add up. See who is leading the pack.</p></div>
      {error && <div className="alert alert-warning">{error}</div>}
      <div className="data-card p-0 overflow-hidden"><ol className="leaderboard-list mb-0">{entries.map((entry, index) => <li key={entry._id || entry.user?._id || index}><span className="rank">{entry.rank || index + 1}</span><span className="flex-grow-1 fw-semibold">{entry.user?.displayName || entry.user?.username || entry.user || 'Unknown athlete'}</span><strong>{entry.points} pts</strong></li>)}</ol></div>
      {!error && entries.length === 0 && <p className="empty-state">No scores available yet.</p>}
    </section>
  )
}

export default Leaderboard
