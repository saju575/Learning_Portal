import React from "react";
import RankTableRow from "./RankTableRow";

const RankTable = ({ leaderboard }) => {
  return (
    <div className="my-8">
      <h3 className="text-lg font-bold">Top 20 Result</h3>
      <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
        <thead>
          <tr className="border-b border-slate-600/50">
            <th className="table-th !text-center">Rank</th>
            <th className="table-th !text-center">Name</th>
            <th className="table-th !text-center">Quiz Mark</th>
            <th className="table-th !text-center">Assignment Mark</th>
            <th className="table-th !text-center">Total</th>
          </tr>
        </thead>

        <tbody>
          {/* Rank table row */}
          {leaderboard.map((ld) => (
            <RankTableRow key={ld.id} ldInfo={ld} />
          ))}

          {/* <RankTableRow />
          <RankTableRow />
          <RankTableRow />
          <RankTableRow />
          <RankTableRow />
          <RankTableRow />
          <RankTableRow />
          <RankTableRow />
          <RankTableRow /> */}
        </tbody>
      </table>
    </div>
  );
};

export default RankTable;
