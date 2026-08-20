import { useEffect, useState } from 'react'
import { getCollection } from '../api.js'

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams`
  : 'http://localhost:8000/api/teams'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')

  useEffect(() => { getCollection(teamsEndpoint).then(setTeams).catch((loadError) => setError(loadError.message)) }, [])

  return (
    <section>
      <div className="page-heading"><p className="eyebrow">Find your crew</p><h1>Teams</h1><p className="lead">Train together, keep each other moving.</p></div>
      {error && <div className="alert alert-warning">{error}</div>}
      <div className="row g-3">{teams.map((team) => <div className="col-md-6" key={team._id || team.name}><article className="data-card h-100"><h2>{team.name}</h2><p>{team.description}</p><span className="badge text-bg-light">{team.members?.length || 0} members</span></article></div>)}</div>
      {!error && teams.length === 0 && <p className="empty-state">No teams created yet.</p>}
    </section>
  )
}

export default Teams
