import { useEffect, useRef, useState, type CSSProperties } from "react";
import { secondaryDescriptions, seminars } from "../data/seminars";
import type { PrimarySeminar, RecommendationResult, SeminarInfo } from "../domain/types";
import { downloadResultImage } from "../utils/resultImage";
import { copyText } from "../utils/share";
import { AppHeader } from "./AppHeader";
import {
  ArrowRightIcon,
  CopyIcon,
  DownloadIcon,
  LinkIcon,
  RefreshIcon,
  ShareIcon,
  SparkIcon,
} from "./Icons";

interface ResultPageProps {
  readonly result: RecommendationResult;
  readonly onHome: () => void;
  readonly onBack: () => void;
  readonly onOpenDetail: (seminar: PrimarySeminar | "pe") => void;
  readonly onRestart: () => void;
}

function seminarStyle(info: SeminarInfo): CSSProperties {
  return { "--accent": info.accent, "--tint": info.tint } as CSSProperties;
}

function ResultChoiceCard({
  info,
  onOpen,
  compact = false,
}: {
  readonly info: SeminarInfo;
  readonly onOpen: () => void;
  readonly compact?: boolean;
}) {
  return (
    <article className={`result-choice${compact ? " result-choice--compact" : ""}`} style={seminarStyle(info)}>
      <div className="result-choice__image-wrap">
        <img src={info.image} alt={info.imageAlt} className="result-choice__image" />
      </div>
      <div className="result-choice__body">
        <p className="result-choice__category">{info.category}</p>
        <h2>{info.shortName}</h2>
        <p className="result-choice__character">“{info.character}”</p>
        <p>{info.description[0]}</p>
        <button className="text-button" type="button" onClick={onOpen}>
          {info.cta} <ArrowRightIcon />
        </button>
      </div>
    </article>
  );
}

function SharePanel({ infos }: { readonly infos: readonly SeminarInfo[] }) {
  const [status, setStatus] = useState("");
  const hasWebShare = typeof navigator.share === "function";
  const names = infos.map((info) => info.shortName).join("와 ");
  const shareText = `나는 와플스튜디오 24.5기 세미나 중 ${names}${infos.length > 1 ? "가" : "가"} 제일 잘 맞는대요 🧇\n당신에게 맞는 세미나도 찾아보세요!`;

  const run = async (action: () => Promise<void>, success: string) => {
    try {
      await action();
      setStatus(success);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setStatus("작업을 완료하지 못했어요. 잠시 후 다시 시도해 주세요.");
    }
  };

  return (
    <section className="share-section" aria-labelledby="share-title">
      <div>
        <p className="section-kicker">SHARE</p>
        <h2 id="share-title">친구와 결과 나누기</h2>
        <p>로그인 없이 링크나 텍스트로 가볍게 공유할 수 있어요.</p>
      </div>
      <div className="share-actions">
        {hasWebShare ? (
          <button
            type="button"
            className="share-button share-button--primary"
            onClick={() => run(
              () => navigator.share({
                title: "나에게 맞는 와플 세미나는?",
                text: shareText,
                url: window.location.href,
              }),
              "공유했어요!",
            )}
          >
            <ShareIcon /> 결과 공유하기
          </button>
        ) : null}
        <button type="button" className="share-button" onClick={() => run(() => copyText(window.location.href), "링크를 복사했어요!")}>
          <LinkIcon /> 링크 복사
        </button>
        <button type="button" className="share-button" onClick={() => run(() => copyText(shareText), "결과 문구를 복사했어요!")}>
          <CopyIcon /> 텍스트 복사
        </button>
        <button type="button" className="share-button" onClick={() => run(() => downloadResultImage(infos), "결과 이미지를 저장했어요!")}>
          <DownloadIcon /> 이미지 저장
        </button>
      </div>
      <p className="share-status" aria-live="polite">{status}</p>
    </section>
  );
}

export function ResultPage({ result, onHome, onBack, onOpenDetail, onRestart }: ResultPageProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const primaryInfos = result.primaries.map((seminar) => seminars[seminar]);
  const isTie = primaryInfos.length > 1;

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div className="page result-page">
      <AppHeader onHome={onHome} onBack={onBack} backLabel="환경 질문으로" />
      <main className="result-main">
        <header className="result-heading page-enter">
          <span className="result-badge"><SparkIcon /> 당신의 답변과 가장 가까운 세미나</span>
          <p className="eyebrow">YOUR SEMINAR IS...</p>
          <h1 ref={headingRef} tabIndex={-1}>
            {isTie
              ? `${primaryInfos.map((info) => info.shortName).join("와 ")} 사이에서 고민하고 있네요!`
              : primaryInfos[0]?.name}
          </h1>
          <p className="result-catchphrase">
            {isTie
              ? "만들고 싶은 결과물을 묻는 답까지 비슷했어요. 두 분야를 함께 살펴보고 더 끌리는 쪽을 골라보세요."
              : primaryInfos[0]?.catchphrase}
          </p>
        </header>

        <section className={`primary-results page-enter page-enter--late${isTie ? " primary-results--tie" : ""}`} aria-label="주 추천 결과">
          {primaryInfos.map((info) => (
            <ResultChoiceCard key={info.id} info={info} onOpen={() => onOpenDetail(info.id as PrimarySeminar)} />
          ))}
        </section>

        {result.iosUnavailableHint ? (
          <aside className="notice-card" aria-label="iOS 환경 안내">
            <span aria-hidden="true">💡</span>
            <p><strong>취향만 보면 iOS도 꽤 잘 맞아요.</strong><br />다만 이번 iOS 세미나는 Xcode 사용을 위해 macOS 기기가 필요합니다.</p>
          </aside>
        ) : null}

        {!isTie && result.secondary ? (
          <section className="secondary-section" aria-labelledby="secondary-title">
            <div className="section-heading-row">
              <div>
                <p className="section-kicker">ANOTHER POSSIBILITY</p>
                <h2 id="secondary-title">이것도 잘 맞을 수 있어요</h2>
              </div>
              <span className="different-field-badge">다른 분야 추천</span>
            </div>
            <article className="secondary-card" style={seminarStyle(seminars[result.secondary])}>
              <img src={seminars[result.secondary].image} alt="" />
              <div>
                <p>{seminars[result.secondary].category}</p>
                <h3>{seminars[result.secondary].shortName}</h3>
                <p>{secondaryDescriptions[result.secondary]}</p>
                <button type="button" className="text-button" onClick={() => onOpenDetail(result.secondary as PrimarySeminar)}>
                  {seminars[result.secondary].cta} <ArrowRightIcon />
                </button>
              </div>
            </article>
          </section>
        ) : null}

        {result.peRecommended ? (
          <section className="pe-card" aria-labelledby="pe-title" style={seminarStyle(seminars.pe)}>
            <div className="pe-card__image-wrap">
              <img src={seminars.pe.image} alt={seminars.pe.imageAlt} />
            </div>
            <div className="pe-card__content">
              <p className="section-kicker">ADDITIONAL RECOMMENDATION</p>
              <h2 id="pe-title">그리고 PE도 잘 맞아요 <span aria-hidden="true">🚀</span></h2>
              <p>한 분야만 배우는 것보다<br />아이디어를 실제 서비스로 완성하는 과정 전체가 궁금한 타입이에요.</p>
              <p>Product Engineering에서는 문제 발견과 기획부터 프론트엔드·백엔드·DB·배포까지 시스템 전체를 경험하고, Claude Code 같은 AI 에이전트와 함께 실제 모바일 제품을 만들어볼 수 있어요.</p>
              <p className="pe-card__warning"><strong>Rookie는 PE 세미나만 단독으로 수강할 수 없으므로, 위에서 추천받은 세미나와 함께 수강해보세요.</strong></p>
              <button type="button" className="text-button" onClick={() => onOpenDetail("pe")}>
                Product Engineering 자세히 보기 <ArrowRightIcon />
              </button>
            </div>
          </section>
        ) : null}

        <SharePanel infos={primaryInfos} />

        <div className="restart-section">
          <p>답변은 저장되지 않아요. 다른 선택이 궁금하다면 언제든 다시 시작해보세요.</p>
          <button type="button" className="secondary-button" onClick={onRestart}>
            <RefreshIcon /> 다시 테스트하기
          </button>
        </div>
      </main>
      <footer className="site-footer">결과는 세미나 선택을 돕는 가벼운 탐색 도구예요.</footer>
    </div>
  );
}
