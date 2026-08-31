import type { Question } from "../domain/types";

export const questions = [
  {
    id: 1,
    question: "한 학기 뒤, 이런 걸 직접 만들었다면 가장 뿌듯할 것 같다.",
    answers: [
      { label: "A", text: "친구에게 링크를 보내자마자 사용할 수 있는 멋진 웹사이트", scores: { react: 3 } },
      { label: "B", text: "앱스토어에서 직접 설치할 수 있는 모바일 앱", scores: { ios: 2, android: 2 } },
      { label: "C", text: "여러 사용자의 요청과 데이터를 안정적으로 처리하는 서버", scores: { fastapi: 2, spring: 2 } },
      { label: "D", text: "아이디어부터 개발·배포까지 내가 처음부터 끝까지 만든 하나의 서비스", scores: { pe: 3, react: 1, android: 1, ios: 1 } },
    ],
  },
  {
    id: 2,
    question: "새로운 기능을 만들 때 가장 먼저 궁금해지는 것은?",
    answers: [
      { label: "A", text: "“사용자가 이걸 눌렀을 때 어떤 경험을 하게 될까?”", scores: { react: 2, ios: 1, android: 1, pe: 1 } },
      { label: "B", text: "“이 데이터를 어디에 저장하고 어떻게 가져올까?”", scores: { fastapi: 2, spring: 2 } },
      { label: "C", text: "“휴대폰의 기능을 활용하면 더 재미있게 만들 수 없을까?”", scores: { ios: 2, android: 2 } },
      { label: "D", text: "“이 기능이 정말 사람들이 필요로 하는 기능일까?”", scores: { pe: 3 } },
    ],
  },
  {
    id: 3,
    question: "개발하다가 버그가 발생했다. 어떤 종류의 버그라면 그나마 해결해보고 싶을까?",
    answers: [
      { label: "A", text: "버튼을 눌렀는데 화면이 예상한 대로 바뀌지 않는다.", scores: { react: 3 } },
      { label: "B", text: "특정 상황에서 서버가 잘못된 데이터를 반환한다.", scores: { fastapi: 2, spring: 2 } },
      { label: "C", text: "앱의 여러 화면을 이동하다 보니 상태가 꼬인다.", scores: { ios: 2, android: 2 } },
      { label: "D", text: "각각은 잘 돌아가는데 프론트·서버·DB를 연결하니 전체 서비스가 이상하다.", scores: { pe: 3 } },
    ],
  },
  {
    id: 4,
    question: "다음 중 가장 한번 만들어보고 싶은 기능은?",
    answers: [
      { label: "A", text: "드래그하거나 클릭할 때 즉각 반응하는 인터랙티브한 화면", scores: { react: 3 } },
      { label: "B", text: "로그인하면 사용자마다 다른 데이터를 제공하는 API", scores: { fastapi: 2, spring: 2 } },
      { label: "C", text: "푸시 알림이나 카메라처럼 스마트폰 기능을 활용하는 기능", scores: { ios: 2, android: 2 } },
      { label: "D", text: "사용자를 모아 실제로 써보게 할 수 있는 최소 기능의 앱", scores: { pe: 3 } },
    ],
  },
  {
    id: 5,
    question: "새로운 기술을 배울 때 어떤 방식이 가장 재미있는가?",
    answers: [
      { label: "A", text: "코드를 수정하고 화면이 즉시 달라지는 걸 확인하는 것", scores: { react: 3, android: 1, ios: 1 } },
      { label: "B", text: "입력 → 처리 → 데이터 저장 → 응답의 흐름을 하나씩 이해하는 것", scores: { fastapi: 2, spring: 2 } },
      { label: "C", text: "플랫폼의 규칙과 구조를 배우면서 완성도 높은 앱을 만드는 것", scores: { ios: 2, android: 2 } },
      { label: "D", text: "필요한 기술을 그때그때 찾아가며 일단 제품을 완성하는 것", scores: { pe: 3 } },
    ],
  },
  {
    id: 6,
    question: "다음 네 프로젝트 중 가장 참여하고 싶은 프로젝트는?",
    answers: [
      { label: "A", text: "서울대 학생들이 매일 들어오는 새로운 웹 서비스", scores: { react: 3, fastapi: 1, spring: 1 } },
      { label: "B", text: "수많은 사용자 요청을 안정적으로 처리해야 하는 서비스", scores: { spring: 3, fastapi: 2 } },
      { label: "C", text: "학교생활에서 매일 사용할 만한 편리한 모바일 앱", scores: { android: 2, ios: 2 } },
      { label: "D", text: "아직 아무것도 정해지지 않은 아이디어를 팀과 함께 실제 서비스로 만드는 프로젝트", scores: { pe: 3 } },
    ],
  },
  {
    id: 7,
    question: "코드를 작성하면서 가장 마음에 드는 순간은?",
    answers: [
      { label: "A", text: "내가 구현한 화면이 눈앞에서 움직이기 시작할 때", scores: { react: 3 } },
      { label: "B", text: "복잡했던 데이터 흐름이 깔끔한 API 하나로 정리됐을 때", scores: { fastapi: 3, spring: 2 } },
      { label: "C", text: "앱의 화면과 동작이 점점 실제 제품처럼 느껴질 때", scores: { ios: 2, android: 2 } },
      { label: "D", text: "여러 기술을 연결해 처음으로 전체 서비스가 동작할 때", scores: { pe: 3 } },
    ],
  },
  {
    id: 8,
    question: "팀 프로젝트에서 자연스럽게 맡아보고 싶은 역할은?",
    answers: [
      { label: "A", text: "사용자가 직접 보는 화면과 인터랙션 구현", scores: { react: 3 } },
      { label: "B", text: "서비스의 데이터와 비즈니스 로직 구현", scores: { fastapi: 2, spring: 2 } },
      { label: "C", text: "사용자가 매일 들고 다니는 앱 구현", scores: { ios: 2, android: 2 } },
      { label: "D", text: "필요하다면 화면도 만들고 서버도 건드리며 빈 곳을 채우는 역할", scores: { pe: 3 } },
    ],
  },
  {
    id: 9,
    question: "어떤 설명을 들었을 때 가장 궁금해지는가?",
    answers: [
      { label: "A", text: "“웹에서는 화면 상태가 바뀔 때 UI가 자동으로 다시 렌더링돼.”", scores: { react: 3 } },
      { label: "B", text: "“하나의 요청이 서버에 도착해서 DB까지 갔다가 응답으로 돌아와.”", scores: { fastapi: 2, spring: 2 } },
      { label: "C", text: "“모바일 앱은 OS와 상호작용하면서 웹과는 또 다른 사용자 경험을 만들 수 있어.”", scores: { ios: 2, android: 2 } },
      { label: "D", text: "“AI 에이전트에게 구현을 맡기더라도 시스템 전체 구조를 이해해야 좋은 제품을 만들 수 있어.”", scores: { pe: 3 } },
    ],
  },
  {
    id: 10,
    question: "서버 개발을 한다면 어느 쪽이 조금 더 끌리는가?",
    answers: [
      { label: "A", text: "Python으로 빠르게 API를 만들어보고 싶다.", scores: { fastapi: 3 } },
      { label: "B", text: "구조가 잘 잡힌 애플리케이션을 Java/Spring으로 만들어보고 싶다.", scores: { spring: 3 } },
      { label: "C", text: "솔직히 서버보다 사용자가 직접 보는 부분을 만들고 싶다.", scores: { react: 2, ios: 1, android: 1 } },
      { label: "D", text: "서버 하나보다는 프론트와 서버가 연결되는 전체 과정이 궁금하다.", scores: { pe: 2, react: 1 } },
    ],
  },
  {
    id: 11,
    question: "지금까지 경험과 가장 가까운 것은?",
    answers: [
      { label: "A", text: "HTML/CSS/JavaScript를 조금이라도 사용해봤다.", scores: { react: 2 } },
      { label: "B", text: "Python으로 간단한 프로그램을 만들어봤다.", scores: { fastapi: 2, pe: 1 } },
      { label: "C", text: "Java 또는 Kotlin을 사용해봤다.", scores: { spring: 2, android: 2, pe: 1 } },
      { label: "D", text: "아직 특정 언어 경험은 거의 없다.", scores: { android: 2, react: 1 } },
    ],
  },
  {
    id: 12,
    question: "마지막으로, 이번 세미나에서 가장 얻고 싶은 것은?",
    answers: [
      { label: "A", text: "사람들이 직접 보고 만지는 서비스를 만드는 실력", scores: { react: 3, ios: 1, android: 1 } },
      { label: "B", text: "서비스가 보이지 않는 곳에서 어떻게 동작하는지 이해하는 실력", scores: { fastapi: 2, spring: 2 } },
      { label: "C", text: "혼자서도 완성도 있는 모바일 앱을 만들 수 있는 경험", scores: { android: 2, ios: 2 } },
      { label: "D", text: "아이디어 하나를 실제 출시 가능한 제품으로 바꾸는 경험", scores: { pe: 3 } },
    ],
  },
] as const satisfies readonly Question[];

export const outcomeQuestionIds = new Set([1, 4, 12]);
