import type { SeminarInfo } from "../domain/types";

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("결과 이미지를 불러오지 못했습니다."));
    image.src = src;
  });
}

function fitImage(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  size: number,
) {
  const ratio = Math.min(size / image.naturalWidth, size / image.naturalHeight);
  const width = image.naturalWidth * ratio;
  const height = image.naturalHeight * ratio;
  context.drawImage(image, x + (size - width) / 2, y + (size - height) / 2, width, height);
}

function drawWrappedText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(" ");
  let line = "";
  let lineY = y;
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (context.measureText(next).width > maxWidth && line) {
      context.fillText(line, x, lineY);
      line = word;
      lineY += lineHeight;
    } else {
      line = next;
    }
  }
  if (line) context.fillText(line, x, lineY);
}

export async function downloadResultImage(infos: readonly SeminarInfo[]): Promise<void> {
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 630;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("이미지를 만들 수 없습니다.");

  context.fillStyle = "#fffaf2";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#f5a623";
  context.fillRect(0, 0, 18, canvas.height);

  context.fillStyle = "#8a5415";
  context.font = "700 22px system-ui, sans-serif";
  context.letterSpacing = "2px";
  context.fillText("WAFFLESTUDIO 24.5 · ROOKIE SEMINAR", 72, 72);

  const title = infos.map((info) => info.shortName).join(" · ");
  context.fillStyle = "#171717";
  context.font = "800 58px system-ui, sans-serif";
  context.fillText(infos.length > 1 ? "나의 추천 세미나는" : "나의 추천 세미나는", 72, 164);
  context.fillStyle = infos[0]?.accent ?? "#f5a623";
  context.font = "900 78px system-ui, sans-serif";
  context.fillText(title, 72, 254, 670);

  context.fillStyle = "#404040";
  context.font = "500 28px system-ui, sans-serif";
  const caption = infos.length > 1
    ? "두 분야 모두 답변과 아주 가까워요."
    : (infos[0]?.catchphrase ?? "");
  drawWrappedText(context, caption, 72, 319, 650, 40);

  context.fillStyle = "#737373";
  context.font = "500 24px system-ui, sans-serif";
  context.fillText("당신에게 맞는 세미나도 찾아보세요! 🧇", 72, 536);
  context.fillStyle = "#171717";
  context.font = "700 22px system-ui, sans-serif";
  context.fillText("What Should I Bake?", 72, 578);

  const images = await Promise.all(infos.slice(0, 2).map((info) => loadImage(info.image)));
  if (images.length === 1 && images[0]) {
    fitImage(context, images[0], 775, 92, 370);
  } else {
    images.forEach((image, index) => fitImage(context, image, 750 + index * 205, 178, 260));
  }

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
  if (!blob) throw new Error("이미지를 저장할 수 없습니다.");
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `wafflestudio-${infos.map((info) => info.id).join("-")}-result.png`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1_000);
}
