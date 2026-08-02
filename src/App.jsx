import { Routes, Route } from 'react-router-dom'
import LogInPage from './pages/LoginPage'
import MenuPage from './pages/MenuPage'
import NotFoundPage from './pages/NotFoundPage'
import FoodDetailPage from './pages/FoodDetailsPage'
import SavedRecipesPage from './pages/SavedRecipesPage'

function App() {

  return (
    <Routes>

      <Route path="/login" element={<LogInPage />} />
      <Route path="/" element={<MenuPage />} />
      <Route path='/menu/:id' element={<FoodDetailPage />} />
      <Route path='/saved-recipes' element={<SavedRecipesPage />} />  

      <Route path="*" element={<NotFoundPage />} />

    </Routes>
  )
}

export default App
