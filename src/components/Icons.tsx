import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const baseProps: IconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function ArrowLeftIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><path d="m15 18-6-6 6-6" /></svg>;
}

export function ArrowRightIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><path d="m9 18 6-6-6-6" /></svg>;
}

export function CheckIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><path d="m5 12 4 4L19 6" /></svg>;
}

export function ClockIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
}

export function CopyIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><rect x="8" y="8" width="11" height="11" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></svg>;
}

export function DownloadIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 20h14" /></svg>;
}

export function LinkIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1" /><path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1" /></svg>;
}

export function RefreshIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><path d="M20 6v5h-5" /><path d="M18.5 15a8 8 0 1 1-.4-6.5L20 11" /></svg>;
}

export function ShareIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><circle cx="18" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="19" r="2.5" /><path d="m8.2 10.8 7.5-4.4M8.2 13.2l7.5 4.4" /></svg>;
}

export function SparkIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><path d="m12 3 1.2 4.1a5 5 0 0 0 3.4 3.4L21 12l-4.4 1.5a5 5 0 0 0-3.4 3.4L12 21l-1.2-4.1a5 5 0 0 0-3.4-3.4L3 12l4.4-1.5a5 5 0 0 0 3.4-3.4L12 3Z" /></svg>;
}
