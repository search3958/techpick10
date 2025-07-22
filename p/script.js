
    const scrollBall = document.getElementById('scrollBall');
    let isDragging = false;
    let offsetY = 0;
    let scrollSpeed = 0;

    scrollBall.addEventListener('mousedown', (e) => {
      isDragging = true;
      offsetY = e.clientY - scrollBall.getBoundingClientRect().top;
      document.body.style.userSelect = 'none';
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
      document.body.style.userSelect = '';
      scrollSpeed = 0;
      scrollBall.style.transition = 'top 0.5s cubic-bezier(0,.35,0,1)';
      scrollBall.style.top = '50%';
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const newY = e.clientY - offsetY;
      const maxY = window.innerHeight - scrollBall.offsetHeight;
      scrollBall.style.transition = 'none';
      scrollBall.style.top = `${Math.min(Math.max(0, newY), maxY)}px`;
      updateScrollSpeed();
    });

    scrollBall.addEventListener('touchstart', (e) => {
      isDragging = true;
      offsetY = e.touches[0].clientY - scrollBall.getBoundingClientRect().top;
    }, { passive: false });

    scrollBall.addEventListener('touchend', () => {
      isDragging = false;
      scrollSpeed = 0;
      scrollBall.style.transition = 'top 0.5s cubic-bezier(0,.35,0,1)';
      scrollBall.style.top = '50%';
    });

    scrollBall.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const newY = e.touches[0].clientY - offsetY;
      const maxY = window.innerHeight - scrollBall.offsetHeight;
      scrollBall.style.transition = 'none';
      scrollBall.style.top = `${Math.min(Math.max(0, newY), maxY)}px`;
      updateScrollSpeed();
    }, { passive: false });

    function updateScrollSpeed() {
      const ballTop = scrollBall.getBoundingClientRect().top;
      const center = window.innerHeight / 2;
      const distance = ballTop - center;
      scrollSpeed = distance * 0.07;
    }

    function scrollLoop() {
      if (Math.abs(scrollSpeed) > 0.5) {
        window.scrollBy(0, scrollSpeed);
      }
      requestAnimationFrame(scrollLoop);
    }

    scrollLoop();

// HTMLからJSONデータを取得
function getWatchesFromHTML() {
  const el = document.getElementById('watch-data');
  if (!el) return [];
  try {
    return JSON.parse(el.textContent);
  } catch (e) {
    console.error('JSON parse error', e);
    return [];
  }
}

// スマートウォッチリストを描画する関数
function renderWatchList(list) {
  const container = document.getElementById('watch-list');
  if (!container) return;
  container.innerHTML = '';
  list.forEach(watch => {
    const card = document.createElement('div');
    card.className = 'watch-card';
    card.innerHTML = `
      <h3>${watch.name}</h3>
      <div><strong>価格:</strong> ${watch.priceText}</div>
      <div><strong>👍 良いところ:</strong><ul>${watch.pros.map(p => `<li>${p}</li>`).join('')}</ul></div>
      <div><strong>🧐 デメリット:</strong><ul>${watch.cons.map(c => `<li>${c}</li>`).join('')}</ul></div>
    `;
    container.appendChild(card);
  });
}

// 価格順ソートボタン
function addSortButton(watches) {
  const container = document.getElementById('watch-list');
  if (!container) return;
  const btn = document.createElement('button');
  btn.textContent = '価格が安い順に並べる';
  btn.onclick = () => {
    const sorted = [...watches].sort((a, b) => a.price - b.price);
    renderWatchList(sorted);
  };
  container.parentNode.insertBefore(btn, container);
}

document.addEventListener('DOMContentLoaded', () => {
  const watches = getWatchesFromHTML();
  renderWatchList(watches);
  addSortButton(watches);
});