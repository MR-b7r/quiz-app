import { useQuiz } from "./context/QuizContext";

function FinishScreen() {
  const { points, maxPossiblePoints, highscore, dispatch } = useQuiz();
  const percentage = (points / maxPossiblePoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🥈";
  if (percentage >= 50 && percentage < 80) emoji = "🥉";
  if (percentage >= 0 && percentage < 50) emoji = "👎";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span>
        You scored{" "}
        <strong>
          {points} out of {maxPossiblePoints} {Math.ceil(percentage)}%
        </strong>
      </p>
      <p className="highscore">{`Highscore: ${highscore} points`}</p>
      <p className="btn btn-ui" onClick={() => dispatch({ type: "restart" })}>
        Restart Quiz
      </p>
      <p
        className="see-answer btn btn-ui"
        onClick={() => dispatch({ type: "seeAnswers" })}
      >
        see answers
      </p>
    </>
  );
}

export default FinishScreen;
