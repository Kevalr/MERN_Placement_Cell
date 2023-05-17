import { CSVLink } from "react-csv";
import { useGetDetailedInterviews } from "../hooks/interviews";
import { useEffect, useState } from "react";

const DownloadCSV = () => {
  const { data, isLoading } = useGetDetailedInterviews();
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    debugger;
    if (!data) {
      return;
    }
    console.log(data);
    formatForCSV(data);
  }, [data]);

  function formatForCSV(data) {
    let result = [];
    for (let interview of data) {
      for (let student of interview?.students) {
        let obj = {
          name: student?.id?.name,
          collage: student?.id?.collage,
          dsa: student?.id?.scores.dsa,
          webdev: student?.id?.scores.webdev,
          react: student?.id?.scores.react,
          interview: interview.name,
          date: new Date(interview?.date).toLocaleDateString(),
          result: student?.status,
        };
        result.push(obj);
      }
    }
    console.log(result, "report data");
    setReportData(result);
  }

  const headers = [
    { label: "Name", key: "name" },
    { label: "Collage", key: "collage" },
    { label: "DSA Score", key: "dsa" },
    { label: "Web Dev Score", key: "webdev" },
    { label: "React Score", key: "react" },
    { label: "Interview", key: "interview" },
    { label: "Date", key: "date" },
    { label: "Result", key: "result" },
  ];

  return (
    <CSVLink data={reportData} headers={headers}>
      <button className="ml-10 text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-6 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 mr-2">
        {isLoading ? "Generating CSV" : "Download CSV"}
      </button>
    </CSVLink>
  );
};

export default DownloadCSV;
