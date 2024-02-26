import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

const SECS_PER_QUESTION = 7;

const initialState = {
  questions: [],
  filterQuestions: [],

  // loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: JSON.parse(localStorage.getItem("highscore")) ?? 0,
  secondsRemaining: null,
  difficulty: "all",
  answers: [],
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
        filterQuestions: action.payload,
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.filterQuestions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.filterQuestions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
        answers: [...state.answers, action.payload],
      };
    case "nextQuestion":
      const iterator =
        state.index + 1 < state.filterQuestions.length
          ? state.index + 1
          : state.index;
      return {
        ...state,
        index: iterator,
        answer: state.answers.at(iterator) ? state.answers.at(iterator) : null,
      };
    case "prevQuestion":
      const index = state.index - 1 >= 0 ? state.index - 1 : state.index;

      return {
        ...state,
        index,
        answer: state.answers.at(index) ? state.answers.at(index) : null,
      };
    case "finish":
      const highscore =
        state.points > state.highscore ? state.points : state.highscore;

      localStorage.setItem("highscore", JSON.stringify(highscore));
      return {
        ...state,
        status: "finished",
        highscore,
      };
    case "seeAnswers":
      return {
        ...state,
        status: "verify",
        answer: state.answers.at(state.index),
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        filterQuestions: state.questions,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
        highscore:
          state.secondsRemaining === 0
            ? Math.max(state.points, state.highscore)
            : state.highscore,
      };
    case "setDifficulty": {
      return {
        ...state,
        difficulty: action.payload,
        filterQuestions:
          action.payload === "all"
            ? state.questions
            : state.questions.filter(
                (question) => question.points == action.payload
              ),
      };
    }
    default:
      throw new Error("Action unknown");
  }
}
const QuizProvider = function ({ children }) {
  const [
    {
      questions,
      filterQuestions,
      status,
      index,
      answer,
      points,
      highscore,
      secondsRemaining,
      difficulty,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = filterQuestions.length;

  const maxPossiblePoints = filterQuestions
    .map((question) => question.points)
    .reduce((acc, cur) => acc + cur, 0);

  useEffect(function () {
    fetch("http://localhost:7000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <QuizContext.Provider
      value={{
        questions,
        filterQuestions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        difficulty,
        numQuestions,
        maxPossiblePoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) throw new Error("QuizContext was used outside QuizProvider ");
  return context;
}

export { QuizProvider, useQuiz };
