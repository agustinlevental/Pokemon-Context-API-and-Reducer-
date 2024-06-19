;
import { Outlet } from 'react-router-dom';
import CustomAppBar from './AppBar/AppBar';

export default function Layout() {
  return (
    <div>
      <CustomAppBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}