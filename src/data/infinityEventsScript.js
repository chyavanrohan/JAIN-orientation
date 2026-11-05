
    // --- 1. Panel Creation Functions ---

    function createPanelA() {
      const panel = document.createElement('section');
      panel.className = 'panel panel-a';
      panel.innerHTML = `<div class="hint">Scroll down</div>`;
      return panel;
    }

    function createPanelB() {
      const panel = document.createElement('section');
      panel.className = 'panel panel-b';
      
      const title = document.createElement('div');
      title.className = 'title';
      title.innerHTML = `<span>INFINITY</span><span class="accent">2026</span>`;
      
      panel.appendChild(title);
      panel.titleElement = title; 
      
      return panel;
    }

    function createPanelC() {
      const panel = document.createElement('section');
      panel.className = 'panel panel-c';
      
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h2>About Faculty of Engineering &amp; Technology</h2>
        <p>
          With a decade of experience, the Faculty of Engineering &amp; Technology at JAIN
          (Deemed-to-be University) (JU-FET) is the prominent engineering institution in Bengaluru.
          B.Tech., M.Tech., and specialised programmes are available at JU-FET. JU-FET is committed
          to delivering an education of the highest calibre. By utilising the practical and
          forward-thinking approach, in addition to the superior teaching and research facilities,
          students will receive a unique and high-caliber academic experience that is centred on
          skill and knowledge development. This will facilitate a seamless transition from
          academia to the business world.
        </p>
      `;
      
      panel.appendChild(card);
      panel.cardElement = card;
      
      return panel;
    }

    function createPanelD() {
      const panel = document.createElement('section');
      panel.className = 'panel panel-c'; // Reusing panel-c background styling
      
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h2>About Infinity Fest</h2>
        <p>
          Infinity Fest is a vibrant celebration where culture meets innovation, filled with energy, excitement, and creativity. It provides students a platform to showcase their talents, connect with diverse backgrounds, and experience an unforgettable journey of learning and expression.
        </p>

        <h2>About The Cultural Club at FET-JU</h2>
        <p>
          The Cultural Club at FET-JU nurtures creativity and celebrates diverse talents by offering a platform for students to explore, showcase, and enhance their skills. Through various events and competitions, it promotes confidence, teamwork, and a vibrant community spirit.
        </p>
      `;
      
      panel.appendChild(card);
      panel.cardElement = card;
      
      return panel;
    }

    function createPanelE() {
      const panel = document.createElement('section');
      panel.className = 'panel panel-c'; 
      
      const card = document.createElement('div');
      card.className = 'card';
      card.style.maxWidth = '1100px'; // wider for the grid
      
      let eventsHTML = `
        <div class="filter-tabs">
          <button class="filter-btn active" onclick="filterEvents('all', this)">All</button>
          <button class="filter-btn" onclick="filterEvents('cultural', this)">Cultural</button>
          <button class="filter-btn" onclick="filterEvents('technical', this)">Technical</button>
          <button class="filter-btn" onclick="filterEvents('concert', this)">Concert</button>
        </div>
      `;

      const eventGroups = [
        { label: 'Cultural Events', type: 'cultural' },
        { label: 'Technical Events', type: 'technical' },
        { label: 'Concert Events', type: 'concert' },
      ];

      eventGroups.forEach(group => {
        const groupEvents = eventsData
          .map((event, index) => ({ event, index }))
          .filter(item => item.event.type === group.type);

        eventsHTML += `
          <section class="event-section" data-section="${group.type}">
            <h3 class="event-section-title">${group.label}</h3>
            <div class="events-grid" id="eventsContainer-${group.type}">
              ${groupEvents.map(({ event, index }) => `
                <div class="event-card ${event.type}" data-type="${event.type}" onclick="openModal(${index})">
                  <h3>${event.name}</h3>
                  <p>${event.club}</p>
                  <span class="event-kind">${event.kind}</span>
                </div>
              `).join('')}
            </div>
          </section>
        `;
      });

      card.innerHTML = `
        <h2>Explore Infinity Events</h2>
        <p style="margin-bottom: 20px;">Discover technical and cultural events curated by various clubs.</p>
        ${eventsHTML}
      `;
      
      panel.appendChild(card);
      panel.cardElement = card;
      
      return panel;
    }

    function filterEvents(type, btnElement) {
      document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
      if (btnElement) btnElement.classList.add('active');
      
      const cards = document.querySelectorAll('.event-card');
      const sections = document.querySelectorAll('.event-section');
      cards.forEach(card => {
        card.style.display = type === 'all' || card.dataset.type === type ? 'block' : 'none';
      });
      sections.forEach(section => {
        const sectionCards = section.querySelectorAll('.event-card');
        const hasVisibleCard = Array.from(sectionCards).some(card => card.style.display !== 'none');
        section.style.display = hasVisibleCard ? 'block' : 'none';
      });
    }

    // --- 2. Initialize Panels ---

    const panelA = createPanelA();
    const panelB = createPanelB();
    const panelC = createPanelC();
    const panelD = createPanelD();
    const panelE = createPanelE();

    // Insert panels into the document (before the vignette)
    const vignette = document.querySelector('.vignette');
    document.body.insertBefore(panelA, vignette);
    document.body.insertBefore(panelB, vignette);
    document.body.insertBefore(panelC, vignette);
    document.body.insertBefore(panelD, vignette);
    document.body.insertBefore(panelE, vignette);
    
    // --- 3. Animation Logic ---

    const panels = [panelA, panelB, panelC, panelD, panelE];

    let activePanelIndex = 0;
    let slideLocked = false;
    const slideLockMs = 1100;

    function isScrollableElement(element, deltaY) {
      if (!element) {
        return false;
      }

      const maxScrollTop = element.scrollHeight - element.clientHeight;
      if (maxScrollTop <= 0) {
        return false;
      }

      if (deltaY > 0) {
        return element.scrollTop < maxScrollTop - 1;
      }

      return element.scrollTop > 1;
    }

    function isScrollableAtEdge(element, deltaY) {
      if (!element) {
        return true;
      }

      const maxScrollTop = element.scrollHeight - element.clientHeight;
      if (maxScrollTop <= 0) {
        return true;
      }

      return deltaY < 0 ? element.scrollTop >= maxScrollTop - 1 : element.scrollTop <= 1;
    }

    function applyPanelState() {
      panels.forEach((panel, index) => {
        const offset = index - activePanelIndex;
        const clampedOffset = Math.max(-1, Math.min(1, offset));

        panel.style.transform = `translate3d(0, ${clampedOffset * 100}%, 0) scale(${index === activePanelIndex ? 1 : 0.985})`;
        panel.style.opacity = index === activePanelIndex ? '1' : '0';
        panel.style.zIndex = index === activePanelIndex ? '4' : '1';
        panel.style.pointerEvents = index === activePanelIndex ? 'auto' : 'none';
        panel.classList.toggle('is-visible', index === activePanelIndex);
      });
    }

    function setActivePanel(nextIndex) {
      const clampedIndex = Math.min(Math.max(nextIndex, 0), panels.length - 1);
      if (clampedIndex === activePanelIndex || slideLocked) {
        return;
      }

      activePanelIndex = clampedIndex;
      slideLocked = true;
      applyPanelState();

      window.setTimeout(() => {
        slideLocked = false;
      }, slideLockMs);
    }

    applyPanelState();

    window.addEventListener('wheel', (event) => {
      if (bannerState.open || document.body.classList.contains('overlay-open')) {
        return;
      }

      const scrollable = event.target.closest('.card, .modal-content');
      if (scrollable && isScrollableElement(scrollable, event.deltaY)) {
        return;
      }

      if (Math.abs(event.deltaY) < 12) {
        return;
      }

      event.preventDefault();

      if (slideLocked) {
        return;
      }

      setActivePanel(activePanelIndex + (event.deltaY > 0 ? 1 : -1));
    }, { passive: false });

    let swipeState = null;

    window.addEventListener('touchstart', (event) => {
      if (bannerState.open || document.body.classList.contains('overlay-open')) {
        return;
      }

      const touch = event.touches[0];
      const scrollableElement = event.target.closest('.card, .modal-content');
      swipeState = {
        startX: touch.clientX,
        startY: touch.clientY,
        startedInsideCard: Boolean(scrollableElement),
        scrollableElement: scrollableElement,
        panelSwipeEnabled: false
      };
    }, { passive: true });

    window.addEventListener('touchmove', (event) => {
      if (!swipeState) {
        return;
      }

      const touch = event.touches[0];
      const deltaX = touch.clientX - swipeState.startX;
      const deltaY = touch.clientY - swipeState.startY;

      if (!swipeState.startedInsideCard && Math.abs(deltaY) > 10 && Math.abs(deltaY) > Math.abs(deltaX)) {
        event.preventDefault();
      }
    }, { passive: false });

    window.addEventListener('touchend', (event) => {
      if (!swipeState || bannerState.open || document.body.classList.contains('overlay-open')) {
        swipeState = null;
        return;
      }

      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - swipeState.startX;
      const deltaY = touch.clientY - swipeState.startY;

      const isVerticalSwipe = Math.abs(deltaY) > 60 && Math.abs(deltaY) > Math.abs(deltaX);
      const atEdge = isScrollableAtEdge(swipeState.scrollableElement, deltaY);

      if (isVerticalSwipe && (!swipeState.startedInsideCard || atEdge)) {
        setActivePanel(activePanelIndex + (deltaY < 0 ? 1 : -1));
      }

      swipeState = null;
    }, { passive: true });

    window.addEventListener('keydown', (event) => {
      if (bannerState.open || document.body.classList.contains('overlay-open')) {
        return;
      }

      if (event.key === 'ArrowDown' || event.key === 'PageDown') {
        setActivePanel(activePanelIndex + 1);
      }

      if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        setActivePanel(activePanelIndex - 1);
      }
    });

    // --- 4. Banner Popover ---

    const bannerPopover = document.createElement('div');
    bannerPopover.className = 'banner-popover';
    bannerPopover.setAttribute('aria-hidden', 'true');
    bannerPopover.innerHTML = `
      <button class="banner-popover-close" type="button" aria-label="Close banner preview">&times;</button>
      <div class="banner-popover-stage" role="dialog" aria-modal="true" aria-label="Banner preview">
        <img class="banner-popover-media" alt="" />
      </div>
    `;
    document.body.insertAdjacentElement('beforeend', bannerPopover);

    const bannerPopoverStage = bannerPopover.querySelector('.banner-popover-stage');
    const bannerPopoverMedia = bannerPopover.querySelector('.banner-popover-media');
    const bannerPopoverClose = bannerPopover.querySelector('.banner-popover-close');
    const bannerState = { open: false, zoom: 1, x: 0, y: 0, vx: 0, vy: 0, dragging: false, pointerId: null, dragX: 0, dragY: 0, startX: 0, startY: 0, lastMoveX: 0, lastMoveY: 0, raf: 0, originX: '50%', originY: '50%', tapTs: 0 };

    function syncBannerTransform() {
      bannerPopoverStage.style.setProperty('--banner-x', `${bannerState.x}px`);
      bannerPopoverStage.style.setProperty('--banner-y', `${bannerState.y}px`);
      bannerPopoverStage.style.setProperty('--banner-scale', bannerState.zoom.toFixed(3));
      bannerPopoverStage.style.setProperty('--banner-origin-x', bannerState.originX);
      bannerPopoverStage.style.setProperty('--banner-origin-y', bannerState.originY);
    }

    function clampBannerOffset() {
      const { width, height } = bannerPopoverStage.getBoundingClientRect();
      const dx = Math.max(0, (bannerState.zoom - 1) * width / 2), dy = Math.max(0, (bannerState.zoom - 1) * height / 2);
      bannerState.x = Math.min(Math.max(bannerState.x, -dx), dx);
      bannerState.y = Math.min(Math.max(bannerState.y, -dy), dy);
    }

    function openBannerPopover(src, alt, clickEvent) {
      bannerState.open = true; bannerState.zoom = 1.08; bannerState.x = bannerState.y = bannerState.vx = bannerState.vy = 0; bannerState.dragging = false;
      const rect = clickEvent?.currentTarget?.getBoundingClientRect?.();
      bannerState.originX = rect ? `${Math.min(92, Math.max(8, ((clickEvent.clientX - rect.left) / rect.width) * 100))}%` : '50%';
      bannerState.originY = rect ? `${Math.min(92, Math.max(8, ((clickEvent.clientY - rect.top) / rect.height) * 100))}%` : '50%';
      bannerPopoverMedia.src = src; bannerPopoverMedia.alt = alt; syncBannerTransform(); bannerPopover.classList.add('active'); bannerPopover.setAttribute('aria-hidden', 'false');
      if (!bannerState.raf) bannerState.raf = requestAnimationFrame(stepBannerPopover);
    }

    function closeBannerPopover() { bannerState.open = false; bannerState.dragging = false; bannerState.pointerId = null; bannerPopover.classList.remove('active'); bannerPopover.setAttribute('aria-hidden', 'true'); }

    function stepBannerPopover() {
      if (!bannerState.open) return bannerState.raf = 0;
      if (!bannerState.dragging) {
        bannerState.vx *= 0.92; bannerState.vy *= 0.92; bannerState.x += bannerState.vx; bannerState.y += bannerState.vy;
        const { width, height } = bannerPopoverStage.getBoundingClientRect();
        const dx = Math.max(0, (bannerState.zoom - 1) * width / 2), dy = Math.max(0, (bannerState.zoom - 1) * height / 2);
        if (bannerState.x < -dx || bannerState.x > dx) { bannerState.x = Math.min(Math.max(bannerState.x, -dx), dx); bannerState.vx *= -0.4; }
        if (bannerState.y < -dy || bannerState.y > dy) { bannerState.y = Math.min(Math.max(bannerState.y, -dy), dy); bannerState.vy *= -0.4; }
      }
      syncBannerTransform();
      bannerState.raf = requestAnimationFrame(stepBannerPopover);
    }

    const zoomBanner = (delta) => { bannerState.zoom = Math.max(0.25, bannerState.zoom + delta); clampBannerOffset(); syncBannerTransform(); };
    const zoomAtPoint = (nextZoom, x, y) => { const r = bannerPopoverStage.getBoundingClientRect(); bannerState.originX = `${Math.min(92, Math.max(8, ((x - r.left) / r.width) * 100))}%`; bannerState.originY = `${Math.min(92, Math.max(8, ((y - r.top) / r.height) * 100))}%`; bannerState.zoom = Math.max(0.25, nextZoom); clampBannerOffset(); syncBannerTransform(); };

    bannerPopoverClose.onclick = closeBannerPopover;
    bannerPopoverStage.onpointerdown = (event) => { if (!bannerState.open) return; bannerState.dragging = true; bannerState.tapTs = event.timeStamp; bannerState.pointerId = event.pointerId; bannerState.dragX = bannerState.x; bannerState.dragY = bannerState.y; bannerState.startX = event.clientX; bannerState.startY = event.clientY; bannerState.lastMoveX = event.clientX; bannerState.lastMoveY = event.clientY; bannerState.vx = bannerState.vy = 0; bannerPopoverStage.setPointerCapture(event.pointerId); };
    bannerPopoverStage.onpointermove = (event) => { if (!bannerState.dragging || event.pointerId !== bannerState.pointerId) return; const r = 0.8; bannerState.x = bannerState.dragX + (event.clientX - bannerState.startX) * r; bannerState.y = bannerState.dragY + (event.clientY - bannerState.startY) * r; bannerState.vx = (event.clientX - bannerState.lastMoveX) * r; bannerState.vy = (event.clientY - bannerState.lastMoveY) * r; bannerState.lastMoveX = event.clientX; bannerState.lastMoveY = event.clientY; clampBannerOffset(); syncBannerTransform(); };
    bannerPopoverStage.onpointerup = (event) => { if (event.pointerId !== bannerState.pointerId) return; if (Math.abs(event.clientX - bannerState.startX) + Math.abs(event.clientY - bannerState.startY) < 8 && event.timeStamp - bannerState.tapTs < 250) zoomAtPoint(bannerState.zoom > 1.15 ? 1.08 : 1.7, event.clientX, event.clientY); bannerState.dragging = false; bannerState.pointerId = null; try { bannerPopoverStage.releasePointerCapture(event.pointerId); } catch {} };
    bannerPopoverStage.onpointercancel = (event) => { if (event.pointerId !== bannerState.pointerId) return; bannerState.dragging = false; bannerState.pointerId = null; try { bannerPopoverStage.releasePointerCapture(event.pointerId); } catch {} };
    bannerPopoverStage.onwheel = (event) => { if (!bannerState.open) return; event.preventDefault(); zoomBanner(event.deltaY > 0 ? -0.08 : 0.08); };
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && bannerState.open) closeBannerPopover(); });
  