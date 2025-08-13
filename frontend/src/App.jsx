// src/App.jsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeProvider";
import { AuthProvider } from "./context/AuthContext";
import { DragProvider } from "./context/DragContext";
import AppRoutes from "./routes";

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <DragProvider>
            <AppRoutes />
          </DragProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;