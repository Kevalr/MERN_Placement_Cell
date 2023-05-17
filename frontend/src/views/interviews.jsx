import React, { useState } from "react";
import Loader from "../components/common/Loader";
import { useNavigate } from "react-router-dom";
import { useDeleteStudent } from "../hooks/students";
import trash from "../assets/delete.png";
import edit from "../assets/edit.png";
import { invalidateQuery } from "../config/react-query-client";
import { toast } from "react-toastify";
import { useDeleteInterview, useGetAllInterviews } from "../hooks/interviews";
import useModal from "../hooks/use-modal";
import StudentsModal from "../components/studentsModal";
import UpdateInterviewStudentStatusForm from "../components/updateInterviewStudentStatus";
import DownloadCSV from "../components/download-CSV";
const Interviews = () => {
  const navigate = useNavigate();

  var { data: interviewsList, isLoading } = useGetAllInterviews();

  const { mutate: deleteInterview } = useDeleteInterview();
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are You Sure You Want to delete this Interview"
    );
    if (confirmDelete) {
      deleteInterview(id, {
        onSuccess: () => {
          invalidateQuery(["interviews"]);
          toast.success("interview Deleted Successfully");
        },
      });
    }
  };

  const [selectedInterview, setSelectedInterview] = useState(null);

  const { isOpen, openModal, onRequestClose } = useModal();
  const changeStudentStatusFormID = "changeStudentStatus";

  interviewsList && console.log(interviewsList.data);
  if (isLoading) return <Loader />;

  if (!interviewsList) return;

  return (
    <div>
      <div className="flex justify-between items-center pb-3">
        <h2 className="text-2xl text pl-4 font-bold text-gray-900">
          INTERVIEWS
        </h2>
        <button
          type="button"
          className="text-white bg-blue-400 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none dark:focus:ring-blue-800"
          onClick={() =>
            navigate("/interviews-create-update/", { state: { id: null } })
          }
        >
          Create Interview
        </button>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      No.
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Students Status
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {interviewsList.data.map((interview, index) => (
                    <tr
                      key={interview._id}
                      className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-400"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {interview.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {new Date(interview.date).toLocaleDateString()}
                      </td>
                      <td
                        className="whitespace-nowrap px-6 py-4"
                        onClick={() => {
                          setSelectedInterview(interview._id);
                          openModal();
                        }}
                      >
                        <span className="inline-block bg-gray-900 hover:bg-white border hover:border-gray-900 transition-all ease-in-out duration-300 hover:text-gray-900 text-white px-3 py-2 text-md rounded-lg capitalize cursor-pointer font-semibold">
                          change Students status
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <img
                          src={edit}
                          alt="edit button"
                          width="20px"
                          className="inline-block mr-5 hover:scale-125"
                          onClick={() =>
                            navigate("/interviews-create-update/", {
                              state: {
                                id: interview._id,
                              },
                            })
                          }
                        />
                        <img
                          src={trash}
                          alt="delete button"
                          width="20px"
                          className="inline-block hover:scale-125"
                          onClick={() => handleDelete(interview._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {isOpen && (
                <StudentsModal
                  isOpen={isOpen}
                  onRequestClose={onRequestClose}
                  submitButtonProps={{ form: changeStudentStatusFormID }}
                  title="Update Student Status"
                >
                  <UpdateInterviewStudentStatusForm
                    id={selectedInterview}
                    form_id={changeStudentStatusFormID}
                    onRequestClose={onRequestClose}
                  />
                </StudentsModal>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interviews;
