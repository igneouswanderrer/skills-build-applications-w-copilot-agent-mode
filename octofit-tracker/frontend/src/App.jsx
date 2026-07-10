import { Routes, Route, Link, Navigate } from 'react-router-dom'
import './App.css'
import Users from './components/Users'
import Teams from './components/Teams'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Workouts from './components/Workouts'

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1>OctoFit Tracker</h1>
        <p className="text-muted">
          Configure <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for
          Codespaces API support.
        </p>
        <nav className="nav nav-pills flex-column flex-sm-row">
          <Link className="flex-sm-fill text-sm-center nav-link" to="/users">
            Users
          </Link>
          <Link className="flex-sm-fill text-sm-center nav-link" to="/teams">
            Teams
          </Link>
          <Link className="flex-sm-fill text-sm-center nav-link" to="/activities">
            Activities
          </Link>
          <Link
            className="flex-sm-fill text-sm-center nav-link"
            to="/leaderboard"
          >
            Leaderboard
          </Link>
          <Link className="flex-sm-fill text-sm-center nav-link" to="/workouts">
            Workouts
          </Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate replace to="/users" />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<p>Page not found.</p>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
