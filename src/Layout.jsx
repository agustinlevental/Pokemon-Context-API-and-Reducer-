import { Outlet } from 'react-router-dom';
import CustomAppBar from './AppBar/AppBar';
import styles from "./layout.module.css"; 

export default function Layout() {
  return (
    <div className={styles.container}>
      <CustomAppBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}