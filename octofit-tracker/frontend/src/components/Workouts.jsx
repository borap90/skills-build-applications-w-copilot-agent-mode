import { useEffect, useState } from 'react'
import { getCollection } from '../api.js'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts`
  : 'http://localhost:8000/api/workouts'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => { getCollection(workoutsEndpoint).then(setWorkouts).catch((loadError) => setError(loadError.message)) }, [])

  return (
    <section>
      <div className="page-heading"><p className="eyebrow">Your next challenge</p><h1>Workouts</h1><p className="lead">Focused sessions for wherever you are today.</p></div>
      {error && <div className="alert alert-warning">{error}</div>}
      <div className="row g-3">{workouts.map((workout) => <div className="col-md-6 col-xl-4" key={workout._id || workout.name}><article className="data-card h-100"><div className="d-flex justify-content-between gap-3"><h2>{workout.name}</h2><span className="badge text-bg-dark align-self-start">{workout.difficulty}</span></div><p>{workout.description}</p><div className="workout-meta"><span>{workout.duration} min</span><span>{workout.target}</span></div></article></div>)}</div>
      {!error && workouts.length === 0 && <p className="empty-state">No workouts available yet.</p>}
    </section>
  )
}

export default Workouts
