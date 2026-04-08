import Head from 'next/head'

export default function Login() {
  return (
    <>
      <Head>
        <title>로그인 — 무드스테이</title>
      </Head>
      <style jsx>{`
        .login-container { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; background: #FDF8F3; font-family: 'Inter', sans-serif; }
        .login-box { width: 100%; max-width: 420px; }
        .login-header { text-align: center; margin-bottom: 40px; }
        .logo { font-family: 'Playfair Display', serif; font-size: 2rem; color: #5C4A3D; text-decoration: none; display: inline-block; margin-bottom: 8px; }
        .logo span { color: #C65D3B; }
        .login-header p { color: #7D6B5D; font-size: .9rem; }
        .form-box { background: #FFFDF9; border-radius: 20px; padding: 40px; border: 1px solid rgba(92,74,61,0.12); box-shadow: 0 4px 24px rgba(92,74,61,0.06); }
        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; font-size: .8rem; font-weight: 500; color: #5C4A3D; margin-bottom: 8px; }
        .form-group input { width: 100%; padding: 14px 16px; border: 1.5px solid rgba(92,74,61,0.12); border-radius: 12px; font-size: .95rem; color: #5C4A3D; background: #FDF8F3; outline: none; transition: all .2s; }
        .form-group input:focus { border-color: #84A98C; background: white; }
        .form-options { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; font-size: .8rem; }
        .remember { display: flex; align-items: center; gap: 6px; color: #7D6B5D; }
        .remember input { width: 16px; height: 16px; accent-color: #84A98C; }
        .forgot { color: #C65D3B; text-decoration: none; }
        .forgot:hover { text-decoration: underline; }
        .login-btn { width: 100%; padding: 14px; background: #C65D3B; color: white; border: none; border-radius: 12px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all .2s; }
        .login-btn:hover { background: #E07A5F; transform: translateY(-1px); }
        .divider { text-align: center; margin: 24px 0; position: relative; }
        .divider::before { content: ''; position: absolute; top: 50%; left: 0; right: 0; height: 1px; background: rgba(92,74,61,0.12); }
        .divider span { background: #FFFDF9; padding: 0 16px; position: relative; color: #7D6B5D; font-size: .8rem; }
        .social-login { display: flex; gap: 12px; }
        .social-btn { flex: 1; padding: 12px; border: 1.5px solid rgba(92,74,61,0.12); border-radius: 12px; background: white; cursor: pointer; font-size: .9rem; transition: all .2s; }
        .social-btn:hover { border-color: #84A98C; background: #FDF8F3; }
        .signup-link { text-align: center; margin-top: 24px; color: #7D6B5D; font-size: .9rem; }
        .signup-link a { color: #C65D3B; text-decoration: none; font-weight: 500; }
        .back-link { text-align: center; margin-top: 20px; }
        .back-link a { color: #7D6B5D; text-decoration: none; font-size: .85rem; }
        @media (max-width: 480px) { .form-box { padding: 30px 24px; } }
      `}</style>

      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <a href="/" className="logo">무드<span>스테이</span></a>
            <p>제주의 고요한 풍경 속에서 특별한 휴식</p>
          </div>
          <div className="form-box">
            <form onSubmit={(e) => { e.preventDefault(); alert('로그인 기능은 데모입니다'); }}>
              <div className="form-group">
                <label>이메일</label>
                <input type="email" placeholder="your@email.com" required />
              </div>
              <div className="form-group">
                <label>비밀번호</label>
                <input type="password" placeholder="••••••••" required />
              </div>
              <div className="form-options">
                <label className="remember">
                  <input type="checkbox" />
                  <span>로그인 상태 유지</span>
                </label>
                <a href="#" className="forgot">비밀번호 찾기</a>
              </div>
              <button type="submit" className="login-btn">로그인</button>
            </form>
            <div className="divider"><span>또는</span></div>
            <div className="social-login">
              <button className="social-btn" onClick={() => alert('소셜 로그인은 데모입니다')}>카카오</button>
              <button className="social-btn" onClick={() => alert('소셜 로그인은 데모입니다')}>네이버</button>
              <button className="social-btn" onClick={() => alert('소셜 로그인은 데모입니다')}>Google</button>
            </div>
          </div>
          <div className="signup-link">
            아직 회원이 아니신가요? <a href="/signup">회원가입</a>
          </div>
          <div className="back-link">
            <a href="/">← 메인으로 돌아가기</a>
          </div>
        </div>
      </div>
    </>
  )
}
