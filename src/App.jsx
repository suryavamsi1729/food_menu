import { Routes, Route } from 'react-router-dom';
import LogInPage from './pages/LoginPage';
import MenuPage from './pages/MenuPage';
import NotFoundPage from './pages/NotFoundPage';
import FoodDetailPage from './pages/FoodDetailsPage';
import SavedRecipesPage from './pages/SavedRecipesPage';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<LogInPage />} />
      <Route path="/" element={<ProtectedRoute><MenuPage /></ProtectedRoute>} />
      <Route path="/menu/:id" element={<FoodDetailPage />} />
      <Route path="/saved-recipes" element={<SavedRecipesPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
