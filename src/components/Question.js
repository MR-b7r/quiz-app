import Options from "./Options";
import { useQuiz } from "./context/QuizContext";
function Question() {
  const { filterQuestions, index } = useQuiz();
  const question = filterQuestions[index];
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
}

export default Question;
