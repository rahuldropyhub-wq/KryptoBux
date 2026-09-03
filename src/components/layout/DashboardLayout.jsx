import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-vie-background font-sans text-vie-text overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 flex flex-col w-full min-w-0">
        <Topbar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-[1400px] mx-auto space-y-6">
            {children}
          </div>
          
          {/* Footer */}
          <footer className="mt-12 border-t border-gray-200 pt-6 pb-2 text-center text-sm text-vie-text-muted">
            <div className="flex justify-center space-x-4 mb-2">
              <a href="#" className="hover:text-vie-text transition-colors">Privacy</a>
              <a href="#" className="hover:text-vie-text transition-colors">Terms</a>
              <a href="#" className="hover:text-vie-text transition-colors">Contact</a>
              <a href="#" className="hover:text-vie-text transition-colors">Help</a>
            </div>
            <p>© {new Date().getFullYear()} Vie Faucet Recreation</p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
