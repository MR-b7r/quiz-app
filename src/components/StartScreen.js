import { useQuiz } from "./context/QuizContext";

function StartScreen() {
  const { numQuestions, dispatch, question, difficulty, highscore } = useQuiz();
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>

      <p className="highscore">{`Highscore: ${highscore} points`}</p>

      <div className="difficulty">
        <h3>choose the difficulty of the questions: </h3>
        <select
          value={difficulty}
          onChange={(e) => {
            console.log(e.target.value);
            dispatch({ type: "setDifficulty", payload: e.target.value });
          }}
        >
          <option value="all">All</option>
          <option value="10">Easy</option>
          <option value="20">Medium</option>
          <option value="30">Hard</option>
        </select>
      </div>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
