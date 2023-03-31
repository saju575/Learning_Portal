import React from "react";

const RankTableRow = ({ ldInfo }) => {
  const { rank, student_name, quizMark, assignmentMark } = ldInfo || {};
  return (
    <tr className="border-b border-slate-600/50">
      <td className="table-td text-center">{rank}</td>
      <td className="table-td text-center">{student_name}</td>
      <td className="table-td text-center">{quizMark}</td>
      <td className="table-td text-center">{assignmentMark}</td>
      <td className="table-td text-center">{assignmentMark + quizMark}</td>
    </tr>
  );
};

export default RankTableRow;
