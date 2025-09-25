// src/App.tsx

import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Agendamento from './pages/Agendamento';
import Admin from './pages/Admin'; // <-- CORREÇÃO APLICADA AQUI
import NotFound from './pages/NotFound';
import { Navigation } from './components/Navigation';
import { LoginPage } from './pages/Login';
import { RegisterPage } from './pages/Register';
import { Toaster } from './components/ui/sonner';
import { useAuth } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Router>
        <Navigation />
        <main className="container mx-auto p-4 mt-20">
          <Routes>
            {/* --- Rotas Públicas --- */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/agendamento" element={<Agendamento />} />
            
            {/* --- Rotas Protegidas para Admin --- */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin" element={<Admin />} />
            </Route>

            {/* --- Rota Not Found (deve ser a última) --- */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Router>
      <Toaster />
    </>
  );
}

export default App;