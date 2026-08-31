import { useEffect, useRef, useState } from "react";
import type { Question } from "../domain/types";
import { AppHeader } from "./AppHeader";
import { CheckIcon } from "./Icons";
import { Progress } from "./Progress";

interface QuestionPageProps {
  readonly question: Question;
  readonly currentIndex: number;
  readonly total: number;
  readonly selectedIndex?: number;
  readonly onHome: () => void;
  readonly onSelect: (answerIndex: number) => void;
  readonly onNext: () => void;
  readonly onBack: () => void;
}

export function QuestionPage({
  question,
  currentIndex,
  total,
  selectedIndex,
  onHome,
  onSelect,
  onNext,
  onBack,
}: QuestionPageProps) {
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    headingRef.current?.focus();
    setPendingIndex(null);
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, [question.id]);

  const handleSelect = (answerIndex: number) => {
    if (pendingIndex !== null) return;
    setPendingIndex(answerIndex);
    onSelect(answerIndex);
    timerRef.current = window.setTimeout(onNext, 240);
  };

  return (
    <div className="page quiz-page">
      <AppHeader onHome={onHome} onBack={onBack} backLabel="이전 질문으로" />
      <main className="quiz-main">
        <Progress current={currentIndex + 1} total={total} />
        <section className="question-card page-enter" key={question.id} aria-labelledby={`question-${question.id}`}>
          <p className="question-number">QUESTION {String(question.id).padStart(2, "0")}</p>
          <h1 id={`question-${question.id}`} ref={headingRef} tabIndex={-1}>{question.question}</h1>
          <div className="answer-list" role="group" aria-label={`${question.id}번 질문 선택지`}>
            {question.answers.map((answer, answerIndex) => {
              const isSelected = pendingIndex === answerIndex || (pendingIndex === null && selectedIndex === answerIndex);
              return (
                <button
                  className={`answer-button${isSelected ? " answer-button--selected" : ""}`}
                  type="button"
                  key={answer.label}
                  onClick={() => handleSelect(answerIndex)}
                  disabled={pendingIndex !== null}
                  aria-pressed={isSelected}
                >
                  <span className="answer-label" aria-hidden="true">{answer.label}</span>
                  <span className="answer-text">{answer.text}</span>
                  <span className="answer-check" aria-hidden="true"><CheckIcon /></span>
                </button>
              );
            })}
          </div>
          <p className="keyboard-hint">키보드의 Tab으로 이동하고 Enter 또는 Space로 선택할 수 있어요.</p>
        </section>
      </main>
    </div>
  );
}
