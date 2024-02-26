import { useQuiz } from "./context/QuizContext";

function PrevButton() {
  const { dispatch, index } = useQuiz();

  return (
    <button
      className="see-answer btn btn-ui"
      onClick={() => dispatch({ type: "prevQuestion" })}
      disabled={!index}
    >
      Previous
    </button>
  );
}

export default PrevButton;
