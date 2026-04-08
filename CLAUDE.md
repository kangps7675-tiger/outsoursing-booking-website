# PhilSolution 랜딩페이지 — 프로젝트 기록

## 프로젝트 개요
- **프로젝트명**: PhilSolution 랜딩페이지 목업
- **목적**: 제주 기반 솔로 풀스택 개발사(필솔루션) 외주 수주용 랜딩페이지
- **타겟**: 스타트업, 소상공인, 크리에이터
- **연락처**: philsolution@gmail.com
- **위치**: 제주특별자치도 제주시

## 파일 구조
```
외주 예약 사이트/
├── philsolution_landing_mockup.html   # 메인 랜딩페이지 HTML
├── philsolution_landing_mockup.css    # 스타일시트
├── philsolution_landing_mockup.js     # 인터랙션 스크립트
├── admin.html                         # 어드민 페이지 (Supabase Auth + 상담 관리)
├── server.js                          # 로컬 개발 서버 (Node.js http.server, 포트 5500)
└── .claude/
    └── launch.json                    # Claude Code 프리뷰 서버 설정
```

## 로컬 서버 실행
```bash
node server.js   # http://localhost:5500
```
`.claude/launch.json`에 설정되어 있어 Claude Code에서 `preview_start "live-server"`로도 기동 가능.

## 섹션 구성 및 앵커 ID

| 섹션 | 클래스 | ID | 설명 |
|------|--------|----|------|
| Hero | `.hero` | — | 메인 타이틀 + CTA 버튼 |
| About / 서비스 | `.about` | `#service` | 특징 6가지 카드 |
| Portfolio | `.portfolio` | `#portfolio` | 제작 프로젝트 4개 |
| Problem | `.problem` | — | 고객 고민 6가지 |
| Solution | `.solution` | — | 차별점 6가지 |
| Pricing | `.pricing` | `#pricing` | 3개 요금제 |
| Process | `.process` | — | 5단계 진행 순서 |
| Timeline | `.timeline` | — | 평균 소요 기간 |
| FAQ | `.faq` | `#faq` | 자주 묻는 질문 4개 |
| CTA | `.cta-section` | — | 최종 상담 신청 |
| Footer | `.footer` | — | 사업자 정보 |

## 네비게이션 링크 매핑
| 메뉴 | 이동 대상 |
|------|-----------|
| 포트폴리오 | `#portfolio` |
| 서비스 | `#service` (About 섹션) |
| 가격 | `#pricing` |
| FAQ | `#faq` |

## 요금제
| 플랜 | 가격 | 대상 | 납기 | 유지보수 |
|------|------|------|------|----------|
| Starter | 150만~ | 랜딩페이지 / 소개사이트 | 1~2주 | 1개월 무상 |
| Standard | 300만~ | 쇼핑몰 / 예약 시스템 | 2~4주 | 3개월 무상 |
| Enterprise | 600만~ | SaaS / ERP / AI 통합 | 4~8주 | 6개월 무상 |

## 디자인 시스템

### 폰트
- 본문: `Noto Sans KR` (300, 400, 500, 700)
- 헤딩/로고: `Noto Serif KR` (400, 700)

### 컬러 팔레트 (CSS 변수)
| 변수 | 값 | 용도 |
|------|----|------|
| `--deep-green` | `#1A3A2A` | 메인 텍스트, 배경 |
| `--mid-green` | `#2D5A40` | 서브 강조 |
| `--light-green` | `#4A8C5C` | 액센트, em 태그 |
| `--stone` | `#8C8678` | 본문 보조 텍스트 |
| `--warm-white` | `#FDFAF5` | 기본 배경 |
| `--cream` | `#F5F0E8` | 섹션 구분 배경 |
| `--accent` | `#C8A96E` | 골드 포인트 |

## 애니메이션

### Hero 타이핑 (페이지 로드 시)
- `#heroTitle`: 페이지 로드 즉시 타이핑 시작 (`typeWaveText`, 속도 45~110ms)
- `#heroSub`: h1 완료 후 타이핑 시작, 초기엔 `visibility:hidden` → JS에서 show
- `hero-sub` CSS에 `visibility:hidden` 기본값 설정

### 스크롤 트리거 타이핑
- 대상 요소에 `data-type-scroll` 속성 부여
- `[data-type-scroll]` CSS로 초기 숨김 (`visibility:hidden`)
- `IntersectionObserver` (threshold: 0.4)로 `.section-header`가 뷰포트에 들어오면 h2 → p 순으로 타이핑
- 물결(waveFloat) 애니메이션 없음 — 단순 타이핑만
- 적용 섹션: Portfolio, Problem, Solution, Pricing, Process, Timeline, FAQ

### 타이핑 함수
- `typeWaveText(target, lines, accentLineIndex, speedRange)` — 히어로용 (멀티라인)
- `typeSimple(target, speedRange)` — 스크롤용 (단일라인, wave 없음)
- 커서 깜빡임: `.typing-target.is-typing::after` (caretBlink 애니메이션)

## 인터랙션
- **FAQ 아코디언**: 모바일(≤640px)에서 열기/닫기 토글, 데스크탑에서는 전체 표시
- **포트폴리오 보기 버튼**: `scrollIntoView({behavior:'smooth'})` → `#portfolio`
- **nav 링크**: `scroll-behavior:smooth` CSS로 부드러운 앵커 이동
- **스크롤 방향**: `overflow-x:hidden` (`.lp`)으로 가로 스크롤 차단, 세로 스크롤 허용

## 히어로 통계
- 완료 프로젝트: `#completedCount` (Supabase `status='완료'` 건수 동적 반영)
- 평균 납기: 2주~
- 고객 만족: 100%

## 상담 신청 연동 (Google Form + Supabase)

### 흐름
구글 폼 제출 → Google Apps Script (onFormSubmit) → Supabase `consultations` 테이블 INSERT → 어드민에서 `status='완료'`로 변경 → 랜딩페이지 `#completedCount` 자동 반영

### 설정 위치
`philsolution_landing_mockup.js` 상단 상수 3개:
```js
const GOOGLE_FORM_URL   = ''; // 구글 폼 공유 URL
const SUPABASE_URL      = ''; // https://[project-id].supabase.co
const SUPABASE_ANON_KEY = ''; // Supabase anon public key
```

### 구글 폼 필드명 (실제 적용)
| 폼 필드 제목 | Supabase 컬럼 |
|-------------|--------------|
| 신청자 정보 | `name` |
| 연락처 (휴대폰 번호) | `contact` |
| 이메일 주소 | `email` |
| 문의 내용 | `message` |

### Supabase 테이블 스키마
```sql
CREATE TABLE consultations (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT, contact TEXT, email TEXT, message TEXT,
  status TEXT NOT NULL DEFAULT '대기중'
    CHECK (status IN ('대기중', '진행중', '완료', '취소'))
);
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- anon: status='완료' 건만 COUNT 허용 (개인정보 비노출)
CREATE POLICY "anon count completed" ON consultations
  FOR SELECT USING (status = '완료');

-- authenticated(어드민): 전체 조회
CREATE POLICY "auth full select" ON consultations
  FOR SELECT TO authenticated USING (true);

-- authenticated(어드민): 상태 변경만 허용
CREATE POLICY "auth update status" ON consultations
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (status IN ('대기중', '진행중', '완료', '취소'));

-- service_role: INSERT (Apps Script 전용)
CREATE POLICY "service insert" ON consultations
  FOR INSERT WITH CHECK (true);
```

기존 테이블에 status 컬럼 추가 시:
```sql
-- 기존 "anon read" 정책 삭제 후 위 정책들로 교체
DROP POLICY "anon read" ON consultations;
ALTER TABLE consultations
  ADD COLUMN status TEXT NOT NULL DEFAULT '대기중'
  CHECK (status IN ('대기중', '진행중', '완료', '취소'));
```

### Google Apps Script (폼 편집 → 스크립트 편집기)
```js
const SUPABASE_URL = 'https://[project-id].supabase.co';
const SUPABASE_SERVICE_KEY = '[service_role_key]'; // 절대 프론트엔드에 노출 금지

function onFormSubmit(e) {
  const data = { name: '', contact: '', email: '', message: '' };
  e.response.getItemResponses().forEach(r => {
    const t = r.getItem().getTitle();
    if (t === '신청자 정보') data.name = r.getResponse();
    else if (t === '연락처 (휴대폰 번호)') data.contact = r.getResponse();
    else if (t === '이메일 주소') data.email = r.getResponse();
    else if (t === '문의 내용') data.message = r.getResponse();
  });
  UrlFetchApp.fetch(`${SUPABASE_URL}/rest/v1/consultations`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_SERVICE_KEY,
      'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    payload: JSON.stringify(data),
    muteHttpExceptions: true
  });
}
```
트리거: 편집 메뉴 → 트리거 → `onFormSubmit` → 폼 제출 시 실행

### 히어로 통계 카운터
`#completedCount` — 페이지 로드 시 `loadConsultCount()`가 `status=eq.완료` COUNT 조회 후 업데이트

---

## 어드민 페이지 (admin.html)

### 접속
`http://localhost:5500/admin.html`

### 기능
- Supabase Auth 이메일+비밀번호 로그인 (signInWithPassword)
- 상담 목록 전체 조회 (인증 사용자만 — RLS)
- 상태 순환 버튼: 대기중 → 진행중 → 완료 → 취소 → 대기중
- 요약 카드: 상태별 건수 실시간 표시
- 로그아웃, 새로고침

### 어드민 계정 생성
Supabase Dashboard → Authentication → Users → "Add user"
(프론트엔드에 회원가입 기능 없음 — 대시보드에서만 생성)

### 설정 위치
`admin.html` 인라인 `<script>` 상단 2개 상수:
```js
const SUPABASE_URL      = ''; // 랜딩페이지 JS와 동일한 값
const SUPABASE_ANON_KEY = ''; // 랜딩페이지 JS와 동일한 값
```

### 보안 구조
| 주체 | SELECT | INSERT | UPDATE |
|------|--------|--------|--------|
| anon | status='완료'만 | 불가 | 불가 |
| authenticated | 전체 | 불가 | status 변경만 |
| service_role | 전체 | 가능 | 가능 |

---

## 기술 스택 (서비스 소개 기준)
Next.js 14 · TypeScript · Supabase · Tailwind CSS · Claude API · GPT API · Solapi
