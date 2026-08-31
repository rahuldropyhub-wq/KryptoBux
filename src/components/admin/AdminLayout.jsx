import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopbar from '@/components/admin/AdminTopbar';

const AdminLayout = ({ title = '', subtitle = '' }) => {
  return (
    <div className="min-h-screen bg-[#F4F6FB] text-slate-900 font-sans antialiased">
      <AdminSidebar />
      <AdminTopbar title={title} subtitle={subtitle} />
      <main 
        className="transition-all duration-200 lg:pl-[250px] min-h-screen flex flex-col"
        style={{ paddingTop: '68px' }}
      >
        <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
