import { useEffect } from "react";
import "./Table.scss";

const tableHeader = [
  { text: "S.No." },
  { text: "Percentage funded" },
  { text: "Amount pledged" },
];

export const Table = ({ currentPageData }) => {
  useEffect(() => {}, [currentPageData]);
  return (
    <table className="data-table">
      <thead>
        <tr className="table-header-row">
          {tableHeader.map((headerText, index) => (
            <th key={`${index}`}>{headerText.text}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {currentPageData?.map((post, index) => (
          <tr key={index} className="data-item">
            <td>{post?.["s.no"] ?? ""}</td>
            <td>{post?.["percentage.funded"] ?? ""}</td>
            <td>{post?.["amt.pledged"] ?? ""}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
