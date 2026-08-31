import { outcomeQuestionIds, questions } from "../data/questions";
import type {
  AnswerSelections,
  Category,
  CategoryScores,
  PrimarySeminar,
  RecommendationResult,
  Scores,
} from "./types";

export const PE_THRESHOLD = 14;
const categoryOrder: readonly Category[] = ["frontend", "backend", "mobile"];

export const emptyScores = (): Scores => ({
  react: 0,
  fastapi: 0,
  spring: 0,
  ios: 0,
  android: 0,
  pe: 0,
});

export function calculateScores(
  selections: AnswerSelections,
  includedQuestionIds?: ReadonlySet<number>,
): Scores {
  const scores = emptyScores();

  for (const question of questions) {
    if (includedQuestionIds && !includedQuestionIds.has(question.id)) continue;
    const selectedIndex = selections[question.id];
    if (selectedIndex === undefined) continue;
    const answer = question.answers[selectedIndex];
    if (!answer) continue;

    for (const [seminar, score] of Object.entries(answer.scores)) {
      const key = seminar as keyof Scores;
      scores[key] += score;
    }
  }

  return scores;
}

export function getCategoryScores(scores: Scores, hasMac: boolean): CategoryScores {
  return {
    frontend: scores.react,
    backend: Math.max(scores.fastapi, scores.spring),
    mobile: Math.max(hasMac ? scores.ios : Number.NEGATIVE_INFINITY, scores.android),
  };
}

function leaders(categories: readonly Category[], values: CategoryScores): Category[] {
  const highest = Math.max(...categories.map((category) => values[category]));
  return categories.filter((category) => values[category] === highest);
}

function seminarForCategory(
  category: Category,
  scores: Scores,
  hasMac: boolean,
): PrimarySeminar {
  if (category === "frontend") return "react";
  if (category === "backend") {
    return scores.fastapi > scores.spring ? "fastapi" : "spring";
  }
  return hasMac && scores.ios > scores.android ? "ios" : "android";
}

function resolvePrimaryCategories(
  categoryScores: CategoryScores,
  outcomeCategoryScores: CategoryScores,
): Category[] {
  const totalLeaders = leaders(categoryOrder, categoryScores);
  if (totalLeaders.length === 1) return totalLeaders;

  const outcomeLeaders = leaders(totalLeaders, outcomeCategoryScores);
  if (outcomeLeaders.length === 1) return outcomeLeaders;

  // 명세는 최종 동점 시 두 세미나를 함께 보여주도록 한다. 순서는 항상 동일하다.
  return outcomeLeaders.slice(0, 2);
}

function resolveSecondary(
  primaryCategories: readonly Category[],
  scores: Scores,
  categoryScores: CategoryScores,
  outcomeCategoryScores: CategoryScores,
  hasMac: boolean,
): PrimarySeminar | null {
  if (primaryCategories.length !== 1) return null;
  const candidates = categoryOrder.filter((category) => category !== primaryCategories[0]);
  const totalLeaders = leaders(candidates, categoryScores);
  const ranked = totalLeaders.length > 1 ? leaders(totalLeaders, outcomeCategoryScores) : totalLeaders;
  const secondaryCategory = ranked[0];
  return secondaryCategory ? seminarForCategory(secondaryCategory, scores, hasMac) : null;
}

export function calculateResult(
  scores: Scores,
  outcomeScores: Scores,
  hasMac: boolean,
): RecommendationResult {
  const categoryScores = getCategoryScores(scores, hasMac);
  const outcomeCategoryScores = getCategoryScores(outcomeScores, hasMac);
  const primaryCategories = resolvePrimaryCategories(categoryScores, outcomeCategoryScores);
  const primaries = primaryCategories.map((category) => seminarForCategory(category, scores, hasMac));
  const otherHighest = Math.max(scores.react, scores.fastapi, scores.spring, scores.android);

  return {
    primaries,
    primaryCategories,
    secondary: resolveSecondary(
      primaryCategories,
      scores,
      categoryScores,
      outcomeCategoryScores,
      hasMac,
    ),
    peRecommended: scores.pe >= PE_THRESHOLD,
    iosUnavailableHint: !hasMac && scores.ios > scores.android && scores.ios >= otherHighest,
    scores,
    categoryScores,
  };
}

export function calculateResultFromAnswers(
  selections: AnswerSelections,
  hasMac: boolean,
): RecommendationResult {
  return calculateResult(
    calculateScores(selections),
    calculateScores(selections, outcomeQuestionIds),
    hasMac,
  );
}
