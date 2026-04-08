import { useEffect } from 'react'
import Head from 'next/head'

const features = [
  { id: 'ghost', title: 'Ghost 제안', desc: '현재 문맥을 읽고 다음 문장을 회색 미리보기로 제안합니다.' },
  { id: 'tab', title: 'Tab 수락 작성', desc: '사용자가 수락한 문장만 본문에 반영되는 승인 기반 작성 방식입니다.' },
  { id: 'cite', title: '출처 연결', desc: '제안 문장마다 근거 논문, 페이지, 인용 형식을 함께 제시합니다.' },
  { id: 'expand', title: 'Ctrl+→ 문단 확장', desc: '한 줄 제안을 근거 포함 단락으로 확장해 작성 속도를 높입니다.' },
  { id: 'guard', title: '형식 가드레일', desc: '서론-본론-결론 구조와 과목별 템플릿 규칙을 실시간 점검합니다.' },
  { id: 'risk', title: '표절 리스크 알림', desc: '원문 유사도 위험 문장을 표시하고 재작성 힌트를 제공합니다.' },
]

const plans = [
  {
    name: 'Campus Lite',
    price: '무료',
    note: '개인 과제 입문',
    items: ['월 5건 작성', '기본 템플릿', '참고문헌 후보 추출', 'PDF 내보내기'],
  },
  {
    name: 'Campus Plus',
    price: '월 12,900원',
    note: '개인 심화 과제',
    items: ['월 60건 작성', 'Ghost/Tab 전체 기능', 'APA/MLA/Chicago 변환', '우선 처리 큐'],
    featured: true,
  },
  {
    name: 'Lab Team',
    price: '월 39,000원',
    note: '연구실/조별과제',
    items: ['팀 협업 워크스페이스', '버전 비교/코멘트', '유사도 관리', '팀원 10명 공유'],
  },
]

export default function Home() {
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal="pain"], [data-reveal="feature"]'))
    if (!cards.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.28, rootMargin: '0px 0px -8% 0px' },
    )

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  const renderFeaturePreview = (id: string) => {
    if (id === 'ghost') {
      return (
        <div className="feature-preview p1">
          <div className="pv-head"><span>Ghost</span></div>
          <div className="pv-editor visual ghost-visual">
            <div className="bar b1" />
            <div className="bar b2" />
            <div className="ghost-chip"><span className="dot" />제안 문장</div>
          </div>
        </div>
      )
    }
    if (id === 'tab') {
      return (
        <div className="feature-preview p2">
          <div className="pv-head"><span>Draft.md</span><span className="pv-key key-press">Tab</span></div>
          <div className="pv-editor visual tab-visual">
            <div className="bar b1" />
            <div className="bar ghost" />
            <div className="bar accepted" />
          </div>
        </div>
      )
    }
    if (id === 'cite') {
      return (
        <div className="feature-preview p3">
          <div className="pv-head"><span>Citation</span><span className="pv-key hidden">-</span></div>
          <div className="pv-editor cite-editor">
            <div className="bar b1" />
            <div className="bar b2" />
            <span className="cursor-dot" />
            <div className="cite-pop">근거 연결됨</div>
          </div>
        </div>
      )
    }
    if (id === 'expand') {
      return (
        <div className="feature-preview p4">
          <div className="pv-head"><span>Expand</span><span className="pv-key">Ctrl+→</span></div>
          <div className="pv-editor visual expand-visual">
            <div className="bar seed" />
            <div className="bar ex1" />
            <div className="bar ex2" />
          </div>
        </div>
      )
    }
    if (id === 'guard') {
      return (
        <div className="feature-preview p5">
          <div className="pv-head"><span>Structure Check</span><span className="pv-key hidden">-</span></div>
          <div className="pv-editor visual guard-visual">
            <div className="long-block" />
            <div className="split s1" />
            <div className="split s2" />
            <div className="split s3" />
          </div>
        </div>
      )
    }
    return (
      <div className="feature-preview p6">
        <div className="pv-head"><span>Similarity Check</span><span className="pv-key risk-rate">전체 표절률 18%</span></div>
        <div className="pv-editor visual risk-visual">
          <div className="bar riskline" />
          <div className="bar riskline short" />
          <div className="pv-alert">수정 필요</div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>CiteFlow | 출처 기반 리포트 코파일럿</title>
        <meta
          name="description"
          content="Ghost 제안 + Tab 수락 방식으로 논문 근거 기반 리포트를 작성하는 학술 글쓰기 코파일럿."
        />
      </Head>

      <main className="page">
        <header className="nav">
          <a href="#top" className="logo">Cite<span>Flow</span></a>
          <nav className="nav-links">
            <a href="#features">기능</a>
            <a href="#process">서비스 과정</a>
            <a href="#pricing">요금제</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="nav-actions">
            <a href="/login" className="btn ghost small">로그인</a>
            <a href="/signup" className="btn solid small">회원가입</a>
          </div>
        </header>

        <section className="hero" id="top">
          <div className="hero-copy">
            <div className="badge">Report Copilot for Campus</div>
            <h1>
              대필이 아닌
              <br />
              <em>검증 가능한 리포트 코파일럿</em>
            </h1>
            <p>
              Ghost 제안을 확인하고 Tab으로 수락하는 승인 기반 워크플로우.
              <br />
              문장마다 근거와 출처를 연결해 신뢰 가능한 제출본을 완성합니다.
            </p>
            <div className="hero-actions">
              <a href="/signup" className="btn solid">무료로 시작하기</a>
              <a href="/login" className="btn ghost">데모 체험</a>
            </div>
            <div className="kpis">
              <div><strong>87%</strong><span>Tab 수락률</span></div>
              <div><strong>99%</strong><span>출처 추적 커버리지</span></div>
              <div><strong>31개</strong><span>대학 템플릿</span></div>
            </div>
          </div>

          <div className="hero-demo">
            <div className="demo-head">Live Preview · Ghost + Tab</div>
            <div className="demo-grid">
              <div className="editor">
                <div className="pane-title">작성 본문</div>
                <div className="fake-text">
                  <p>서론</p>
                  <p>청년 고용 문제는 지역별 산업구조 차이와 정책 접근성 격차에 의해 심화되고 있다.</p>
                  <p className="cursor">|</p>
                </div>
              </div>
              <div className="suggestion">
                <div className="pane-title">다음 문장 제안</div>
                <p className="ghost-line">
                  본 리포트는 최근 5년간 통계와 선행연구를 바탕으로 지역 격차의 구조적 원인을 분석한다.
                </p>
                <div className="source">근거: 김민수·이정은(2024), p.12-14</div>
                <div className="hotkeys">
                  <span>Tab 수락</span>
                  <span>Ctrl+→ 확장</span>
                  <span>Ctrl+Enter 출처</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="features">
          <div className="section-head">
            <div className="label">Why CiteFlow</div>
            <h2>과제 작성의 막히는 구간을 해결합니다</h2>
          </div>
          <div className="pain-list">
            <article className="card pain-card" data-reveal="pain"><h3>시작이 어렵다</h3><p>첫 문장을 어떻게 열어야 할지 막히는 순간을 제안 문장으로 해결합니다.</p></article>
            <article className="card pain-card" data-reveal="pain"><h3>근거 연결이 어렵다</h3><p>주장 문장에 맞는 논문 근거와 페이지를 즉시 제안합니다.</p></article>
            <article className="card pain-card" data-reveal="pain"><h3>형식 때문에 감점</h3><p>인용 형식과 참고문헌 누락을 가드레일로 사전에 차단합니다.</p></article>
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <div className="label">Core Features</div>
            <h2>코파일럿처럼 쓰고, 제출본처럼 완성</h2>
          </div>
          <div className="feature-flow">
            {features.map((item, idx) => (
              <article className="card feature-card" data-reveal="feature" key={item.title} style={{ transitionDelay: `${idx * 90}ms` }}>
                {renderFeaturePreview(item.id)}
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="process">
          <div className="section-head">
            <div className="label">Workflow</div>
            <h2>상세 서비스 과정</h2>
          </div>
          <div className="grid four">
            <article className="card"><h3>1. 주제 설정</h3><p>과목, 분량, 인용 형식을 설정하고 과제 요구사항을 입력합니다.</p></article>
            <article className="card"><h3>2. 근거 수집</h3><p>논문/자료를 기반으로 문장 제안과 출처 후보를 함께 불러옵니다.</p></article>
            <article className="card"><h3>3. 승인 작성</h3><p>Ghost 제안을 Tab으로 수락해 본문을 완성하고 필요 시 확장합니다.</p></article>
            <article className="card"><h3>4. 제출본 완성</h3><p>참고문헌과 형식 점검 후 최종 리포트를 다운로드합니다.</p></article>
          </div>
        </section>

        <section className="section" id="pricing">
          <div className="section-head">
            <div className="label">Pricing</div>
            <h2>개인 과제부터 팀 협업까지</h2>
          </div>
          <div className="grid three">
            {plans.map((plan) => (
              <article className={`card price ${plan.featured ? 'featured' : ''}`} key={plan.name}>
                <h3>{plan.name}</h3>
                <div className="price">{plan.price}</div>
                <div className="note">{plan.note}</div>
                <ul>
                  {plan.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <a href="/signup" className={`btn ${plan.featured ? 'solid' : 'ghost'}`}>시작하기</a>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="faq">
          <div className="section-head">
            <div className="label">FAQ</div>
            <h2>자주 묻는 질문</h2>
          </div>
          <div className="grid two">
            <article className="card"><h3>대필 서비스인가요?</h3><p>아니요. 사용자가 승인한 문장만 반영되는 코파일럿 방식입니다.</p></article>
            <article className="card"><h3>출처까지 자동 정리되나요?</h3><p>네. 문장별 근거 연결과 참고문헌 형식 변환을 제공합니다.</p></article>
            <article className="card"><h3>학교별 형식을 맞출 수 있나요?</h3><p>과목/양식 가드레일로 서론-본론-결론 및 인용 규칙을 점검합니다.</p></article>
            <article className="card"><h3>로그인 후 바로 사용 가능한가요?</h3><p>네. 회원가입 후 즉시 개인 워크스페이스가 생성됩니다.</p></article>
          </div>
        </section>

        <section className="cta">
          <h2>이번 학기 리포트, 더 정확하게</h2>
          <p>Ghost 제안 확인 → Tab 수락 → 출처 자동 정리까지 한 번에.</p>
          <a href="/signup" className="btn solid">지금 무료로 시작하기</a>
        </section>

        <footer className="footer">
          <div>
            <div className="logo">Cite<span>Flow</span></div>
            <p>출처 기반 학술 글쓰기 코파일럿</p>
          </div>
          <div className="footer-links">
            <a href="#features">기능</a>
            <a href="#process">서비스 과정</a>
            <a href="#pricing">요금제</a>
            <a href="/login">로그인</a>
            <a href="/signup">회원가입</a>
          </div>
        </footer>
      </main>

      <style jsx>{`
        .page{
          max-width:1320px;
          margin:0 auto;
          padding:24px 28px 96px;
          color:#0f172a;
          background:
            radial-gradient(circle at 8% 10%, rgba(59,130,246,.18) 0%, rgba(59,130,246,0) 36%),
            radial-gradient(circle at 92% 16%, rgba(139,92,246,.14) 0%, rgba(139,92,246,0) 32%),
            radial-gradient(circle at 50% 92%, rgba(16,185,129,.12) 0%, rgba(16,185,129,0) 34%),
            linear-gradient(180deg,#f3f7ff 0%,#edf3ff 42%,#f5f8ff 100%);
        }
        .nav{position:sticky;top:12px;z-index:20;background:rgba(255,255,255,.92);backdrop-filter:blur(8px);border:1px solid #e2e8f0;border-radius:14px;padding:12px 16px;display:flex;align-items:center;justify-content:space-between;margin-bottom:24px}
        .logo{font-weight:800;text-decoration:none;color:#0f172a}.logo span{color:#2563eb}
        .nav-links{display:flex;gap:14px}.nav-links a{text-decoration:none;color:#334155;font-size:13px;font-weight:600}
        .nav-actions{display:flex;gap:8px}
        .hero{display:grid;grid-template-columns:1fr;gap:18px}
        .hero-copy,.hero-demo,.section,.cta,.footer{background:#fff;border:1px solid #e2e8f0;border-radius:16px;box-shadow:0 8px 26px rgba(15,23,42,.04)}
        .hero-copy{padding:36px}
        .badge{display:inline-block;font-size:12px;padding:6px 10px;border-radius:999px;background:#eff6ff;color:#2563eb;font-weight:600}
        h1{font-size:46px;line-height:1.2;margin:16px 0 14px} em{color:#2563eb;font-style:normal}
        p{color:#475569;line-height:1.7}
        .hero-actions{display:flex;gap:10px;margin-top:18px}
        .btn{display:inline-flex;align-items:center;justify-content:center;padding:10px 14px;border-radius:10px;border:1px solid #cbd5e1;font-weight:600;text-decoration:none;font-size:14px}
        .btn.solid{background:#2563eb;border-color:#2563eb;color:#fff}
        .btn.ghost{background:#fff;color:#0f172a}
        .btn.small{padding:8px 12px;font-size:13px}
        .kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:24px}
        .kpis div{background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px}
        .kpis strong{display:block;font-size:22px}
        .kpis span{font-size:12px;color:#64748b}
        .hero-demo{padding:22px}
        .demo-head{font-weight:700;margin-bottom:14px}
        .demo-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
        .editor,.suggestion{border:1px solid #e2e8f0;border-radius:12px;padding:14px;background:#f8fafc}
        .pane-title{font-size:12px;font-weight:700;color:#334155;margin-bottom:8px}
        .fake-text{font-size:13px;line-height:1.6;color:#334155}
        .fake-text .cursor{display:inline-block;animation:blink 1s step-end infinite}
        .ghost-line{font-size:13px;color:#94a3b8;background:#fff;border:1px dashed #cbd5e1;border-radius:8px;padding:8px}
        .source{font-size:12px;color:#475569;margin-top:8px}
        .hotkeys{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
        .hotkeys span{font-size:11px;padding:4px 8px;border-radius:999px;background:#e2e8f0;color:#334155}
        .section{margin-top:26px;padding:34px}
        .section-head{margin-bottom:18px;text-align:center}
        .label{font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#64748b;font-weight:700}
        h2{font-size:32px;margin:8px 0}
        .grid{display:grid;gap:16px}
        .grid.three{grid-template-columns:repeat(3,minmax(0,1fr))}
        .grid.four{grid-template-columns:repeat(4,minmax(0,1fr))}
        .grid.two{grid-template-columns:repeat(2,minmax(0,1fr))}
        .card{border:1px solid #e2e8f0;border-radius:12px;padding:22px 20px;margin:12px 0;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:10px;min-height:164px}
        .card h3{font-size:17px;margin:0;text-align:center}
        .card p{font-size:14px;margin:0}
        .pain-list{display:flex;flex-direction:column;gap:34px}
        .pain-card{min-height:180px;opacity:0;transform:translateY(34px);transition:opacity .55s ease,transform .55s ease}
        .pain-card.is-visible{opacity:1;transform:translateY(0)}
        .feature-flow{display:flex;flex-direction:column;gap:38px;max-width:900px;margin:0 auto}
        .feature-card{min-height:220px;opacity:0;transform:translateY(34px);transition:opacity .55s ease,transform .55s ease}
        .feature-card.is-visible{opacity:1;transform:translateY(0)}
        .feature-preview{width:100%;max-width:620px;min-height:150px;border:1px solid #c7dcff;border-radius:12px;background:linear-gradient(180deg,#f2f7ff 0%,#e7efff 100%);padding:12px 12px;display:flex;flex-direction:column;gap:10px}
        .pv-head{display:flex;justify-content:space-between;align-items:center;font-size:11px;color:#475569}
        .pv-key{padding:2px 7px;border-radius:999px;background:#dbeafe;color:#1d4ed8;font-weight:700}
        .pv-key.hidden{opacity:0}
        .pv-key.risk-rate{background:#fee2e2;color:#b91c1c}
        .pv-key.key-press{transform-origin:center}
        .pv-editor{position:relative;border:1px solid #cfe2ff;background:#fff;border-radius:10px;padding:10px;display:flex;flex-direction:column;gap:10px;overflow:hidden;min-height:92px}
        .pv-editor::after{content:'';position:absolute;inset:0;pointer-events:none;opacity:0;background:linear-gradient(100deg,transparent 0%,rgba(37,99,235,.10) 45%,transparent 75%)}
        .bar{height:10px;border-radius:999px;background:linear-gradient(90deg,#93c5fd 0%,#60a5fa 100%);width:82%;box-shadow:0 1px 0 rgba(37,99,235,.2)}
        .bar.b2{width:64%}
        .bar.short{width:58%}
        .ghost-chip{align-self:flex-start;display:inline-flex;align-items:center;gap:6px;padding:5px 10px;border-radius:999px;background:#dbeafe;color:#1d4ed8;font-size:11px;font-weight:700;opacity:0}
        .ghost-chip .dot{width:6px;height:6px;border-radius:999px;background:#3b82f6}
        .tab-visual .bar.ghost{background:linear-gradient(90deg,#a5b4fc 0%,#818cf8 100%)}
        .tab-visual .bar.accepted{background:linear-gradient(90deg,#22c55e 0%,#16a34a 100%);width:0}
        .cite-editor{position:relative}
        .cursor-dot{position:absolute;top:34px;left:22%;width:12px;height:12px;border-radius:999px;background:#2563eb;opacity:0;box-shadow:0 0 0 0 rgba(37,99,235,.35)}
        .cite-pop{font-size:11px;line-height:1.35;text-align:left;color:#0f766e;background:#ecfeff;border:1px solid #99f6e4;border-radius:8px;padding:6px 8px;opacity:0;transform:translateY(8px);box-shadow:0 6px 16px rgba(15,118,110,.15)}
        .expand-visual .bar.seed{width:52%;background:#94a3b8}
        .expand-visual .bar.ex1,.expand-visual .bar.ex2{opacity:0;max-height:0}
        .guard-visual .long-block{height:22px;border-radius:8px;background:#dbeafe}
        .guard-visual .split{height:18px;border-radius:8px;opacity:0;transform:translateY(8px)}
        .guard-visual .s1{background:#dbeafe}
        .guard-visual .s2{background:#d1fae5}
        .guard-visual .s3{background:#ede9fe}
        .risk-visual .riskline{position:relative}
        .risk-visual .riskline::after{content:'';position:absolute;left:1px;right:1px;top:-1px;height:12px;border-radius:8px;background:rgba(248,113,113,.35);filter:blur(1.1px);opacity:0}
        .pv-alert{font-size:11px;color:#b91c1c;opacity:0;background:#fef2f2;border:1px solid #fecaca;border-radius:7px;padding:6px 8px;display:inline-block}
        .feature-card.is-visible .p1 .ghost-chip{animation:ghostChipIn 1.4s ease-in-out infinite}
        .feature-card.is-visible .p1 .pv-editor::after{animation:sweepFlash 1.4s linear infinite}
        .feature-card.is-visible .p2 .pv-key.key-press{animation:keyPressReal 1.6s ease-in-out infinite}
        .feature-card.is-visible .p2 .bar.ghost{animation:tabGhostHide 1.6s ease-in-out infinite}
        .feature-card.is-visible .p2 .bar.accepted{animation:tabAcceptedBar 1.6s ease-in-out infinite}
        .feature-card.is-visible .p2 .pv-editor::after{animation:sweepFlash 1.6s linear infinite}
        .feature-card.is-visible .p3 .cursor-dot{animation:cursorMoveReal 1.7s ease-in-out infinite}
        .feature-card.is-visible .p3 .cite-pop{animation:citeShowReal 1.7s ease-in-out infinite}
        .feature-card.is-visible .p3 .bar{animation:linePulse 1.7s ease-in-out infinite}
        .feature-card.is-visible .p4 .bar.ex1{animation:expandBarOne 1.8s ease-in-out infinite}
        .feature-card.is-visible .p4 .bar.ex2{animation:expandBarTwo 1.8s ease-in-out infinite}
        .feature-card.is-visible .p4 .pv-editor::after{animation:sweepFlash 1.8s linear infinite}
        .feature-card.is-visible .p5 .long-block{animation:guardLongFade 1.8s ease-in-out infinite}
        .feature-card.is-visible .p5 .split.s1{animation:guardShowOne 1.8s ease-in-out infinite}
        .feature-card.is-visible .p5 .split.s2{animation:guardShowTwo 1.8s ease-in-out infinite}
        .feature-card.is-visible .p5 .split.s3{animation:guardShowThree 1.8s ease-in-out infinite}
        .feature-card.is-visible .p5 .pv-editor::after{animation:sweepFlash 1.8s linear infinite}
        .feature-card.is-visible .p6 .riskline::after{animation:riskMarkReal 1.7s ease-in-out infinite}
        .feature-card.is-visible .p6 .pv-alert{animation:riskAlertShow 1.7s ease-in-out infinite}
        .feature-card.is-visible .p6 .pv-editor::after{animation:dangerFlash 1.7s linear infinite}
        .feature-card.is-visible .feature-preview{animation:demoPop .45s ease}
        .price .price{font-size:24px;font-weight:800;margin-top:4px}
        .price .note{font-size:13px;color:#64748b;margin:4px 0 8px}
        .price ul{list-style:none;padding-left:0;margin:0 0 14px;display:flex;flex-direction:column;gap:8px}
        .price li{font-size:13px;color:#334155;line-height:1.6}
        .price.featured{border-color:#2563eb;box-shadow:0 8px 20px rgba(37,99,235,.12)}
        .cta{margin-top:40px;padding:56px 40px;text-align:center}
        .cta h2{margin:0 0 16px}
        .cta p{margin:0 0 22px}
        .cta .btn{margin-top:6px}
        .footer{margin-top:26px;padding:24px;display:flex;align-items:center;justify-content:space-between;gap:16px}
        .footer p{margin:6px 0 0;font-size:13px;color:#64748b}
        .footer-links{display:flex;gap:12px;flex-wrap:wrap}
        .footer-links a{text-decoration:none;font-size:13px;color:#334155;font-weight:600}
        @keyframes blink{50%{opacity:0}}
        @keyframes ghostChipIn{0%,42%{opacity:0;transform:translateX(-6px)}58%,100%{opacity:1;transform:translateX(0)}}
        @keyframes keyPressReal{0%,22%,100%{transform:translateY(0)}32%{transform:translateY(1px) scale(.96)}}
        @keyframes tabGhostHide{0%,42%{opacity:1}58%,100%{opacity:0}}
        @keyframes tabAcceptedBar{0%,45%{width:0;opacity:0}62%,100%{width:82%;opacity:1}}
        @keyframes cursorMoveReal{0%{opacity:0;left:22%;box-shadow:0 0 0 0 rgba(37,99,235,0)}28%{opacity:1;left:22%;box-shadow:0 0 0 10px rgba(37,99,235,.12)}56%{opacity:1;left:68%}100%{opacity:0;left:68%;box-shadow:0 0 0 0 rgba(37,99,235,0)}}
        @keyframes citeShowReal{0%,46%{opacity:0;transform:translateY(6px)}62%,100%{opacity:1;transform:translateY(0)}}
        @keyframes expandBarOne{0%,35%{opacity:0;max-height:0;width:0}55%,100%{opacity:1;max-height:8px;width:82%}}
        @keyframes expandBarTwo{0%,48%{opacity:0;max-height:0;width:0}68%,100%{opacity:1;max-height:8px;width:70%}}
        @keyframes guardLongFade{0%,34%{opacity:1}52%,100%{opacity:.28}}
        @keyframes guardShowOne{0%,30%{opacity:0;transform:translateY(6px)}50%,100%{opacity:1;transform:translateY(0)}}
        @keyframes guardShowTwo{0%,42%{opacity:0;transform:translateY(6px)}62%,100%{opacity:1;transform:translateY(0)}}
        @keyframes guardShowThree{0%,54%{opacity:0;transform:translateY(6px)}74%,100%{opacity:1;transform:translateY(0)}}
        @keyframes riskMarkReal{0%,38%{opacity:0}58%,100%{opacity:1}}
        @keyframes riskAlertShow{0%,52%{opacity:0;transform:translateY(6px)}70%,100%{opacity:1;transform:translateY(0)}}
        @keyframes sweepFlash{0%{opacity:0;transform:translateX(-120%)}35%{opacity:.75}100%{opacity:0;transform:translateX(120%)}}
        @keyframes dangerFlash{0%{opacity:0;transform:translateX(-120%)}35%{opacity:.65;background:linear-gradient(100deg,transparent 0%,rgba(239,68,68,.16) 45%,transparent 75%)}100%{opacity:0;transform:translateX(120%)}}
        @keyframes linePulse{0%,100%{opacity:1}50%{opacity:.45}}
        @keyframes demoPop{0%{transform:scale(.98);opacity:.75}100%{transform:scale(1);opacity:1}}
        @media (max-width:980px){
          .nav{position:static}
          .nav-links{display:none}
          .hero{grid-template-columns:1fr}
          .demo-grid,.grid.three,.grid.four,.grid.two{grid-template-columns:1fr}
          h1{font-size:36px}
          .kpis{grid-template-columns:1fr 1fr}
          .footer{flex-direction:column;align-items:flex-start}
        }
        @media (max-width:640px){
          .page{padding:16px 14px 48px}
          .section{margin-top:18px;padding:22px}
          .kpis{grid-template-columns:1fr}
        }
      `}</style>
      <style jsx global>{`
        .feature-flow .feature-preview .pv-editor{position:relative;overflow:hidden}
        .feature-flow .feature-preview .bar{display:block;height:8px;border-radius:999px;background:#93c5fd;width:82%}
        .feature-flow .feature-preview .bar.b2{width:64%}
        .feature-flow .feature-preview .bar.short{width:58%}
        .feature-flow .feature-preview .ghost-chip{display:inline-flex;align-items:center;gap:6px;padding:4px 8px;border-radius:999px;background:#dbeafe;color:#1d4ed8;font-size:10px;opacity:0}
        .feature-flow .feature-preview .dot{width:6px;height:6px;border-radius:999px;background:#2563eb}
        .feature-flow .feature-preview .tab-visual .bar.ghost{background:#a5b4fc}
        .feature-flow .feature-preview .tab-visual .bar.accepted{background:#22c55e;width:0}
        .feature-flow .feature-preview .cursor-dot{position:absolute;top:28px;left:26%;width:10px;height:10px;border-radius:999px;background:#2563eb;opacity:0}
        .feature-flow .feature-preview .cite-pop{font-size:10px;color:#0f766e;background:#ecfeff;border:1px solid #99f6e4;border-radius:7px;padding:5px 6px;opacity:0;transform:translateY(6px)}
        .feature-flow .feature-preview .expand-visual .bar.ex1,.feature-flow .feature-preview .expand-visual .bar.ex2{opacity:0;max-height:0}
        .feature-flow .feature-preview .guard-visual .long-block{height:18px;border-radius:8px;background:#dbeafe}
        .feature-flow .feature-preview .guard-visual .split{height:16px;border-radius:8px;opacity:0;transform:translateY(6px)}
        .feature-flow .feature-preview .guard-visual .s1{background:#dbeafe}
        .feature-flow .feature-preview .guard-visual .s2{background:#d1fae5}
        .feature-flow .feature-preview .guard-visual .s3{background:#ede9fe}
        .feature-flow .feature-preview .risk-visual .riskline{position:relative}
        .feature-flow .feature-preview .risk-visual .riskline::after{content:'';position:absolute;left:1px;right:1px;top:-1px;height:12px;border-radius:8px;background:rgba(248,113,113,.35);filter:blur(1.1px);opacity:0}
        .feature-flow .feature-preview .pv-alert{font-size:10px;color:#b91c1c;opacity:0;background:#fef2f2;border:1px solid #fecaca;border-radius:6px;padding:4px 6px;display:inline-block}

        .feature-card.is-visible .p1 .ghost-chip{animation:ghostChipIn 1.4s ease-in-out infinite}
        .feature-card.is-visible .p1 .pv-editor::after{animation:sweepFlash 1.4s linear infinite}
        .feature-card.is-visible .p2 .pv-key.key-press{animation:keyPressReal 1.6s ease-in-out infinite}
        .feature-card.is-visible .p2 .bar.ghost{animation:tabGhostHide 1.6s ease-in-out infinite}
        .feature-card.is-visible .p2 .bar.accepted{animation:tabAcceptedBar 1.6s ease-in-out infinite}
        .feature-card.is-visible .p2 .pv-editor::after{animation:sweepFlash 1.6s linear infinite}
        .feature-card.is-visible .p3 .cursor-dot{animation:cursorMoveReal 1.7s ease-in-out infinite}
        .feature-card.is-visible .p3 .cite-pop{animation:citeShowReal 1.7s ease-in-out infinite}
        .feature-card.is-visible .p3 .bar{animation:linePulse 1.7s ease-in-out infinite}
        .feature-card.is-visible .p4 .bar.ex1{animation:expandBarOne 1.8s ease-in-out infinite}
        .feature-card.is-visible .p4 .bar.ex2{animation:expandBarTwo 1.8s ease-in-out infinite}
        .feature-card.is-visible .p4 .pv-editor::after{animation:sweepFlash 1.8s linear infinite}
        .feature-card.is-visible .p5 .long-block{animation:guardLongFade 1.8s ease-in-out infinite}
        .feature-card.is-visible .p5 .split.s1{animation:guardShowOne 1.8s ease-in-out infinite}
        .feature-card.is-visible .p5 .split.s2{animation:guardShowTwo 1.8s ease-in-out infinite}
        .feature-card.is-visible .p5 .split.s3{animation:guardShowThree 1.8s ease-in-out infinite}
        .feature-card.is-visible .p5 .pv-editor::after{animation:sweepFlash 1.8s linear infinite}
        .feature-card.is-visible .p6 .riskline::after{animation:riskMarkReal 1.7s ease-in-out infinite}
        .feature-card.is-visible .p6 .pv-alert{animation:riskAlertShow 1.7s ease-in-out infinite}
        .feature-card.is-visible .p6 .pv-editor::after{animation:dangerFlash 1.7s linear infinite}
      `}</style>
    </>
  )
}
