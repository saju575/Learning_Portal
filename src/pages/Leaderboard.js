import React from "react";
import { useSelector } from "react-redux";
import MyLeaderboard from "../components/leaderboard/MyLeaderboard";
import RankTable from "../components/leaderboard/RankTable";
import Navbar from "../components/navbar/Navbar";
import Title from "../components/ui/Title";
import useGetStudentMarks from "../hooks/useGetStudentMarks";

const numberOfRankStudent = 20;
const Leaderboard = () => {
  const { leaderboard, isSuccess, isLoading } = useGetStudentMarks();
  const { user } = useSelector((state) => state.auth);

  let content = null;
  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (!isLoading && isSuccess && leaderboard.length === 0) {
    content = <div>No Student participate in quiz or assignment!</div>;
  } else if (!isLoading && isSuccess && leaderboard.length > 0) {
    const ldScore = leaderboard.filter((l) => l.rank <= numberOfRankStudent);
    const myScore = leaderboard.find((l) => l.student_id === user.id);
    let myContent = null;
    if (myScore) {
      myContent = <MyLeaderboard myScore={myScore} />;
    } else {
      myContent = <></>;
    }

    content = (
      <>
        {myContent}
        <RankTable leaderboard={ldScore} />
      </>
    );
  }

  return (
    <>
      <Title titleName={"Leaderboard"} isAdmin />
      <Navbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          {/* My Leaderboard */}
          {/* <MyLeaderboard /> */}

          {/* Rank */}
          {/* <RankTable /> */}
          {content}
        </div>
      </section>
    </>
  );
};

export default Leaderboard;
