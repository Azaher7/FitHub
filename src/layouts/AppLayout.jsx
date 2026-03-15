import { Outlet } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

export default function AppLayout() {
  return (
    <>
      <main className="container">
        <Outlet />
      </main>
      <BottomNav />
    </>
  );
}
