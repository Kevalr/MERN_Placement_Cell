import { useNavigate } from "react-router-dom";

import Path from "../../constants/local-path";

import { removeSession, getSession } from "../../utils/helper";
import DownloadCSV from "../download-CSV";

const Header = () => {
  const user = getSession().user;
  console.log(user, "--------");
  const name = "keval";
  // const { name } = user;

  const navigate = useNavigate();

  const handleLogout = () => {
    removeSession();
    navigate(Path.Login);
  };

  setTimeout(() => {}, 3000);

  return (
    <>
      <header className="items-center fixed h-20 bg-blue-300 px-5 py-4 flex w-[calc(100%_-_8rem)] z-20">
        <div className="w-2/5 flex items-center">
          <p className="text-2xl font-semibold text-black-light">
            Admin Panel - RK Ninjas - Placement cell
          </p>
        </div>
        <div className="flex w-3/5 justify-end mr-16 items-center">
          <DownloadCSV />
          <button
            type="button"
            className="ml-10 text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-6 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 mr-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
