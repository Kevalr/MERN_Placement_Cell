import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../../utils/helper";
import Path from "../../constants/local-path";
import Sidebar from "./sidebar";
import Header from "./header";

function ProtectedRoute() {
  return isLoggedIn() ? (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ) : (
    <Navigate to={Path.Login} />
  );
}

function HomeRoute() {
  return isLoggedIn() ? <Navigate to={Path.Dashboard} /> : <Outlet />;
}

function AppLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 h-full overflow-x-hidden">
        <Header />
        <main className="relative top-20 h-[calc(100%_-_5rem)] overflow-y-auto bg-gray-mercury px-5 py-4 scrollbar-gutter">
          {children}
        </main>
      </div>
    </div>
  );
}

export { ProtectedRoute, HomeRoute };

export default AppLayout;
