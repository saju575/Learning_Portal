import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAddQuizMutation } from "../../../features/admin/quizes/quizesApi";
import { setShowAddModal } from "../../../features/admin/quizes/quizesSlice";
import { useGetVideosQuery } from "../../../features/videos/videosApi";
import style from "./QuizAddModal.module.css";

// action types
const SET_QUESTION = "SET_QUESTION";
const SET_OPTION = "SET_OPTION";
const SET_CORRECT = "SET_CORRECT";
const SET_VIDEO = "SET_VIDEO";
const CLEAR_STATE = "CLEAR_STATE";

const initialState = {
  question: "",
  video_id: "",
  video_title: "",
  options: [
    {
      id: 1,
      option: "",
      isCorrect: false,
    },
    {
      id: 2,
      option: "",
      isCorrect: false,
    },
    {
      id: 3,
      option: "",
      isCorrect: false,
    },
    {
      id: 4,
      option: "",
      isCorrect: false,
    },
  ],
};

function quizReducer(state, action) {
  switch (action.type) {
    case SET_QUESTION:
      return { ...state, question: action.payload };
    case SET_VIDEO:
      return { ...state, video_id: action.payload.id };
    case SET_OPTION:
      return {
        ...state,
        options: state.options.map((option) =>
          option.id === action.payload.id
            ? { ...option, option: action.payload.text }
            : option
        ),
      };
    case SET_CORRECT:
      return {
        ...state,
        options: state.options.map((option) =>
          option.id === action.payload.id
            ? { ...option, isCorrect: true }
            : { ...option, isCorrect: false }
        ),
      };
    case CLEAR_STATE:
      return {
        ...state,
        question: "",
        video_id: "",
        options: state.options.map((o) => ({
          ...o,
          isCorrect: false,
          option: "",
        })),
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const QuizAddModal = () => {
  const { data: videoList, isSuccess } = useGetVideosQuery();
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const [optionId, setOptionId] = useState("");
  const [addQuiz, { isSuccess: addSuccess, isLoading }] = useAddQuizMutation();
  const { showAddModal } = useSelector((s) => s.adminQuiz);
  const dispatch1 = useDispatch();
  useEffect(() => {
    if (addSuccess) {
      dispatch({ type: CLEAR_STATE });
      setOptionId("");
      dispatch1(setShowAddModal(false));
    }
  }, [dispatch1, addSuccess]);
  const handleSubmit = (e) => {
    e.preventDefault();
    // eslint-disable-next-line eqeqeq
    const video = videoList.find((v) => v.id == state.video_id);
    addQuiz({ ...state, video_id: video.id, video_title: video.title });
  };

  return (
    <>
      {showAddModal && (
        <div className={style.modal}>
          <div className={style.modalContent}>
            <span
              onClick={() => dispatch1(setShowAddModal(false))}
              className={style.close}
            >
              &times;
            </span>
            <h2>Add Quiz According to Video</h2>
            <form className={style.form} onSubmit={handleSubmit}>
              <div className={style.inputBox}>
                <label>Question Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter question title"
                  required
                  value={state.question}
                  onChange={(e) => {
                    dispatch({ type: SET_QUESTION, payload: e.target.value });
                  }}
                />
              </div>
              <div className={style.inputBox}>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter option 1"
                  required
                  value={state.options[0].option}
                  onChange={(e) => {
                    dispatch({
                      type: SET_OPTION,
                      payload: { id: 1, text: e.target.value },
                    });
                  }}
                />
              </div>
              <div className={style.inputBox}>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter option 2"
                  required
                  value={state.options[1].option}
                  onChange={(e) => {
                    dispatch({
                      type: SET_OPTION,
                      payload: { id: 2, text: e.target.value },
                    });
                  }}
                />
              </div>
              <div className={style.inputBox}>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter option 3"
                  required
                  value={state.options[2].option}
                  onChange={(e) => {
                    dispatch({
                      type: SET_OPTION,
                      payload: { id: 3, text: e.target.value },
                    });
                  }}
                />
              </div>
              <div className={style.inputBox}>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter option 4"
                  required
                  value={state.options[3].option}
                  onChange={(e) => {
                    dispatch({
                      type: SET_OPTION,
                      payload: { id: 4, text: e.target.value },
                    });
                  }}
                />
              </div>

              <div className={style.column}>
                <div className={style.inputBox}>
                  <label>Select Answer</label>
                  <div className={style.selectBox}>
                    <select
                      required
                      value={optionId}
                      onChange={(e) => {
                        setOptionId(e.target.value);
                        dispatch({
                          type: SET_CORRECT,
                          payload: { id: parseInt(e.target.value) },
                        });
                      }}
                    >
                      <option value={""} hidden>
                        Select answer
                      </option>
                      {state.options.map((o) => (
                        <option key={o.id} value={o.id}>
                          {o.option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className={style.inputBox}>
                  <label>Available Video Title List</label>
                  <div className={style.selectBox}>
                    <select
                      required
                      value={state.video_id}
                      onChange={(e) => {
                        dispatch({
                          type: SET_VIDEO,
                          payload: { id: e.target.value },
                        });
                      }}
                    >
                      <option value={""} hidden>
                        Select video title
                      </option>
                      {isSuccess &&
                        videoList.length > 0 &&
                        videoList.map((v) => (
                          <option key={v.id} value={v.id}>
                            {v.title}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className={style.btnDiv}>
                <button disabled={isLoading}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default QuizAddModal;
