import { Routes, Route } from 'react-router-dom'
import LogInPage from './pages/LoginPage'
import MenuPage from './pages/MenuPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {

  return (
    <Routes>

      <Route path="/login" element={<LogInPage />} />
      <Route path="/" element={<MenuPage />} />
      <Route path="*" element={<NotFoundPage />} />

    </Routes>
  )
}

export default App
