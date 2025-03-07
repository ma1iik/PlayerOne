// playerOne/src/layout/Layout.jsx
import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <div className="flex flex-col h-screen overflow-hidden">
        <Header />
        <main className="flex-1 overflow-hidden animate-fade-in">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;