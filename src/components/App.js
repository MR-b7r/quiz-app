import { useQuiz } from "./context/QuizContext";

import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Progress from "./Progress";
import Question from "./Question";
import NextButton from "./NextButton";
import PrevButton from "./PrevButton";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

export default function App() {
  const { status } = useQuiz();
  return (
    <div className="app">
      <Header />

      <Main className="main">
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {(status === "active" || status === "verify") && (
          <>
            <Progress />
            <Question />
            <Footer>
              {status !== "verify" && <Timer />}
              {status === "verify" && <PrevButton />}
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}
