import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './components/Login';
import InvoiceForm from './components/InvoiceForm';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('session');
    if (session) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          isAuthenticated ?
            <Navigate to="/invoice" replace /> :
            <Login setIsAuthenticated={setIsAuthenticated} />
        } />
        <Route path="/invoice" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <InvoiceForm setIsAuthenticated={setIsAuthenticated} />
          </ProtectedRoute>
        } />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;