import React from "react";

const MyLeaderboard = ({ myScore }) => {
  const { rank, student_name, quizMark, assignmentMark } = myScore;
  return (
    <div>
      <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
      <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
        <thead>
          <tr>
            <th className="table-th !text-center">Rank</th>
            <th className="table-th !text-center">Name</th>
            <th className="table-th !text-center">Quiz Mark</th>
            <th className="table-th !text-center">Assignment Mark</th>
            <th className="table-th !text-center">Total</th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-2 border-cyan">
            <td className="table-td text-center font-bold">{rank}</td>
            <td className="table-td text-center font-bold">{student_name}</td>
            <td className="table-td text-center font-bold">{quizMark}</td>
            <td className="table-td text-center font-bold">{assignmentMark}</td>
            <td className="table-td text-center font-bold">
              {assignmentMark + quizMark}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MyLeaderboard;
