import Head from 'next/head'

export default function Signup() {
  return (
    <>
      <Head>
        <title>회원가입 | CiteFlow</title>
      </Head>
      <div className="auth-wrap">
        <div className="bg-orb orb1" />
        <div className="bg-orb orb2" />
        <div className="auth-card">
          <a href="/" className="logo">Cite<span>Flow</span></a>
          <h1>무료로 시작해 보세요</h1>
          <p>학술 글쓰기 코파일럿 워크스페이스를 생성하고 첫 리포트를 작성하세요.</p>
          <form onSubmit={(e) => { e.preventDefault(); alert('회원가입 데모 화면입니다.'); }}>
            <label>이름</label>
            <input type="text" placeholder="홍길동" required />
            <label>이메일</label>
            <input type="email" placeholder="you@univ.ac.kr" required />
            <label>비밀번호</label>
            <input type="password" placeholder="8자 이상 입력" required />
            <label className="agree">
              <input type="checkbox" required />
              <span>이용약관 및 개인정보처리방침에 동의합니다.</span>
            </label>
            <button type="submit">회원가입</button>
          </form>
          <div className="links">
            <a href="/login">로그인</a>
            <a href="/">메인으로</a>
          </div>
        </div>
      </div>
      <style jsx>{`
        .auth-wrap{position:relative;overflow:hidden;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;background:linear-gradient(180deg,#f8fafc 0%,#edf3ff 100%)}
        .bg-orb{position:absolute;border-radius:999px;filter:blur(36px);opacity:.45;pointer-events:none}
        .orb1{width:300px;height:300px;background:#93c5fd;top:-80px;right:-60px}
        .orb2{width:260px;height:260px;background:#c4b5fd;bottom:-90px;left:-70px}
        .auth-card{position:relative;z-index:1;width:100%;max-width:470px;background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:30px;box-shadow:0 14px 36px rgba(15,23,42,.10)}
        .logo{display:inline-block;font-weight:800;text-decoration:none;color:#0f172a;margin-bottom:10px}
        .logo span{color:#2563eb}
        h1{margin:0 0 8px;font-size:28px;line-height:1.25}
        p{margin:0 0 18px;color:#64748b;font-size:14px}
        form{display:flex;flex-direction:column;gap:8px}
        label{font-size:13px;font-weight:600;color:#334155}
        input{border:1px solid #cbd5e1;border-radius:10px;padding:11px 12px;font:inherit;outline:none;transition:.2s}
        input:focus{border-color:#2563eb;box-shadow:0 0 0 3px rgba(37,99,235,.12)}
        .agree{display:flex;gap:8px;align-items:flex-start;margin-top:4px}
        .agree input{margin-top:3px}
        .agree span{font-size:12px;color:#64748b;font-weight:500}
        button{margin-top:8px;border:none;border-radius:10px;padding:12px;background:#2563eb;color:#fff;font-weight:700;cursor:pointer;transition:.2s}
        button:hover{background:#1d4ed8;transform:translateY(-1px)}
        .links{margin-top:14px;display:flex;justify-content:space-between}
        .links a{font-size:13px;color:#475569;text-decoration:none}
        .links a:hover{color:#1d4ed8}
      `}</style>
    </>
  )
}
