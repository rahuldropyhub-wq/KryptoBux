import { Outlet } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';

const UserLayout = () => {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

export default UserLayout;
