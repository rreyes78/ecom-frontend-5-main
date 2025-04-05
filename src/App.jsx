import React from "react";
import { AuthProvider } from "./Context/AuthContext";
import { AppProvider } from "./Context/Context"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Login from "./components/Login";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const App = () => {
  return (
    <AuthProvider>
      <AppProvider>
      <Router>
          <Routes>
            {/* Prevent logged-in users from seeing the login page */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Login />
                </ProtectedRoute>
              }
            />
            {/* Home page (protected, only accessible if logged in) */}
            
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
};

export default App;
