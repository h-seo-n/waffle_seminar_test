import { useEffect, useRef, type CSSProperties } from "react";
import { seminars } from "../data/seminars";
import type { Seminar } from "../domain/types";
import { AppHeader } from "./AppHeader";
import { CheckIcon, ClockIcon, RefreshIcon } from "./Icons";

interface SeminarDetailPageProps {
  readonly seminarId: Seminar;
  readonly onHome: () => void;
  readonly onBack: () => void;
  readonly onRestart: () => void;
}

export function SeminarDetailPage({ seminarId, onHome, onBack, onRestart }: SeminarDetailPageProps) {
  const info = seminars[seminarId];
  const headingRef = useRef<HTMLHeadingElement>(null);
  const style = { "--accent": info.accent, "--tint": info.tint } as CSSProperties;

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div className="page detail-page" style={style}>
      <AppHeader onHome={onHome} onBack={onBack} backLabel="결과로 돌아가기" />
      <main className="detail-main page-enter">
        <header className="detail-hero">
          <div className="detail-hero__copy">
            <p className="eyebrow">SEMINAR DETAIL · {info.category.toUpperCase()}</p>
            <h1 ref={headingRef} tabIndex={-1}>{info.name}</h1>
            <p className="detail-catchphrase">{info.catchphrase}</p>
            <span className="character-chip">“{info.character}”</span>
          </div>
          <div className="detail-hero__image">
            <img src={info.image} alt={info.imageAlt} />
          </div>
        </header>

        <div className="detail-grid">
          <article className="detail-copy-card">
            {info.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </article>

          <aside className="seminar-info-card" aria-labelledby="seminar-info-title">
            <p className="section-kicker">SEMINAR INFO</p>
            <h2 id="seminar-info-title">세미나 정보</h2>
            {info.schedule ? (
              <>
                <div className="info-row">
                  <ClockIcon />
                  <div><span>일정</span><strong>{info.schedule}</strong></div>
                </div>
                <div className="info-divider" />
              </>
            ) : null}
            <div className="prerequisites">
              <span>{seminarId === "ios" ? "필요 환경 · 선이수 지식" : seminarId === "pe" ? "중요" : "선이수 지식"}</span>
              {info.prerequisites.map((item) => <p key={item}>{item}</p>)}
            </div>
          </aside>
        </div>

        <section className="strength-card" aria-labelledby="strength-title">
          <p className="section-kicker">{seminarId === "pe" ? "CURRICULUM" : "GOOD FIT"}</p>
          <h2 id="strength-title">{seminarId === "pe" ? "6주 동안 이렇게 만들어요" : "이런 점이 특히 잘 맞아요"}</h2>
          <ul>
            {info.strengths.map((strength) => (
              <li key={strength}><span><CheckIcon /></span>{strength}</li>
            ))}
          </ul>
        </section>

        {seminarId === "pe" ? (
          <aside className="pe-important">
            <strong>Rookie는 Product Engineering만 단독으로 수강할 수 없습니다.</strong>
            <p>React / FastAPI / Spring / iOS / Android 중 하나의 세미나와 함께 수강해야 합니다.</p>
          </aside>
        ) : null}

        <div className="detail-actions">
          <button type="button" className="secondary-button" onClick={onBack}>결과로 돌아가기</button>
          <button type="button" className="text-button" onClick={onRestart}><RefreshIcon /> 다시 테스트하기</button>
        </div>
      </main>
    </div>
  );
}
