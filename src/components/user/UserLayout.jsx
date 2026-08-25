import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/user/Sidebar';
import Topbar from '@/components/user/Topbar';

const UserLayout = ({ title = '', subtitle = '' }) => {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Sidebar />
      <Topbar title={title} subtitle={subtitle} />
      <main
        className="page-content"
        style={{ paddingTop: 'var(--topbar-height)' }}
      >
        <div className="page-inner">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default UserLayout;
