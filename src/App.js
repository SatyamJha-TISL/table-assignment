import { useEffect, useState } from "react";
import { Pagination } from "./Pagination/Pagination";
import "./App.scss";
import { Table } from "./Table/Table";

const URL = `https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json`;

export default function App() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(5);

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentPageData = tableData.slice(indexOfFirstData, indexOfLastData);
  useEffect(() => {
    function getTableData() {
      setLoading(true);

      fetch(`${URL}`)
        .then((res) => res.json())
        .then((data) => {
          setTableData(data);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }

    getTableData();
  }, []);

  return (
    <div className="table-wrapper">
      <h2>Table</h2>
      <div>
        <Table currentPageData={currentPageData} />
        <Pagination
          dataPerPage={dataPerPage}
          totalPosts={tableData.length}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
