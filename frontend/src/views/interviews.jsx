import React from "react";
import Loader from "../components/common/Loader";
import { useNavigate } from "react-router-dom";
import { useDeleteStudent } from "../hooks/students";
import trash from "../assets/delete.png";
import edit from "../assets/edit.png";
import { invalidateQuery } from "../config/react-query-client";
import { toast } from "react-toastify";
import { useGetAllInterviews } from "../hooks/interviews";
import useModal from "../hooks/use-modal";
const Interviews = () => {
  const navigate = useNavigate();

  var { data: interviewsList, isLoading } = useGetAllInterviews();

  const { mutate: deleteStudent } = useDeleteStudent();
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are You Sure You Want to delete this student"
    );
    if (confirmDelete) {
      deleteStudent(id, {
        onSuccess: () => {
          invalidateQuery(["students"]);
          toast.success("Student Deleted Successfully");
        },
      });
    }
  };

  const { isOpen, openModal, onRequestClose } = useModal();

  interviewsList && console.log(interviewsList.data);
  if (isLoading) return <Loader />;

  if (!interviewsList) return;

  return (
    <div>
      <div className="flex justify-between items-center pb-3">
        <h2 className="text-2xl text pl-4 font-bold">Students</h2>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
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
                      Students
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
                        onClick={() =>
                          window.alert(
                            "Modal to  change student status with student name and collage and radios for status"
                          )
                        }
                      >
                        {"View Student Icon"}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interviews;
