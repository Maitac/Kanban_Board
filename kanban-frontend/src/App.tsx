


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import KanbanBoard from './components/KanbanBoard'; 
import LoginPage from './pages/LoginPage'; 
import { AuthProvider, useAuth } from './auth/AuthContext'; 


const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p className="text-xl">Loading authentication...</p>
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  return (
    // Envuelve toda la aplicación con el Router para habilitar la navegación
    <Router>
      {}
      <AuthProvider>
        <Routes>
          {}
          <Route path="/login" element={<LoginPage />} />

          {}
          <Route
            path="/board"
            element={
              <PrivateRoute>
                <KanbanBoard />
              </PrivateRoute>
            }
          />

          {}
          <Route path="*" element={<HomeRedirect />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};


const HomeRedirect: React.FC = () => {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return null; // O un spinner/loader
  }
  return user ? <Navigate to="/board" /> : <Navigate to="/login" />;
};

export default App;







