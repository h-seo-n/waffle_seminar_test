interface ProgressProps {
  readonly current: number;
  readonly total: number;
  readonly label?: string;
}

export function Progress({ current, total, label }: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));
  const ariaLabel = label ?? `${total}개 질문 중 ${current}번째 질문`;

  return (
    <div className="progress-wrap">
      <div className="progress-copy">
        <span>{label ?? "나의 관심사 찾는 중"}</span>
        <strong>{current} / {total}</strong>
      </div>
      <div
        className="progress-track"
        role="progressbar"
        aria-label={ariaLabel}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={current}
      >
        <span className="progress-value" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
