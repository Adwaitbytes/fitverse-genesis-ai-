
import React from "react";
import FitverseNavigation from "./FitverseNavigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Navigation */}
      <div className="md:w-16 md:border-r md:border-white/10">
        <FitverseNavigation />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto pb-20 md:pb-8">
        {children}
      </div>
    </div>
  );
};

export default Layout;
