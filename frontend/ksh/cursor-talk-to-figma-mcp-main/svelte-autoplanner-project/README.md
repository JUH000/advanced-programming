# Svelte AutoPlanner Project

이 프로젝트는 Figma 디자인으로부터 생성된 Svelte 애플리케이션입니다.
[원본 Figma 디자인 링크](https://www.figma.com/design/z1SJ9kuwpxS9WMsN9A6Eh3/-AutoPlanner--%EB%94%94%EC%9E%90%EC%9D%B8?node-id=6-433&t=W18LJB5uxqArmo4V-4)

## 시작하기

프로젝트를 로컬 환경에서 실행하려면 다음 단계를 따르세요.

### 요구 사항

- [Node.js](https://nodejs.org/) (LTS 버전 권장)
- npm (Node.js 설치 시 함께 설치됨)

### 설치

1.  프로젝트의 루트 디렉토리 (`svelte-autoplanner-project`)로 이동합니다.
    ```bash
    cd svelte-autoplanner-project
    ```

2.  필요한 의존성 패키지들을 설치합니다.
    ```bash
    npm install
    ```

### 개발 서버 실행

의존성 설치가 완료되면, 개발 서버를 시작할 수 있습니다.

```bash
npm run dev
```

이 명령어는 Rollup을 사용하여 애플리케이션을 빌드하고, 변경 사항을 감지하여 자동으로 브라우저를 새로고침하는 로컬 개발 서버를 실행합니다. 일반적으로 `http://localhost:8080` (또는 `sirv`가 사용하는 다른 포트)에서 애플리케이션을 확인할 수 있습니다. 터미널에서 실제 실행 주소를 확인하세요.

### 프로덕션 빌드

프로덕션용으로 애플리케이션을 빌드하려면 다음 명령어를 사용합니다.

```bash
npm run build
```

빌드된 파일들은 `public/build` 디렉토리에 생성됩니다.

## 프로젝트 구조

-   `/public`: 정적 파일 (index.html, global.css, 빌드된 에셋 등)이 위치합니다.
-   `/src`: Svelte 컴포넌트 및 애플리케이션 로직이 위치합니다.
    -   `/components`: 재사용 가능한 UI 컴포넌트들이 저장됩니다.
    -   `App.svelte`: 메인 애플리케이션 컴포넌트입니다.
    -   `main.js`: 애플리케이션의 진입점입니다.
-   `package.json`: 프로젝트 의존성 및 스크립트를 정의합니다.
-   `rollup.config.js`: Rollup 번들러의 설정 파일입니다.

## Figma 노드 정보 (참고용)

프로젝트 생성 시 참조한 주요 Figma 노드 정보입니다.

-   Main Frame: `6:433` ("Main")
-   Header: `6:436` ("header")
-   Welcome Title: `6:460` ("AutoPlanner에 오신 것을 환영합니다")
-   Welcome Subtitle: `6:462` ("AI 기반 맞춤형 학습 계획으로...")
-   My Info Card: `6:463` ("div")
-   Plan Card: `6:464` ("div")
-   Notion Link Section: `6:446` ("div") 