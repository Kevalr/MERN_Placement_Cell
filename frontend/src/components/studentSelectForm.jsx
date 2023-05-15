import React, { useEffect } from "react";
import { useGetAllStudents } from "../hooks/students";
import Loader from "./common/Loader";
import { useForm } from "react-hook-form";

const StudentSelectForm = ({
  onRequestClose,
  selectedStudentList,
  setSelectedStudentList,
  formID,
}) => {
  //fetching Students List to select while creating interview
  let { data: studentList, isLoading: isStudentListLoading } =
    useGetAllStudents();

  const {
    register,
    handleSubmit,
    // reset: resetStudents,
  } = useForm({
    mode: "onChange",
  });

  //pela selected add kari devana, pachi normal add karavana , if ae student already selected ma na hoy to

  const formatStudentList = () => {
    debugger;
    let formattedStudentList = [
      selectedStudentList.map((student) => student.id._id),
    ];
    for (let student of studentList.data) {
      debugger;
      console.log(student);
      console.log(formattedStudentList.includes(student._id), " - found");
    }
    //     let selectedStudent = interviewDetails?.data?.students;
    //     let formattedStudentList = [];
    //     studentList.data.map((student) => {
    //       if (
    //         selectedStudent.find(
    //           (selectedStudent) => selectedStudent.id._id === student._id
    //         )
    //       ) {
    //         formattedStudentList.push({ ...student, selected: true });
    //       } else {
    //         formattedStudentList.push({ ...student, selected: false });
    //       }
    //       return "";
    //     });
    //     studentList = formattedStudentList;
    //   };
    //   if (
    //     !isStudentListLoading &&
    //     studentList.data.length > 0 &&
    //     !isInterviewDetailsLoading &&
    //     interviewDetails
    //   ) {
    //     formatStudentList();
    //     console.log("studeee", studentList);
  };

  useEffect(() => {
    if (studentList?.data.length > 0 && selectedStudentList?.length > 0) {
      console.log(studentList);
      console.log(selectedStudentList);
      formatStudentList();
    }
    return;
  }, [studentList]);

  const onSubmit = (data) => {
    setSelectedStudentList(data.test);
    console.log(data, "selected Students");
    onRequestClose();
  };
  if (isStudentListLoading) return <Loader />;

  return (
    <>
      <form id={formID} onSubmit={handleSubmit(onSubmit)}>
        {studentList.data?.map((student, index) => (
          <>
            <input
              key={student._id}
              type="checkbox"
              checked={student.selected}
              //   checked={index == 1}
              value={student._id}
              {...register("test")}
            />
            <label>{student.name} </label>
            <label>{student.collage}</label>
            <br />
          </>
        ))}
      </form>
    </>
  );
};

export default StudentSelectForm;
