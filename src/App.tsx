import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Community from './pages/Community'
import GameDetail from './pages/GameDetail'
import Games from './pages/Games'
import Home from './pages/Home'
import Leaderboard from './pages/Leaderboard'
import NotFound from './pages/NotFound'
import Tournaments from './pages/Tournaments'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="games" element={<Games />} />
        <Route path="games/:slug" element={<GameDetail />} />
        <Route path="tournaments" element={<Tournaments />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="community" element={<Community />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
