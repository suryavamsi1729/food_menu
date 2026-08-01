import { Routes, Route } from 'react-router-dom'
import LogInPage from './pages/LoginPage'

function App() {

  return (
    <Routes>

      <Route path="/login" element={<LogInPage />} />

      <Route path="*" element={<h1>404 Not Found</h1>} />

    </Routes>
  )
}

export default App
