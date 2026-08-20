# Playwright Evidence Capture Harness

Codex Computer Use가 지역/정책으로 비활성화된 경우 사용할 로컬 캡처 도구다. Windows Chrome과 번들 Playwright를 사용하며 외부 MCP나 패키지를 추가로 설치하지 않는다.

## 보안 원칙

- 평소 사용하는 Chrome 프로필을 자동화하지 않는다.
- 교육/개인 계정별 전용 프로필을 `%LOCALAPPDATA%\CodexEvidenceCapture\profiles\`에 만든다.
- 로그인, 비밀번호, 2단계 인증은 사용자가 Chrome에서 직접 처리한다.
- 쿠키·세션·비밀번호를 출력하거나 `capture-index.md`에 기록하지 않는다.
- 프로필 폴더는 Git 저장소 밖에 있으며 절대 커밋하지 않는다.
- 게시·할당·발송·공유·예약·삭제·결제 가능성이 있는 버튼은 기본적으로 차단한다.
- 캡처는 프로젝트의 `captures/` 아래 PNG만 허용한다.

## 실행

Windows 탐색기에서 다음 중 하나를 실행한다.

- `start-edu-session.cmd`: 교육 계정용 전용 Chrome
- `start-personal-session.cmd`: 개인 계정용 전용 Chrome

처음에는 Google 로그인 화면이 표시될 수 있다. 사용자가 직접 로그인한 뒤 창을 유지한다. 터미널에는 JSON 명령을 한 줄씩 입력할 수 있다.

## 명령 예시

현재 상태:

```json
{"op":"status"}
```

허용된 Google 주소로 이동:

```json
{"op":"goto","url":"https://classroom.google.com/"}
```

접근성 구조 확인:

```json
{"op":"snapshot"}
```

버튼 후보 확인:

```json
{"op":"inspect","target":{"role":"button","name":"만들기"}}
```

유일한 버튼 클릭:

```json
{"op":"click","target":{"role":"button","name":"만들기"}}
```

텍스트 입력:

```json
{"op":"fill","target":{"role":"textbox","name":"제목"},"text":"[연수용 가상 과제] 지역 축제 홍보 포스터 기획안"}
```

Evidence Capture 저장:

```json
{"op":"shot","file":"00-account-context/00-01_edu_classroom-entry_20260820.png"}
```

Google Labs처럼 iframe 안에 있는 UI는 `frameSelector`를 지정한다.

```json
{"op":"snapshot","frameSelector":"iframe"}
{"op":"click","target":{"frameSelector":"iframe","role":"button","name":"New Gem"}}
```

iframe이 중첩된 경우에는 바깥쪽부터 `frameSelectors` 배열로 지정한다.

```json
{"op":"snapshot","frameSelectors":["iframe.opal-iframe","iframe"]}
```

세션 종료:

```json
{"op":"stop"}
```

## MCP와의 관계

이 하네스는 현재 작업에서 즉시 쓸 수 있는 최소 대안이다. Codex는 로컬 STDIO/HTTP MCP 서버를 지원하므로 추후 `@playwright/mcp` 또는 `chrome-devtools-mcp`를 연결할 수 있다. 다만 MCP를 새로 구성하면 Codex 재시작과 새 세션이 필요하고, 현재 세션의 도구 목록에 즉시 추가되지는 않는다.

현재 Chrome이 144 이상이면 Chrome DevTools MCP의 `--autoConnect` 방식으로 기존 Chrome 세션 연결도 가능하다. 이 경우 `chrome://inspect/#remote-debugging`에서 사용자가 기능을 켜고, 연결 요청마다 Chrome에서 허용해야 한다. 기존 프로필에 대한 접근 범위가 더 넓으므로 전용 프로필 방식으로 먼저 검증한다.
