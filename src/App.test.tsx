import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "./App";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("complete test flow", () => {
  it("can be completed with the keyboard and fully resets", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /내 세미나 찾아보기/ }));

    for (let questionNumber = 1; questionNumber <= 12; questionNumber += 1) {
      expect(screen.getByText(`${questionNumber} / 12`)).toBeInTheDocument();
      const group = screen.getByRole("group", { name: `${questionNumber}번 질문 선택지` });
      const firstAnswer = within(group).getAllByRole("button")[0];
      await waitFor(() => expect(screen.getByRole("heading", { level: 1 })).toHaveFocus());
      await user.tab();
      expect(firstAnswer).toHaveFocus();
      await user.keyboard("{Enter}");
      if (questionNumber < 12) {
        await screen.findByText(`${questionNumber + 1} / 12`);
      }
    }

    const environmentGroup = await screen.findByRole("group", { name: "macOS 기기 사용 가능 여부" });
    const yesButton = within(environmentGroup).getByRole("button", { name: /네, 사용할 수 있어요/ });
    await waitFor(() => expect(screen.getByRole("heading", { level: 1 })).toHaveFocus());
    await user.tab();
    expect(yesButton).toHaveFocus();
    await user.keyboard(" ");

    expect(await screen.findByRole("heading", { level: 1, name: "React — Frontend" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /다시 테스트하기/ }));
    expect(screen.getByRole("heading", { level: 1, name: /이번 학기/ })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /내 세미나 찾아보기/ }));
    expect(screen.getByText("1 / 12")).toBeInTheDocument();
    const resetGroup = screen.getByRole("group", { name: "1번 질문 선택지" });
    for (const button of within(resetGroup).getAllByRole("button")) {
      expect(button).toHaveAttribute("aria-pressed", "false");
    }
  }, 10_000);

  it("lets a user go back and replace an answer", async () => {
    vi.useFakeTimers();
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /내 세미나 찾아보기/ }));
    fireEvent.click(screen.getByRole("button", { name: /친구에게 링크/ }));
    await act(async () => vi.advanceTimersByTime(250));

    fireEvent.click(screen.getByRole("button", { name: "이전 질문으로" }));
    const originalAnswer = screen.getByRole("button", { name: /친구에게 링크/ });
    expect(originalAnswer).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(screen.getByRole("button", { name: /여러 사용자의 요청/ }));
    await act(async () => vi.advanceTimersByTime(250));
    fireEvent.click(screen.getByRole("button", { name: "이전 질문으로" }));

    expect(screen.getByRole("button", { name: /친구에게 링크/ })).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByRole("button", { name: /여러 사용자의 요청/ })).toHaveAttribute("aria-pressed", "true");
  });

  it("returns home and clears test state when the header logo is pressed", async () => {
    vi.useFakeTimers();
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /내 세미나 찾아보기/ }));
    fireEvent.click(screen.getByRole("button", { name: /친구에게 링크/ }));
    await act(async () => vi.advanceTimersByTime(250));

    fireEvent.click(screen.getByRole("button", { name: "처음 화면으로 돌아가기" }));
    expect(screen.getByRole("heading", { level: 1, name: /이번 학기/ })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /내 세미나 찾아보기/ }));
    expect(screen.getByText("1 / 12")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /친구에게 링크/ })).toHaveAttribute("aria-pressed", "false");
  });
});
