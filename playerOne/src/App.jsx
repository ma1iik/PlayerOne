import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/home";
import Settings from "./pages/Settings";
import Shop from "./pages/Shop";
import Inventory from "./pages/Inventory";
import Layout from "./layout/Layout";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for an access token (simplified example)
    const accessToken = localStorage.getItem("accessToken");
    setIsAuthenticated(!!accessToken);
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/home" />
              ) : (
                <Login setAuth={setIsAuthenticated} />
              )
            }
          />
          <Route
            path="/register"
            element={<Register setAuth={setIsAuthenticated} />}
          />

          {/* Protected Routes Wrapped in Global Layout */}
          <Route
            path="/home"
            element={
              isAuthenticated ? (
                <Layout>
                  <Home setAuth={setIsAuthenticated} />
                </Layout>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/settings"
            element={
              isAuthenticated ? (
                <Layout>
                  <Settings setAuth={setIsAuthenticated} />
                </Layout>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/shop"
            element={
              isAuthenticated ? (
                <Layout>
                  <Shop setAuth={setIsAuthenticated} />
                </Layout>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/inventory"
            element={
              isAuthenticated ? (
                <Layout>
                  <Inventory setAuth={setIsAuthenticated} />
                </Layout>
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
