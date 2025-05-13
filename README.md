# 📚 AI Study Planner

---

## 📌 프로젝트 개요

**AI Study Planner**는 사용자의 시험 정보(과목, 챕터, 일정 등)를 입력하면  
LLM 기반 AI가 자동으로 학습 계획을 생성하고,  
이를 **Notion 캘린더에 자동 등록**해주는 웹 기반 학습 플래너입니다.

- 시험 일정, 과목별 챕터, 난이도 등을 기반으로 자동 스케줄링
- **프론트엔드**: Svelte + Netlify
- **백엔드**: NestJS + PostgreSQL + OpenAI 또는 HuggingFace + Notion API
- **다양한 브라우저 대응**: Chrome, Edge, Firefox, Safari

---

## 🔧 기술 스택

| 영역        | 사용 기술                                  |
|-------------|---------------------------------------------|
| Frontend    | Svelte, TypeScript, Netlify                |
| Backend     | NestJS, TypeScript, Swagger UI             |
| AI          | OpenAI GPT API 또는 Hugging Face API       |
| Database    | PostgreSQL, Prisma ORM                     |
| 외부 연동   | Notion API (캘린더 등록)                   |
| 인증        | JWT 기반 사용자 인증                       |

---

## 🧠 주요 기능

### ✅ 사용자 입력
- 시험 이름, 과목, 챕터별 난이도 및 분량
- 시작일/마감일 입력

### ✅ AI 기반 학습 계획 생성
- GPT 또는 HuggingFace 기반 모델 사용
- 날짜 기준 자동 분배
- JSON 형식 응답 → 프론트/캘린더 연동 최적화

### ✅ 학습 계획 출력
- 날짜별 학습 내용 렌더링
- 사용자 확인 및 수정 가능

### ✅ Notion 연동
- 생성된 일정을 Notion 캘린더에 자동 등록
- 사용자는 Notion에서 학습 일정을 관리

---

## 🗂️ 시스템 아키텍처

(📸 시스템 다이어그램 삽입 위치 - 예: `/docs/system-architecture.png`)

---

## 🔐 인증 흐름

- JWT 로그인 → 토큰 인증 상태 유지
- 인증 상태에 따라 메인/로그인 페이지 분기 렌더링

---

## 🚀 실행 방법

### 1. 환경변수 설정

bash
cp .env.example .env


.env 예시:
# AI 설정
HF_API_KEY=hf_XXXXXXXXXXXXXXXXX
HF_MODEL=mistralai/Mistral-7B-Instruct-v0.1

# DB 설정
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname

# Notion 설정
NOTION_TOKEN=secret_XXXXXXXXXXXX
NOTION_CALENDAR_ID=XXXXXXXXXXXX

백엔드 실행
bash
npm install
npx prisma migrate dev
npm run start:dev

프론트 실행 (Svelte)
bash
cd frontend
npm install
npm run dev

🔍 Swagger 문서
경로: http://localhost:4523/api

📘 유저 관리
메서드	경로	설명
POST	/user	사용자 회원가입
GET	/user/:id	사용자 정보 조회

📑 시험 정보
메서드	경로	설명
POST	/exam	시험 정보 저장
GET	/exam/:id	시험 정보 조회

📅 학습 계획 저장
메서드	경로	설명
POST	/planner/:id/confirm	학습 계획 확정 및 저장

🗓️ Notion 연동
메서드	경로	설명
POST	/notion/save	학습 계획을 Notion에 자동 등록

🔐 인증 관련
메서드	경로	설명
POST	/auth/login	사용자 로그인
POST	/auth/join	사용자 회원가입

🔍 App 상태 확인
메서드	경로	설명
GET	/	헬스체크 및 서버 상태 확인

✅ 기여자
역할	이름
AI/생성	WJYEE
인증 및 외부 연동	JUH000
DB 수정/삭제	Choi-Bogyeong
프론트엔드(로그인)	(작성 필요)
프론트엔드(메인)	(작성 필요)