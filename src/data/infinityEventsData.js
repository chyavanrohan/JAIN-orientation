
    const eventsData = [
      // Cultural Events
      { registerLink: "https://forms.gle/cuHQVWQPioBD6k6w5", src: "19-of-44.webp", date: "23.04.2026", prize: "5000", name: "Multiverse Conclave", club: "Literature club", css: "", type: "cultural", kind: "acting" },
      { registerLink: "https://forms.gle/TzaNxrYwGMiVJG248", src: "18-of-44.webp", date: "22.04.2026", prize: "8000", name: "Origin Protocol", club: "Literature club", css: "", type: "cultural", kind: "writing" },
      { registerLink: "https://forms.gle/pZ2XWvNW9g4LGxGP8", src: "15-of-44.webp", date: "29.04.2026", prize: "13000", name: "Film Festival", club: "Celluloid Club", css: "", type: "cultural", kind: "film" },
      { registerLink: "https://forms.gle/X83AgFbGgbHv2pwi8", src: "21-of-44.webp", date: "27.04.2026", prize: "", name: "Indian cinema Day", club: "Theatre Club", css: "", type: "cultural", kind: "acting" },
      { registerLink: "https://forms.gle/K8FA8vV41veV8EpY8", src: "25-of-44.webp", date: "25.04.2026", prize: "8000", name: "Game of Thrones", club: "Gravel & Globe", css: "", type: "cultural", kind: "debate" },
      { registerLink: "https://forms.gle/qPawpU5Nwtm8f7Bx5", src: "17-of-44.webp", date: "23.04.2026", prize: "2000", name: "Micdrop", club: "Oraters Club", css: "", type: "cultural", kind: "singing" },
      { registerLink: "https://forms.gle/fm39U5SCUEjkzsEw7", src: "16-of-44.webp", date: "23.04.2026", prize: "6000", name: "What If?", club: "Oraters Club", css: "", type: "cultural", kind: "debate" },
      { registerLink: "https://forms.gle/ULrLiFjpi1okPrdd9", src: "10-of-44.webp", date: "30.04.2026", prize: "5000", name: "Monologue", club: "Symphony Club", css: "", type: "cultural", kind: "singing" },
      { registerLink: "https://forms.gle/1nicEh1nd4sYeJvi6", src: "11-of-44.webp", date: "30.04.2026", prize: "7500", name: "Frequency frenzy", club: "Symphony Club", css: "", type: "cultural", kind: "singing" },
      { registerLink: "https://forms.gle/C2BkpHt15KZKrts6A", src: "12-of-44.webp", date: "29.04.2026", prize: "15000", name: "Battle of Bands", club: "Symphony Club", css: "", type: "cultural", kind: "singing" },
      { registerLink: "https://forms.gle/Q3zUc21dRBix6muY9", src: "20-of-44.webp", date: "23.04.2026", prize: "3000", name: "Capture the Moment", club: "Photography Club", css: "", type: "cultural", kind: "photography" },
      { registerLink: "https://forms.gle/fD8Trb5wHX6WSADS7", src: "9-of-44.webp", date: "29.04.2026", prize: "25000", name: "Veil Of Verse", club: "Fashion Club", css: "", type: "cultural", kind: "acting" },
      { registerLink: "https://forms.gle/ZTLE5G1h2bhoMEEg7", src: "23-of-44.webp", date: "24.04.2026", prize: "3000", name: "Treasure Hunt", club: "Art and Crafts Club", css: "", type: "cultural", kind: "treasure hunt" },
      { registerLink: "https://forms.gle/k7GzPzBpZevkp8dt7", src: "24-of-44.webp", date: "24.04.2026", prize: "", name: "Paper Fashion", club: "Art and Crafts Club", css: "", type: "cultural", kind: "fashion" },
      { registerLink: "https://forms.gle/vGrbXP86wsbiz5MZ6", src: "13-of-44.webp", date: "29.04.2026", prize: "5000", name: "Solo Street Battle", club: "Dance Club", css: "", type: "cultural", kind: "dance" },
      { registerLink: "https://forms.gle/YJ7LrtAYLC7rJ9sz9", src: "14-of-44.webp", date: "30.04.2026", prize: "15000", name: "Cosmic Conversion", club: "Dance Club", css: "", type: "cultural", kind: "dance" },
      // Technical Events
      { registerLink: "https://forms.gle/JnAjWFS9mE2eZxkNA", src: "31-of-44.webp", date: "28.04.2026", prize: "Cash prize", name: "GRID GAMBIT", club: "AI-Devops, CPS", css: "", type: "technical", kind: "technical" },
      { registerLink: "https://forms.gle/jwsazFWvLLPoyqHX9", src: "29-of-44.webp", date: "27.04.2026", prize: "Cash prize", name: "BID & BYTE", club: "CRYPTO COLLAB CE, TURING CLUB", css: "", type: "technical", kind: "technical" },
      { registerLink: "https://forms.gle/AfnowyLmzuAR4XX59", src: "30-of-44.webp", date: "27.04.2026", prize: "Cash prize", name: "AMONG US", club: "FOSS CLUB, DATA AI CLUB", css: "", type: "technical", kind: "competitive" },
      { registerLink: "https://forms.gle/wEBFRdDLQTfa32Pe6", src: "32-of-44.webp", date: "28.04.2026", prize: "Cash prize", name: "JAINS GOT TALENT", club: "CLOUD CLUB, ENIGMA CLUB", css: "", type: "technical", kind: "technical" },
      { registerLink: "https://forms.gle/wXSWL32CWE9Vtnrt6", src: "27-of-44.webp", date: "28.04.2026", prize: "Cash prize", name: "OPERATION RED TROPHY", club: "SALUS CLUB, NEURON CLUB, COGNITO CLUB", css: "", type: "technical", kind: "problem_solving" },
      { registerLink: "https://forms.gle/55YAsCEydnbEQ7qh6", src: "28-of-44.webp", date: "27.04.2026", prize: "Cash prize", name: "BID TO BUILD", club: "ZIGBEE CLUB, ANOVA CLUB", css: "", type: "technical", kind: "problem_solving" },
      { registerLink: "https://forms.gle/jwsazFWvLLPoyqHX9", src: "29-of-44.webp", date: "27.04.2026", prize: "Cash prize", name: "BID & BYTE", club: "CRYPTO COLLAB CE, TURING CLUB", css: "", type: "technical", kind: "technical" },
      { registerLink: "https://forms.gle/dBoRwHxPwneCTNj76", src: "34-of-44.webp", date: "25.04.2026", prize: "Cash prize", name: "FORGE & FLUX", club: "CORE TEAM", css: "", type: "technical", kind: "technical" },
      { registerLink: "https://forms.gle/eTWLkGocm3aZtYxw6", src: "36-of-44.webp", date: "27.04.2026", prize: "Cash prize", name: "UAV DESIGN COMP", club: "AEROSPACE TEAM", css: "", type: "technical", kind: "technical" },
      // Concert Events
      { registerLink: "#", src: "6-of-44.webp", date: "29.04.2026", prize: "", name: "Ragg The Band", club: "Concert Showcase", css: "", type: "concert", kind: "concert" },
      { registerLink: "#", src: "7-of-44.webp", date: "30.04.2026", prize: "", name: "DJ Kayra", club: "Concert Showcase", css: "", type: "concert", kind: "concert" }
    ]
     // sort to show cultural events first and all alphabetically within their type
    .sort((a, b) => {
      const typeOrder = { cultural: 0, technical: 1, concert: 2 };
      const typeDiff = (typeOrder[a.type] ?? 99) - (typeOrder[b.type] ?? 99);
      if (typeDiff !== 0) {
        return typeDiff;
      }
      if (a.type === b.type) {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    // --- Modal Logic ---
    function openModal(eventIndex) {
      const event = eventsData[eventIndex];
      const modal = document.querySelector('.modal-overlay');
      const bannerSrc = `assets/brochure/${event.src}`;
      modal.querySelector('.modal-title').textContent = event.name;
      modal.querySelector('.modal-club').textContent = 'By: ' + event.club;
      
      const inLink = modal.querySelector('.btn-primary');
      inLink.href = event.registerLink;

      const modalButtons = modal.querySelector('.modal-buttons');
      modalButtons.style.display = event.type === 'concert' ? 'none' : 'flex';

      const banner = modal.querySelector('.modal-banner');
      banner.src = bannerSrc;
      banner.alt = `${event.name} banner`;

      const bannerTrigger = modal.querySelector('.modal-banner-trigger');
      bannerTrigger.onclick = (clickEvent) => openBannerPopover(bannerSrc, `${event.name} banner`, clickEvent);
      
      modal.classList.add('active');
      document.body.classList.add('overlay-open');
    }

    function closeModal() {
      closeBannerPopover();
      document.querySelector('.modal-overlay').classList.remove('active');
      document.body.classList.remove('overlay-open');
    }

    // Modal HTML
    const modalHTML = `
      <div class="modal-overlay" onclick="closeModal()">
        <div class="modal-content" onclick="event.stopPropagation()">
          <button class="modal-close" onclick="closeModal()">&times;</button>
          <h2 class="modal-title"></h2>
          <p class="modal-club"></p>
          <button class="modal-banner-trigger" type="button" aria-label="Open larger banner preview">
            <img class="modal-banner" alt="" />
          </button>
          <div class="modal-buttons">
            <a href="#" class="btn btn-primary" target="_blank">REGISTER</a>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  