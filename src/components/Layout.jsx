import { Outlet, useLocation } from "react-router-dom";
import Header from './Header';

export default function Layout() {
  const location = useLocation();

  const showHeader = location.pathname === '/blogs' || location.pathname === '/about'; 

  return (
    <div>
      {showHeader && <Header />} 
      <main>
        <Outlet />
      </main>
    </div>
  );
}
