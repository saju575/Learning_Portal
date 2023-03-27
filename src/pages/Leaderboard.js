import React from "react";
import MyLeaderboard from "../components/leaderboard/MyLeaderboard";
import RankTable from "../components/leaderboard/RankTable";

const Leaderboard = () => {
  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        {/* My Leaderboard */}
        <MyLeaderboard />

        {/* Rank */}
        <RankTable />
      </div>
    </section>
  );
};

export default Leaderboard;
