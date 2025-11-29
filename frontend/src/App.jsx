import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import InputPage from './pages/InputPage';
import ReportsPage from './pages/ReportsPage';
import KitchensPage from './pages/KitchensPage';
import CommoditiesPage from './pages/CommoditiesPage';
import UsersPage from './pages/UsersPage';
import SettingsPage from './pages/SettingsPage';
import Layout from './components/Layout';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          {/* Admin Routes with Sidebar */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/kitchens" element={<KitchensPage />} />
            <Route path="/commodities" element={<CommoditiesPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          {/* Standalone Routes */}
          <Route path="/input" element={<InputPage />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
