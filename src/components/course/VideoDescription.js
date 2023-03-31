import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSubmitAssignmentMutation } from "../../features/assignment/assignmentApi";
import { changeAccess } from "../../features/quiz/quizSlice";
import useCheckAssignment from "../../hooks/useCheckAssignment";
import useCheckAssignmentSubmit from "../../hooks/useCheckAssignmentSubmit";
import { useCheckQuizGiven } from "../../hooks/useCheckQuizGiven";
import { useQuizHaveOrNot } from "../../hooks/useQuizHaveorNot";
import AssignmentLinkShowModal from "../ui/modal/AssignmentLinkShowModal";
import AssignmentSubmitModal from "../ui/modal/AssignmentSubmitModal";

const VideoDescription = ({ video }) => {
  const { title, description, createdAt, id } = video || {};
  const { user } = useSelector((state) => state.auth);
  const hasQuiz = useQuizHaveOrNot(id);
  const quizGivenOrNot = useCheckQuizGiven(user.id, id);
  //check if assignment is present or not
  const { isPresent: isAssignmentPresent, assignment } = useCheckAssignment(id);
  //check if assignment is submitted or not
  const { checked: submittedAssignment, assignmentInfo } =
    useCheckAssignmentSubmit(user.id, assignment?.id);
  const [submitAssignment, { isSuccess, isLoading }] =
    useSubmitAssignmentMutation();
  //state for showing modal
  const [showModal, setShowModal] = useState(false);

  const [showLinkModal, setShowLinkModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //handle quiz
  const handleQuiz = () => {
    dispatch(changeAccess(true));
    sessionStorage.setItem("quizId", id);
    navigate(`/quiz/${id}`);
  };
  const handleAssignmentSubmit = (e, link) => {
    e.preventDefault();
    submitAssignment({
      student_id: user.id,
      student_name: user.name,
      assignment_id: assignment.id,
      title: assignment.title,
      totalMark: assignment.totalMark,
      mark: 0,
      createdAt: new Date().toISOString(),
      repo_link: link,
      status: "pending",
    });
  };

  //decide which button to render
  let buttonContent = null;
  if (isAssignmentPresent) {
    if (!submittedAssignment) {
      buttonContent = (
        <button
          onClick={() => setShowModal(true)}
          className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
        >
          এসাইনমেন্ট জমা দিন
        </button>
      );
    } else {
      buttonContent = (
        <>
          <button className="px-3 font-bold py-1 border border-cyan  rounded-full text-sm bg-cyan text-primary cursor-default">
            সর্বমোট নাম্বার - {assignmentInfo?.totalMark}
          </button>
          <button
            onClick={() => setShowLinkModal(true)}
            className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
          >
            আপনি যা জমা দিয়েছেন
          </button>
          <button className="px-3 font-bold py-1 border border-cyan rounded-full text-sm bg-cyan text-primary cursor-default">
            {assignmentInfo?.status === "pending"
              ? "প্রাপ্ত নাম্বার - PENDING"
              : `প্রাপ্ত নাম্বার - ${assignmentInfo?.mark}`}
          </button>
        </>
      );
    }
  }

  return (
    <div>
      <h1 className="text-lg font-semibold tracking-tight text-slate-100">
        {title}
      </h1>
      <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
        Uploaded on {moment.utc(createdAt).format("DD MMMM YYYY")}
      </h2>

      <div className="flex gap-4">
        {/* {isAssignmentPresent && (
          <button
            onClick={() => setShowModal(true)}
            className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
          >
            {submittedAssignment ? "Pending" : "এসাইনমেন্ট"}
          </button>
        )} */}

        {hasQuiz ? (
          <button
            className={`px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm ${
              quizGivenOrNot
                ? "disable"
                : "hover:bg-cyan hover:text-primary cursor-pointer"
            }`}
            onClick={handleQuiz}
            disabled={quizGivenOrNot}
          >
            {quizGivenOrNot ? "কুইজ দেওয়া হয়েছে" : "কুইজে অংশগ্রহণ করুন"}
          </button>
        ) : (
          <button
            className={`px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm disable`}
            disabled
          >
            কোনো কুইজ নেই
          </button>
        )}
        {buttonContent}
      </div>
      <p className="mt-4 text-sm text-slate-400 leading-6">{description}</p>
      {
        <AssignmentSubmitModal
          showModal={showModal}
          setShowModal={setShowModal}
          data={assignment}
          handleSubmit={handleAssignmentSubmit}
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
      }
      {
        <AssignmentLinkShowModal
          showModal={showLinkModal}
          setShowModal={setShowLinkModal}
          data={assignmentInfo}
        />
      }
    </div>
  );
};

export default VideoDescription;
