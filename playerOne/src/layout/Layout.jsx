// playerOne/src/layout/Layout.jsx
import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-bg-primary text-text-primary">
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 flex flex-col overflow-hidden animate-fade-in">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;