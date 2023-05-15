import { useNavigate } from "react-router-dom";

import Path from "../constants/local-path";

import { isLoggedIn } from "../utils/helper";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div>
        <h1 className="text-3xl mb-3.5 text-center">Oops!</h1>
        <p className="text-xl font-bold mb-3.5">
          We can&apos;t seem to find the page you are looking for
        </p>

        <div className="text-center">
          <button
            type="button"
            onClick={() => navigate(isLoggedIn() ? "/students" : "/")}
            className="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 mr-2 mb-2"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
