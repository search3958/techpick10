
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