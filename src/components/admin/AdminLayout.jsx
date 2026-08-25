import { Outlet } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopbar from '@/components/admin/AdminTopbar';

const AdminLayout = ({ title = '', subtitle = '' }) => {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <AdminSidebar />
      <AdminTopbar title={title} subtitle={subtitle} />
      <main className="page-content" style={{ paddingTop: 'var(--topbar-height)' }}>
        <div className="page-inner">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
