import fufuriImage from "../../images/waffle_choco_fufuri.png";
import { AppHeader } from "./AppHeader";
import { ArrowRightIcon, ClockIcon } from "./Icons";

interface LandingPageProps {
  readonly onStart: () => void;
  readonly onHome: () => void;
}

export function LandingPage({ onStart, onHome }: LandingPageProps) {
  return (
    <div className="page landing-page">
      <AppHeader onHome={onHome} />
      <main className="landing-main">
        <section className="hero" aria-labelledby="landing-title">
          <div className="hero__content page-enter">
            <p className="eyebrow">WHAT SHOULD I BAKE?</p>
            <h1 id="landing-title">이번 학기,<br />뭘 구워볼까요? <span aria-hidden="true">🧇</span></h1>
            <p className="hero__description">
              개발에는 정답이 없듯,<br />처음 배워야 할 분야에도 정답은 없습니다.
            </p>
            <p className="hero__description hero__description--strong">
              12개의 질문에 답하고<br />내가 가장 재미있게 배울 수 있는 세미나를 찾아보세요.
            </p>
            <button className="primary-button hero__cta" type="button" onClick={onStart}>
              내 세미나 찾아보기 <ArrowRightIcon />
            </button>
            <div className="hero__meta" aria-label="테스트 정보">
              <span><ClockIcon /> 소요시간 약 2분</span>
              <span aria-hidden="true" className="meta-dot" />
              <span>24.5기 Wafflestudio Rookies</span>
            </div>
          </div>

          <div className="hero-visual page-enter page-enter--late">
            <img className="hero-fufuri" src={fufuriImage} alt="와플스튜디오 캐릭터 푸푸리" />
          </div>
        </section>

      </main>
      <footer className="site-footer">Wafflestudio 24.5 · Rookie Seminar</footer>
    </div>
  );
}
