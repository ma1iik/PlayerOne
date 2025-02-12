import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex flex-col overflow-hidden">
          {children}
        </main>
      </div>
        <Footer />
    </div>
  );
};

export default Layout;