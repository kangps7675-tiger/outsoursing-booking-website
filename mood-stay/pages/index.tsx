import Head from 'next/head'
import { useEffect, useState } from 'react'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const getDates = () => {
    const t = new Date()
    const tom = new Date(t)
    tom.setDate(tom.getDate() + 1)
    const fmt = (d: Date) => d.toISOString().split('T')[0]
    return { today: fmt(t), tomorrow: fmt(tom) }
  }

  const { today, tomorrow } = getDates()

  return (
    <>
      <Head>
        <title>무드 스테이 — 부티크 호텔</title>
        <meta name="description" content="제주의 고요한 풍경과 어우러진 부티크 호텔에서 특별한 휴식을 경험하세요" />
      </Head>

      <nav className="nav">
        <div className="nav-logo">무드<span>스테이</span></div>
        <ul className="nav-links">
          <li><a href="#rooms">객실</a></li>
          <li><a href="#amenities">부대시설</a></li>
          <li><a href="#">오시는 길</a></li>
        </ul>
        <div className="nav-right">
          <a href="/login" className="nav-back">로그인</a>
          <a href="/signup" className="nav-cta">회원가입</a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">Boutique Hotel</span>
          <h1>자연 속에서<br /><span>쉬어가는</span> 시간</h1>
          <p className="hero-sub">제주의 고요한 풍경과 어우러진 부티크 호텔에서 특별한 휴식을 경험하세요</p>
        </div>
        <div className="search-bar">
          <div className="search-field">
            <label>체크인</label>
            <input type="date" defaultValue={today} suppressHydrationWarning />
          </div>
          <div className="search-field">
            <label>체크아웃</label>
            <input type="date" defaultValue={tomorrow} suppressHydrationWarning />
          </div>
          <div className="search-field">
            <label>인원</label>
            <select defaultValue="2">
              <option value="1">1명</option>
              <option value="2">2명</option>
              <option value="3">3명</option>
              <option value="4">4명</option>
            </select>
          </div>
          <a href="/login" className="search-btn">객실 검색</a>
        </div>
      </section>

      <section className="rooms-sec" id="rooms">
        <div className="sec-header">
          <div className="sec-label">Rooms & Suites</div>
          <h2>객실 안내</h2>
          <p>각기 다른 무드의 객실에서 편안한 시간을 보내세요</p>
        </div>
        <div className="rooms-grid">
          <div className="room-card">
            <div className="room-thumb r1">
              <span className="room-type-badge">스탠다드</span>
              <span className="room-view-badge">오션뷰</span>
            </div>
            <div className="room-body">
              <div className="room-name">스탠다드 오션룸</div>
              <div className="room-desc">25㎡의 아늑한 공간에서 제주 바다를 바라보며 편안한 휴식을 즐기세요.</div>
              <div className="room-amenities">
                <span className="amenity-tag">킹베드</span>
                <span className="amenity-tag">오션뷰</span>
                <span className="amenity-tag">욕조</span>
              </div>
              <div className="room-footer">
                <div className="room-price">
                  <div className="price">₩150,000 <span className="per">/ 박</span></div>
                  <div className="size">25㎡ · 최대 2인</div>
                </div>
                <a href="/login" className="book-btn">예약하기</a>
              </div>
            </div>
          </div>

          <div className="room-card">
            <div className="room-thumb r2">
              <span className="room-type-badge">디럭스</span>
              <span className="room-view-badge">오션뷰</span>
            </div>
            <div className="room-body">
              <div className="room-name">디럭스 오션룸</div>
              <div className="room-desc">35㎡의 넓은 공간과 파노라마 창문으로 제주 바다를 온전히 담아냅니다.</div>
              <div className="room-amenities">
                <span className="amenity-tag">킹베드</span>
                <span className="amenity-tag">파노라마뷰</span>
                <span className="amenity-tag">미니바</span>
              </div>
              <div className="room-footer">
                <div className="room-price">
                  <div className="price">₩250,000 <span className="per">/ 박</span></div>
                  <div className="size">35㎡ · 최대 2인</div>
                </div>
                <a href="/login" className="book-btn">예약하기</a>
              </div>
            </div>
          </div>

          <div className="room-card">
            <div className="room-thumb r3">
              <span className="room-type-badge">패밀리 스위트</span>
              <span className="room-view-badge">가든뷰</span>
            </div>
            <div className="room-body">
              <div className="room-name">패밀리 스위트</div>
              <div className="room-desc">55㎡의 넓은 스위트룸으로 가족 여행에 최적화된 공간입니다.</div>
              <div className="room-amenities">
                <span className="amenity-tag">침실 2개</span>
                <span className="amenity-tag">거실</span>
                <span className="amenity-tag">주방</span>
              </div>
              <div className="room-footer">
                <div className="room-price">
                  <div className="price">₩380,000 <span className="per">/ 박</span></div>
                  <div className="size">55㎡ · 최대 4인</div>
                </div>
                <a href="/login" className="book-btn">예약하기</a>
              </div>
            </div>
          </div>

          <div className="room-card">
            <div className="room-thumb r4">
              <span className="room-type-badge">프레지덴셜</span>
              <span className="room-view-badge">테라스</span>
            </div>
            <div className="room-body">
              <div className="room-name">프레지덴셜 스위트</div>
              <div className="room-desc">85㎡의 최고급 스위트와 전용 테라스에서 제주 바다와 한라산을 동시에 즐기세요.</div>
              <div className="room-amenities">
                <span className="amenity-tag">전용 테라스</span>
                <span className="amenity-tag">버틀러 서비스</span>
                <span className="amenity-tag">자쿠지</span>
              </div>
              <div className="room-footer">
                <div className="room-price">
                  <div className="price">₩680,000 <span className="per">/ 박</span></div>
                  <div className="size">85㎡ · 최대 2인</div>
                </div>
                <a href="/login" className="book-btn">예약하기</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="amenities-sec" id="amenities">
        <div className="sec-header">
          <div className="sec-label" style={{color: '#FDF8F3'}}>Amenities</div>
          <h2>부대시설</h2>
          <p>무드스테이의 모든 시설을 자유롭게 이용하세요</p>
        </div>
        <div className="amenities-grid">
          <div className="amen-card">
            <div className="amen-icon">🏊</div>
            <h4>인피니티 풀</h4>
            <p>제주 바다와 맞닿은 듯한 인피니티 수영장</p>
          </div>
          <div className="amen-card">
            <div className="amen-icon">🍽️</div>
            <h4>레스토랑</h4>
            <p>제주 로컬 식재료로 만든 코스 요리</p>
          </div>
          <div className="amen-card">
            <div className="amen-icon">💆</div>
            <h4>스파 & 웰니스</h4>
            <p>전문 테라피스트의 힐링 마사지</p>
          </div>
          <div className="amen-card">
            <div className="amen-icon">🏋️</div>
            <h4>피트니스 센터</h4>
            <p>최신 운동 기구와 오션뷰 요가 클래스</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div>
          <div className="footer-logo">무드<span>스테이</span></div>
          <div className="footer-info">제주시 애월읍 · 064-123-4567</div>
        </div>
        <div className="footer-right">
          © 2026 무드스테이<br />
          <a href="/login">로그인</a> · <a href="/signup">회원가입</a>
        </div>
      </footer>
    </>
  )
}
