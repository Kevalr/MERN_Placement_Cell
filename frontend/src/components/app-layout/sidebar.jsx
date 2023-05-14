import { filter } from "lodash";
import { useNavigate, useLocation } from "react-router-dom";
import { ProtectedRoutes } from "../../constants/local-path";

const getParentPath = (pathname) => `/${pathname.split("/")[1]}`;

const sidebarRoutes = filter(
  ProtectedRoutes,
  ({ showInSidebar }) => showInSidebar
);

const Sidebar = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const matchPathname = getParentPath(pathname);

  return (
    <>
      <aside className="bg-slate-950 text-white flex-shrink-0 w-48 block bg-primary py-4 overflow-y-auto z-20">
        <div className="flex justify-center items-center h-10 text-2xl">
          <h3>Placement Cell</h3>
        </div>
        <div className="mt-6 text-gray-lighter flex flex-col">
          {sidebarRoutes.map(({ name, path, icon }) => (
            <button
              key={name}
              className="relative pt-4 pb-2 cursor-pointer hover:bg-primary-light active:bg-primary-dark"
              onClick={() => navigate(path)}
            >
              {getParentPath(path) === matchPathname && (
                <div className="bg-secondary absolute h-full w-2 top-0 left-0" />
              )}
              <p className="text-md font-bold text-center">{name}</p>
            </button>
          ))}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
