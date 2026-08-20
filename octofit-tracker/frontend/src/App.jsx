import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink className="brand" to="/leaderboard"><span className="brand-mark">O</span><span>OctoFit <em>Tracker</em></span></NavLink>
        <nav className="main-nav" aria-label="Primary navigation">
          <NavLink to="/activities">Activities</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/users">Members</NavLink>
          <NavLink to="/workouts">Workouts</NavLink>
        </nav>
      </header>
      <main className="content-wrap">
        <Routes>
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/leaderboard" replace />} />
        </Routes>
      </main>
      <footer>OctoFit Tracker <span>•</span> Move with purpose.</footer>
    </div>
  )
}

export default App
