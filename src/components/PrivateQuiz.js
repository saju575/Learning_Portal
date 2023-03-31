import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

const PrivateQuiz = ({ children, isAuthenticated }) => {
  const { quizId } = useParams();
  const [isOk, setOk] = useState(false);
  useEffect(() => {
    const id = sessionStorage.getItem("quizId");
    if (quizId == id) {
      setOk(true);
    }
  }, [quizId]);
  //console.log(isOk);
  return isOk ? children : <div>There is nothhing</div>;
};

export default PrivateQuiz;
