// src/components/layout/Layout.jsx
import React from "react";
import { useThemeStyles } from "../../context/ThemeProvider";
import Header from "../common/Header";
import Footer from "../common/Footer";

const Layout = ({ children }) => {
  const { theme: currentTheme } = useThemeStyles();

  return (
    <div className="bg-bg-primary text-text-primary">
      <div className="flex flex-col h-screen">
        {/* Comprehensive Header */}
        <Header />
        
        <main className="flex flex-1 flex-col animate-fade-in overflow-auto">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
