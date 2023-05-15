import classNames from "classnames";
import CloseIcon from "../assets/close.svg";

const StudentsModal = ({
  isOpen,
  onRequestClose,
  children,
  submitButtonProps,
  title,
}) => {
  return (
    <div
      className={classNames(
        "backdrop-blur-sm bg-opacity-50 bg-black bg-transparent fixed z-40 overflow-y-auto top-0 w-full h-screen left-0 ",
        {
          hidden: !isOpen,
        }
      )}
    >
      <div className="flex items-center justify-center pt-4 px-4 pb-20 sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-black-light opacity-75" />
        </div>
        <div
          className={classNames([
            "h-full inline-block bg-white left-1/2 -translate-x-1/2 transform transition-all mt-9 relative p-4 rounded-xl w-[896px] shadow-md drop-shadow-xl shadow-black",
          ])}
        >
          <button className="absolute -top-3 -right-1" onClick={onRequestClose}>
            <img
              alt="close"
              className="h-9 w-9 bg-white rounded-full"
              src={CloseIcon}
            />
          </button>
          <div className="max-h-[calc(100vh-100px)] overflow-y-auto">
            <div className="sticky top-0 left-0 bg-white text-left border-b border-gray">
              <p className="text-2xl text-center mb-4 font-semibold text-black-light">
                {title ? title : "ADD Students"}
              </p>
            </div>
            <div className="my-3">{children}</div>

            <div className="sticky bottom-0 left-0 flex justify-center pr-3 bg-white border-t border-gray">
              <button
                type="button"
                onClick={onRequestClose}
                className="mt-3 mr-3 px-8 h-10 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm py-2.5  mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                Cancel
              </button>
              <button
                className="mt-3 h-10 text-white bg-blue-300 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-500 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                type="submit"
                {...submitButtonProps}
              >
                ADD STUDENTS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsModal;
