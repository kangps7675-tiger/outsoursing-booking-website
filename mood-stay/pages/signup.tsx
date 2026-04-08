import Head from 'next/head'

export default function Signup() {
  return (
    <>
      <Head>
        <title>회원가입 — 무드스테이</title>
      </Head>
      <style jsx>{`
        .signup-container { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; background: #FDF8F3; font-family: 'Inter', sans-serif; }
        .signup-box { width: 100%; max-width: 460px; }
        .signup-header { text-align: center; margin-bottom: 40px; }
        .logo { font-family: 'Playfair Display', serif; font-size: 2rem; color: #5C4A3D; text-decoration: none; display: inline-block; margin-bottom: 8px; }
        .logo span { color: #C65D3B; }
        .signup-header p { color: #7D6B5D; font-size: .9rem; }
        .form-box { background: #FFFDF9; border-radius: 20px; padding: 40px; border: 1px solid rgba(92,74,61,0.12); box-shadow: 0 4px 24px rgba(92,74,61,0.06); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; font-size: .8rem; font-weight: 500; color: #5C4A3D; margin-bottom: 8px; }
        .form-group input { width: 100%; padding: 14px 16px; border: 1.5px solid rgba(92,74,61,0.12); border-radius: 12px; font-size: .95rem; color: #5C4A3D; background: #FDF8F3; outline: none; transition: all .2s; }
        .form-group input:focus { border-color: #84A98C; background: white; }
        .terms { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 24px; font-size: .85rem; color: #7D6B5D; }
        .terms input { width: 18px; height: 18px; accent-color: #84A98C; margin-top: 2px; }
        .terms a { color: #C65D3B; text-decoration: none; }
        .signup-btn { width: 100%; padding: 14px; background: #C65D3B; color: white; border: none; border-radius: 12px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all .2s; }
        .signup-btn:hover { background: #E07A5F; transform: translateY(-1px); }
        .login-link { text-align: center; margin-top: 24px; color: #7D6B5D; font-size: .9rem; }
        .login-link a { color: #C65D3B; text-decoration: none; font-weight: 500; }
        .back-link { text-align: center; margin-top: 20px; }
        .back-link a { color: #7D6B5D; text-decoration: none; font-size: .85rem; }
        .benefits { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 24px; padding: 16px; background: #FDF8F3; border-radius: 12px; }
        .benefit { text-align: center; }
        .benefit-icon { font-size: 1.5rem; margin-bottom: 4px; }
        .benefit-text { font-size: .75rem; color: #7D6B5D; }
        @media (max-width: 480px) { .form-box { padding: 30px 24px; } .form-row { grid-template-columns: 1fr; } .benefits { grid-template-columns: 1fr; } }
      `}</style>

      <div className="signup-container">
        <div className="signup-box">
          <div className="signup-header">
            <a href="/" className="logo">무드<span>스테이</span></a>
            <p>회원가입하고 특별한 혜택을 받아보세요</p>
          </div>
          <div className="form-box">
            <div className="benefits">
              <div className="benefit">
                <div className="benefit-icon">🎁</div>
                <div className="benefit-text">가입 시 10% 할인</div>
              </div>
              <div className="benefit">
                <div className="benefit-icon">⭐</div>
                <div className="benefit-text">포인트 적립</div>
              </div>
              <div className="benefit">
                <div className="benefit-icon">🍳</div>
                <div className="benefit-text">조식 무료</div>
              </div>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); alert('회원가입은 데모입니다'); }}>
              <div className="form-row">
                <div className="form-group">
                  <label>성</label>
                  <input type="text" placeholder="김" required />
                </div>
                <div className="form-group">
                  <label>이름</label>
                  <input type="text" placeholder="민수" required />
                </div>
              </div>
              <div className="form-group">
                <label>이메일</label>
                <input type="email" placeholder="your@email.com" required />
              </div>
              <div className="form-group">
                <label>휴대폰 번호</label>
                <input type="tel" placeholder="010-0000-0000" required />
              </div>
              <div className="form-group">
                <label>비밀번호</label>
                <input type="password" placeholder="8자 이상 입력" required />
              </div>
              <div className="form-group">
                <label>비밀번호 확인</label>
                <input type="password" placeholder="비밀번호 재입력" required />
              </div>
              <label className="terms">
                <input type="checkbox" required />
                <span><a href="#">이용약관</a> 및 <a href="#">개인정보처리방침</a>에 동의합니다</span>
              </label>
              <button type="submit" className="signup-btn">회원가입</button>
            </form>
          </div>
          <div className="login-link">
            이미 회원이신가요? <a href="/login">로그인</a>
          </div>
          <div className="back-link">
            <a href="/">← 메인으로 돌아가기</a>
          </div>
        </div>
      </div>
    </>
  )
}
