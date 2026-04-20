// =============================================
// 설정값 — Supabase 및 구글 폼 URL 입력 필요
// =============================================
const GOOGLE_FORM_URL   = 'https://forms.gle/ESe65Hi2M1UVg6p76';
const SUPABASE_URL      = 'https://bpcdmavlywwznchxufex.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwY2RtYXZseXd3em5jaHh1ZmV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1NTc0MDUsImV4cCI6MjA5MTEzMzQwNX0.RJx-Xw4Mb81gdWQ2nflTUQ5uF-cmCVqafnUPpCqtY9I';

function openConsultForm() {
  if (!GOOGLE_FORM_URL) {
    alert('구글 폼 URL이 아직 설정되지 않았습니다.');
    return;
  }
  window.open(GOOGLE_FORM_URL, '_blank');
}

async function fetchConsultCount(query = '') {
  const url = `${SUPABASE_URL}/rest/v1/consultations?select=id${query ? `&${query}` : ''}`;
  const res = await fetch(url, {
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Prefer': 'count=exact',
      'Range': '0-0'
    }
  });
  if (!res.ok) throw new Error(`count query failed: ${res.status}`);
  return res.headers.get('Content-Range')?.split('/')[1] ?? '0';
}

async function loadConsultStats() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return;
  try {
    let inProgressStrict = '0';
    try {
      inProgressStrict = await fetchConsultCount('status=eq.진행중&is_verified=is.true&started_at=not.is.null');
    } catch (_) {
      // Backward compatibility until DB columns are added.
      inProgressStrict = await fetchConsultCount('status=eq.진행중');
    }
    const [completed, total, inProgress] = await Promise.all([
      fetchConsultCount('status=eq.완료'),
      fetchConsultCount(),
      Promise.resolve(inProgressStrict)
    ]);
    const completedEl = document.getElementById('completedCount');
    const requestEl = document.getElementById('requestCount');
    const inProgressEl = document.getElementById('inProgressCount');
    if (completedEl) completedEl.textContent = `${completed}건`;
    if (requestEl) requestEl.textContent = `${total}건`;
    if (inProgressEl) inProgressEl.textContent = `${inProgress}건`;
  } catch (_) {}
}

loadConsultStats();

(() => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const randomMs = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const typeWaveText = async (target, lines, accentLineIndex = -1, speedRange = [35, 95]) => {
    if (!target) return;
    target.innerHTML = "";
    target.classList.add("typing-target", "is-typing");
    let charIndex = 0;

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
      const lineElement = document.createElement("span");
      lineElement.className = "typed-line";
      target.appendChild(lineElement);

      const line = lines[lineIndex];
      for (const ch of line) {
        const charSpan = document.createElement("span");
        charSpan.className = "typed-char";
        if (lineIndex === accentLineIndex) charSpan.classList.add("typed-accent");
        charSpan.style.setProperty("--char-index", String(charIndex));
        charSpan.textContent = ch === " " ? "\u00A0" : ch;
        lineElement.appendChild(charSpan);
        charIndex += 1;
        await sleep(randomMs(speedRange[0], speedRange[1]));
      }
      if (lineIndex < lines.length - 1) await sleep(120);
    }

    target.classList.remove("is-typing");
  };

  void (async () => {
    await typeWaveText(document.querySelector("#heroTitle"), ["아이디어를", "빠르게", "현실로 만듭니다"], 1, [45, 110]);
    await sleep(120);
    const heroSub = document.querySelector("#heroSub");
    if (heroSub) heroSub.style.visibility = "visible";
    await typeWaveText(
      heroSub,
      ["스타트업, 소상공인, 크리에이터를 위한", "합리적인 가격의 맞춤형 웹 개발 솔루션"],
      -1,
      [22, 58],
    );
  })();

  // Scroll-triggered typing
  (() => {
    const targets = document.querySelectorAll('[data-type-scroll]');
    targets.forEach(el => {
      el.dataset.typeText = el.textContent.trim();
      el.innerHTML = '';
    });

    const typeSimple = async (target) => {
      const text = target.dataset.typeText;
      if (!text) return;
      target.style.visibility = 'visible';
      target.classList.add('typing-target', 'is-typing');
      for (const ch of text) {
        const span = document.createElement('span');
        span.className = 'typed-char';
        span.textContent = ch === ' ' ? '\u00A0' : ch;
        target.appendChild(span);
        await sleep(randomMs(22, 60));
      }
      target.classList.remove('is-typing');
    };

    const headers = new Set(
      [...targets].map(el => el.closest('.section-header')).filter(Boolean)
    );

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(async entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        for (const child of entry.target.querySelectorAll('[data-type-scroll]')) {
          await typeSimple(child);
          await sleep(80);
        }
      });
    }, { threshold: 0.4 });

    headers.forEach(h => observer.observe(h));
  })();

  const mq = window.matchMedia("(max-width:640px)");
  const faqItems = document.querySelectorAll(".faq-item");

  const setOpenState = (item, isOpen) => {
    const answer = item.querySelector(".faq-a");
    const toggle = item.querySelector(".faq-toggle");
    item.classList.toggle("open", isOpen);
    answer.hidden = !isOpen;
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.textContent = isOpen ? "닫기" : "열기";
  };

  const applyMode = () => {
    faqItems.forEach((item) => {
      const answer = item.querySelector(".faq-a");
      const toggle = item.querySelector(".faq-toggle");
      if (!mq.matches) {
        item.classList.remove("open");
        answer.hidden = false;
        toggle.hidden = true;
        toggle.setAttribute("aria-expanded", "true");
      } else {
        toggle.hidden = false;
        const isOpen = item.classList.contains("open");
        setOpenState(item, isOpen);
      }
    });
  };

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-q");
    const toggle = item.querySelector(".faq-toggle");
    const onToggle = (event) => {
      if (!mq.matches) return;
      if (event.target.closest(".faq-toggle") || event.currentTarget === question) {
        const isOpen = item.classList.contains("open");
        setOpenState(item, !isOpen);
      }
    };
    question.addEventListener("click", onToggle);
    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      onToggle(event);
    });
  });

  applyMode();
  mq.addEventListener("change", applyMode);
})();
