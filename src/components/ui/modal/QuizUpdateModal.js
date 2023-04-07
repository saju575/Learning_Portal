import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEditQuizMutation } from "../../../features/admin/quizes/quizesApi";
import { setShowUpdateModal } from "../../../features/admin/quizes/quizesSlice";
import { useGetVideosQuery } from "../../../features/videos/videosApi";
import style from "./QuizAddModal.module.css";

// action types
const SET_QUESTION = "SET_QUESTION";
const SET_OPTION = "SET_OPTION";
const SET_CORRECT = "SET_CORRECT";
const SET_VIDEO = "SET_VIDEO";
const CLEAR_STATE = "CLEAR_STATE";

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
            ? { ...option, isCorrect: action.payload.value }
            : { ...option }
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

const QuizUpdateModal = () => {
  const { data: videoList, isSuccess } = useGetVideosQuery();
  const { quiz } = useSelector((state) => state.adminQuiz);
  const initialState = {
    question: quiz.question,
    video_id: quiz.video_id,
    video_title: "",
    options: [
      {
        id: 1,
        option: quiz.options[0].option,
        isCorrect: quiz.options[0].isCorrect,
      },
      {
        id: 2,
        option: quiz.options[1].option,
        isCorrect: quiz.options[1].isCorrect,
      },
      {
        id: 3,
        option: quiz.options[2].option,
        isCorrect: quiz.options[2].isCorrect,
      },
      {
        id: 4,
        option: quiz.options[3].option,
        isCorrect: quiz.options[3].isCorrect,
      },
    ],
  };
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const [editQuiz, { isSuccess: editSuccess, isLoading }] =
    useEditQuizMutation();
  const { showUpdateModal } = useSelector((s) => s.adminQuiz);
  const dispatch1 = useDispatch();
  useEffect(() => {
    if (editSuccess) {
      dispatch({ type: CLEAR_STATE });

      dispatch1(setShowUpdateModal(false));
    }
  }, [dispatch1, editSuccess]);
  const handleSubmit = (e) => {
    e.preventDefault();
    // eslint-disable-next-line eqeqeq
    const video = videoList.find((v) => v.id == state.video_id);
    editQuiz({
      id: quiz.id,
      data: { ...state, video_id: video.id, video_title: video.title },
    });
  };

  return (
    <>
      {showUpdateModal && (
        <div className={style.modal}>
          <div className={style.modalContent}>
            <span
              onClick={() => dispatch1(setShowUpdateModal(false))}
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

              <div className={style.checkbox}>
                <div>
                  <label>Select answers for this question given below</label>
                </div>
                {state.options[0].option && (
                  <>
                    <input
                      type="checkbox"
                      id="checkbox1"
                      name="checkbox1"
                      value={state.options[0].id}
                      checked={state.options[0].isCorrect}
                      onChange={(e) => {
                        dispatch({
                          type: SET_CORRECT,
                          payload: { id: 1, value: e.target.checked },
                        });
                      }}
                    />
                    <label htmlFor="checkbox1">{state.options[0].option}</label>
                    <br />
                  </>
                )}

                {state.options[1].option && (
                  <>
                    <input
                      type="checkbox"
                      id="checkbox2"
                      name="checkbox2"
                      value={state.options[1].id}
                      checked={state.options[1].isCorrect}
                      onChange={(e) => {
                        dispatch({
                          type: SET_CORRECT,
                          payload: { id: 2, value: e.target.checked },
                        });
                      }}
                    />
                    <label htmlFor="checkbox2">{state.options[1].option}</label>
                    <br />
                  </>
                )}

                {state.options[2].option && (
                  <>
                    <input
                      type="checkbox"
                      id="checkbox3"
                      name="checkbox3"
                      value={state.options[2].id}
                      checked={state.options[2].isCorrect}
                      onChange={(e) => {
                        dispatch({
                          type: SET_CORRECT,
                          payload: { id: 3, value: e.target.checked },
                        });
                      }}
                    />
                    <label htmlFor="checkbox3">{state.options[2].option}</label>
                    <br />
                  </>
                )}

                {state.options[3].option && (
                  <>
                    <input
                      type="checkbox"
                      id="checkbox4"
                      name="checkbox4"
                      value={state.options[3].id}
                      checked={state.options[3].isCorrect}
                      onChange={(e) => {
                        dispatch({
                          type: SET_CORRECT,
                          payload: { id: 4, value: e.target.checked },
                        });
                      }}
                    />
                    <label htmlFor="checkbox4">{state.options[3].option}</label>
                    <br />
                  </>
                )}
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

export default QuizUpdateModal;
