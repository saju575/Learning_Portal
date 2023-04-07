import moment from "moment/moment";
import React, { useState } from "react";
import { useEditAssignmentMarkMutation } from "../../features/admin/assignmentMarks/assignmentMarksApi";

const TableRow = ({ assignmentMark }) => {
  const { student_name, title, repo_link, status, mark, createdAt, id } =
    assignmentMark || {};
  const [editAssignmentMark] = useEditAssignmentMarkMutation();
  const [markInput, setMarkInput] = useState(mark.toString());

  const markSubmit = (e) => {
    e.preventDefault();
    editAssignmentMark({
      id,
      data: {
        status: "published",
        mark: Number(markInput),
      },
    });
  };
  const editMark = () => {
    editAssignmentMark({
      id,
      data: { status: "pending" },
    });
  };
  return (
    <tr>
      <td className="table-td">{title}</td>
      <td className="table-td">
        {moment.utc(createdAt).local().format("DD MMM YYYY hh:mm:ss A")}
      </td>
      <td className="table-td">{student_name}</td>
      <td className="table-td">{repo_link}</td>
      <td className={`table-td input-mark`}>
        {status === "pending" ? (
          <form onSubmit={markSubmit}>
            <input
              type="number"
              max="100"
              required
              value={markInput}
              onChange={(e) => setMarkInput(e.target.value)}
            />
            <button type="submit">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </button>
          </form>
        ) : (
          <>
            <span style={{ width: "35px" }}>{mark}</span>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 hover:text-blue-500 cursor-pointer transition-all"
              onClick={editMark}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </>
        )}
      </td>
    </tr>
  );
};

export default TableRow;
