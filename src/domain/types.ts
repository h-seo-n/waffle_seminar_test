export const seminarIds = [
  "react",
  "fastapi",
  "spring",
  "ios",
  "android",
  "pe",
] as const;

export type Seminar = (typeof seminarIds)[number];
export type PrimarySeminar = Exclude<Seminar, "pe">;
export type Category = "frontend" | "backend" | "mobile";
export type Scores = Record<Seminar, number>;
export type CategoryScores = Record<Category, number>;

export interface Answer {
  readonly label: "A" | "B" | "C" | "D";
  readonly text: string;
  readonly scores: Partial<Scores>;
}

export interface Question {
  readonly id: number;
  readonly question: string;
  readonly answers: readonly Answer[];
}

export type AnswerSelections = Readonly<Record<number, number>>;

export interface SeminarInfo {
  readonly id: Seminar;
  readonly name: string;
  readonly shortName: string;
  readonly category: "Frontend" | "Backend" | "Mobile" | "Product Engineering";
  readonly catchphrase: string;
  readonly character: string;
  readonly description: readonly string[];
  readonly strengths: readonly string[];
  readonly schedule: string;
  readonly prerequisites: readonly string[];
  readonly image: string;
  readonly imageAlt: string;
  readonly accent: string;
  readonly tint: string;
  readonly cta: string;
}

export interface RecommendationResult {
  readonly primaries: readonly PrimarySeminar[];
  readonly primaryCategories: readonly Category[];
  readonly secondary: PrimarySeminar | null;
  readonly peRecommended: boolean;
  readonly iosUnavailableHint: boolean;
  readonly scores: Scores;
  readonly categoryScores: CategoryScores;
}
