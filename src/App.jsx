import { Routes, Route } from 'react-router-dom'
import LogInPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {

  return (
    <Routes>

      <Route path="/login" element={<LogInPage />} />
      <Route path="*" element={<NotFoundPage />} />

    </Routes>
  )
}

export default App
