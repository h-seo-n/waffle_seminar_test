import headerLogo from "../../images/icon_header.png";
import { ArrowLeftIcon } from "./Icons";

interface AppHeaderProps {
  readonly onHome: () => void;
  readonly onBack?: () => void;
  readonly backLabel?: string;
}

export function AppHeader({ onHome, onBack, backLabel = "이전으로" }: AppHeaderProps) {
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <div className="app-header__side">
          {onBack ? (
            <button className="back-button" type="button" onClick={onBack} aria-label={backLabel}>
              <ArrowLeftIcon />
              <span>이전</span>
            </button>
          ) : null}
        </div>
        <button className="logo-button" type="button" onClick={onHome} aria-label="처음 화면으로 돌아가기">
          <img className="header-logo" src={headerLogo} alt="Wafflestudio" />
        </button>
        <div className="app-header__side" aria-hidden="true" />
      </div>
    </header>
  );
}
