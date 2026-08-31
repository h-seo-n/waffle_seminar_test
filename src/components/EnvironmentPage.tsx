import { useEffect, useRef, useState } from "react";
import { AppHeader } from "./AppHeader";
import { CheckIcon } from "./Icons";
import { Progress } from "./Progress";

interface EnvironmentPageProps {
  readonly onHome: () => void;
  readonly onBack: () => void;
  readonly onComplete: (hasMac: boolean) => void;
}

export function EnvironmentPage({ onHome, onBack, onComplete }: EnvironmentPageProps) {
  const [selected, setSelected] = useState<boolean | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    headingRef.current?.focus();
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  const choose = (hasMac: boolean) => {
    if (selected !== null) return;
    setSelected(hasMac);
    timerRef.current = window.setTimeout(() => onComplete(hasMac), 240);
  };

  return (
    <div className="page quiz-page">
      <AppHeader onHome={onHome} onBack={onBack} backLabel="12번 질문으로" />
      <main className="quiz-main">
        <Progress current={12} total={12} label="성향 질문 완료" />
        <section className="question-card environment-card page-enter" aria-labelledby="environment-title">
          <div className="environment-icon" aria-hidden="true">⌘</div>
          <p className="question-number">마지막 확인</p>
          <h1 id="environment-title" ref={headingRef} tabIndex={-1}>macOS 기기를 사용할 수 있나요?</h1>
          <p className="environment-description">
            iOS 세미나는 Xcode를 사용하기 위해 macOS 기기가 필요해요.<br />답변 성향은 그대로 두고, 실제 수강 가능한 추천을 위해서만 확인합니다.
          </p>
          <div className="environment-options" role="group" aria-label="macOS 기기 사용 가능 여부">
            {[
              { value: true, title: "네, 사용할 수 있어요", caption: "iOS를 포함해 추천할게요" },
              { value: false, title: "아니요", caption: "iOS를 Primary 결과에서 제외할게요" },
            ].map((option) => (
              <button
                key={String(option.value)}
                type="button"
                className={`environment-option${selected === option.value ? " environment-option--selected" : ""}`}
                onClick={() => choose(option.value)}
                disabled={selected !== null}
                aria-pressed={selected === option.value}
              >
                <span><strong>{option.title}</strong><small>{option.caption}</small></span>
                <span className="answer-check" aria-hidden="true"><CheckIcon /></span>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
