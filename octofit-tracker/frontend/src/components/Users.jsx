import { useEffect, useState } from 'react'
import { getCollection } from '../api.js'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users`
  : 'http://localhost:8000/api/users'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    getCollection(usersEndpoint).then(setUsers).catch((loadError) => setError(loadError.message))
  }, [])

  return (
    <section>
      <div className="page-heading"><p className="eyebrow">Community</p><h1>Members</h1><p className="lead">The people putting in the work.</p></div>
      {error && <div className="alert alert-warning">{error}</div>}
      <div className="row g-3">
        {users.map((user) => <div className="col-sm-6 col-lg-4" key={user._id || user.username}><article className="data-card h-100"><div className="avatar">{(user.displayName || user.username || '?').charAt(0).toUpperCase()}</div><h2>{user.displayName}</h2><p className="text-secondary">@{user.username}</p><p>{user.email}</p></article></div>)}
      </div>
      {!error && users.length === 0 && <p className="empty-state">No members found.</p>}
    </section>
  )
}

export default Users
