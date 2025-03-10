// playerOne/src/layout/Layout.jsx
import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const Layout = ({ children }) => {
  return (
    <div className="bg-bg-primary text-text-primary">
      <div className="flex flex-col h-screen">
        <Header />
        <main className="flex-1 flex flex-col overflow-auto animate-fade-in">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;