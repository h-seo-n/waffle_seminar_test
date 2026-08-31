import { useEffect, useMemo, useState } from "react";
import { EnvironmentPage } from "./components/EnvironmentPage";
import { LandingPage } from "./components/LandingPage";
import { QuestionPage } from "./components/QuestionPage";
import { ResultPage } from "./components/ResultPage";
import { SeminarDetailPage } from "./components/SeminarDetailPage";
import { questions } from "./data/questions";
import { calculateResultFromAnswers } from "./domain/scoring";
import type { AnswerSelections, RecommendationResult, Seminar } from "./domain/types";

type Screen = "landing" | "quiz" | "environment" | "result" | "detail";

export default function App() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selections, setSelections] = useState<AnswerSelections>({});
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [detailSeminar, setDetailSeminar] = useState<Seminar | null>(null);

  const currentQuestion = questions[questionIndex];
  const answeredCount = useMemo(() => Object.keys(selections).length, [selections]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [screen, questionIndex]);

  const start = () => {
    setQuestionIndex(0);
    setScreen("quiz");
  };

  const selectAnswer = (answerIndex: number) => {
    if (!currentQuestion) return;
    setSelections((current) => ({ ...current, [currentQuestion.id]: answerIndex }));
  };

  const nextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((index) => index + 1);
    } else {
      setScreen("environment");
    }
  };

  const goBackFromQuestion = () => {
    if (questionIndex === 0) {
      setScreen("landing");
      return;
    }
    setQuestionIndex((index) => index - 1);
  };

  const finish = (hasMac: boolean) => {
    if (answeredCount !== questions.length) return;
    setResult(calculateResultFromAnswers(selections, hasMac));
    setScreen("result");
  };

  const openDetail = (seminar: Seminar) => {
    setDetailSeminar(seminar);
    setScreen("detail");
  };

  const restart = () => {
    setSelections({});
    setQuestionIndex(0);
    setResult(null);
    setDetailSeminar(null);
    setScreen("landing");
  };

  if (screen === "landing") return <LandingPage onStart={start} onHome={restart} />;

  if (screen === "quiz" && currentQuestion) {
    return (
      <QuestionPage
        question={currentQuestion}
        currentIndex={questionIndex}
        total={questions.length}
        selectedIndex={selections[currentQuestion.id]}
        onHome={restart}
        onSelect={selectAnswer}
        onNext={nextQuestion}
        onBack={goBackFromQuestion}
      />
    );
  }

  if (screen === "environment") {
    return (
      <EnvironmentPage
        onHome={restart}
        onBack={() => {
          setQuestionIndex(questions.length - 1);
          setScreen("quiz");
        }}
        onComplete={finish}
      />
    );
  }

  if (screen === "result" && result) {
    return (
      <ResultPage
        result={result}
        onHome={restart}
        onBack={() => setScreen("environment")}
        onOpenDetail={openDetail}
        onRestart={restart}
      />
    );
  }

  if (screen === "detail" && detailSeminar) {
    return <SeminarDetailPage seminarId={detailSeminar} onHome={restart} onBack={() => setScreen("result")} onRestart={restart} />;
  }

  return <LandingPage onStart={start} onHome={restart} />;
}
