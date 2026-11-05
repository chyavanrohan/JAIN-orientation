export interface TimelineEvent {
  id: string;
  name: string;
  category: 'Concert' | 'Cultural' | 'Technical' | 'Induction' | 'Sports';
  club: string;
  date: string;
  rawDate: string;
  venue: string;
  prize?: string;
  description: string;
  registerLink?: string;
  bannerImg?: string;
  videoUrl?: string;
  kind?: string;
  tags: string[];
}

export const FET_TIMELINE_EVENTS: TimelineEvent[] = [
  // --- CONCERTS (INFINITY 2026 FLAGSHIP SHOWCASES) ---
  {
    id: 'dj-kayra-2026',
    name: 'DJ Kayra (Kayra Wilson) — Live at Colosseum',
    category: 'Concert',
    club: 'Cultural Club Flagship',
    date: '30th April 2026',
    rawDate: '2026-04-30',
    venue: 'Colosseum Amphitheatre, JAIN Global Campus',
    prize: 'Exclusive Student Access',
    description: 'Bhopal sensation DJ Kayra brings high-octane Bolly Tech, Tech House, EDM, and Electro to the Colosseum. The official closing spectacle of Infinity 2026.',
    videoUrl: 'https://www.youtube.com/watch?v=bEO4Y6mjtlc',
    bannerImg: 'https://i.imgur.com/DKMQuNK.jpeg',
    tags: ['EDM', 'DJ Night', 'Colosseum', 'Bolly Tech', 'Infinity 2026']
  },
  {
    id: 'raag-the-band-2026',
    name: 'Raag: The Band — Live Cosmic Night',
    category: 'Concert',
    club: 'Cultural Club Flagship',
    date: '29th April 2026',
    rawDate: '2026-04-29',
    venue: 'Main Open Grounds, JAIN Global Campus',
    prize: 'Exclusive Student Access',
    description: 'Captivating performances blending Indian Classical melodies with Western Rock rhythms in an unprecedented night of live musical entertainment.',
    bannerImg: 'https://i.imgur.com/FIkJDsq.jpeg',
    tags: ['Fusion Band', 'Indian Classical', 'Live Rock', 'Infinity 2026']
  },

  // --- CULTURAL COMPETITIONS (INFINITY 2026) ---
  {
    id: 'veil-of-verse',
    name: 'Veil of Verse — Grand Fashion Showcase',
    category: 'Cultural',
    club: 'Fashion Club',
    date: '29th April 2026',
    rawDate: '2026-04-29',
    venue: 'Auditorium Stage',
    prize: '₹25,000 Cash Prize',
    description: 'The highest-prize runway event exploring avant-garde design, couture storytelling, and stage choreography.',
    registerLink: 'https://forms.gle/fD8Trb5wHX6WSADS7',
    bannerImg: 'https://sa-fet.github.io/Jain-Events-Portal/infinity-2026/assets/brochure/9-of-44.webp',
    tags: ['Fashion', 'Runway', 'Couture', 'Prizes']
  },
  {
    id: 'battle-of-bands',
    name: 'Battle of Bands',
    category: 'Cultural',
    club: 'Symphony Club',
    date: '29th April 2026',
    rawDate: '2026-04-29',
    venue: 'Acoustic Stage Arena',
    prize: '₹15,000 Cash Prize',
    description: 'Inter-college musical faceoff between rock, metal, indie, and fusion bands from top institutions across India.',
    registerLink: 'https://forms.gle/C2BkpHt15KZKrts6A',
    bannerImg: 'https://sa-fet.github.io/Jain-Events-Portal/infinity-2026/assets/brochure/12-of-44.webp',
    tags: ['Music', 'Bands', 'Rock', 'Live Instruments']
  },
  {
    id: 'cosmic-conversion',
    name: 'Cosmic Conversion — Mega Dance Faceoff',
    category: 'Cultural',
    club: 'Dance Club',
    date: '30th April 2026',
    rawDate: '2026-04-30',
    venue: 'Main Stage',
    prize: '₹15,000 Cash Prize',
    description: 'Crew dance battle featuring contemporary, western, hip-hop, and thematic synchronized routines.',
    registerLink: 'https://forms.gle/YJ7LrtAYLC7rJ9sz9',
    bannerImg: 'https://sa-fet.github.io/Jain-Events-Portal/infinity-2026/assets/brochure/14-of-44.webp',
    tags: ['Dance', 'Crew Battle', 'Hip Hop', 'Choreography']
  },
  {
    id: 'film-festival',
    name: 'Celluloid Short Film Festival',
    category: 'Cultural',
    club: 'Celluloid Club',
    date: '29th April 2026',
    rawDate: '2026-04-29',
    venue: 'Smart Audio-Visual Theater',
    prize: '₹13,000 Cash Prize',
    description: 'Screening and judging of original student short films, documentaries, cinematography, and screenplays.',
    registerLink: 'https://forms.gle/pZ2XWvNW9g4LGxGP8',
    bannerImg: 'https://sa-fet.github.io/Jain-Events-Portal/infinity-2026/assets/brochure/15-of-44.webp',
    tags: ['Filmmaking', 'Cinema', 'Directing', 'Screenplay']
  },
  {
    id: 'game-of-thrones-debate',
    name: 'Game of Thrones — Parliamentary Debate',
    category: 'Cultural',
    club: 'Gravel & Globe',
    date: '25th April 2026',
    rawDate: '2026-04-25',
    venue: 'Senate Room',
    prize: '₹8,000 Cash Prize',
    description: 'High-stakes debate tournament testing geopolitical diplomacy, rhetoric, cross-examination, and critical thought.',
    registerLink: 'https://forms.gle/K8FA8vV41veV8EpY8',
    bannerImg: 'https://sa-fet.github.io/Jain-Events-Portal/infinity-2026/assets/brochure/25-of-44.webp',
    tags: ['Debate', 'Model UN', 'Diplomacy', 'Oratory']
  },
  {
    id: 'origin-protocol',
    name: 'Origin Protocol — Creative Literary Challenge',
    category: 'Cultural',
    club: 'Literature Club',
    date: '22nd April 2026',
    rawDate: '2026-04-22',
    venue: 'Central Knowledge Hub',
    prize: '₹8,000 Cash Prize',
    description: 'World-building, creative writing, poetry slams, and literary puzzles for aspiring authors and poets.',
    registerLink: 'https://forms.gle/TzaNxrYwGMiVJG248',
    bannerImg: 'https://sa-fet.github.io/Jain-Events-Portal/infinity-2026/assets/brochure/18-of-44.webp',
    tags: ['Literature', 'Creative Writing', 'Poetry']
  },
  {
    id: 'frequency-frenzy',
    name: 'Frequency Frenzy — Western Solo & Duet Vocals',
    category: 'Cultural',
    club: 'Symphony Club',
    date: '30th April 2026',
    rawDate: '2026-04-30',
    venue: 'Amphitheatre',
    prize: '₹7,500 Cash Prize',
    description: 'Vocal competition testing pitch, dynamic range, and stage presence across pop, soul, blues, and classical genres.',
    registerLink: 'https://forms.gle/1nicEh1nd4sYeJvi6',
    bannerImg: 'https://sa-fet.github.io/Jain-Events-Portal/infinity-2026/assets/brochure/11-of-44.webp',
    tags: ['Vocals', 'Singing', 'Solo Performance']
  },
  {
    id: 'what-if-debate',
    name: 'What If? — Extempore & Hypotheticals',
    category: 'Cultural',
    club: 'Oraters Club',
    date: '23rd April 2026',
    rawDate: '2026-04-23',
    venue: 'Seminar Hall 2',
    prize: '₹6,000 Cash Prize',
    description: 'Spontaneous public speaking on alternate history, philosophical dilemmas, and sci-fi scenarios.',
    registerLink: 'https://forms.gle/fm39U5SCUEjkzsEw7',
    bannerImg: 'https://sa-fet.github.io/Jain-Events-Portal/infinity-2026/assets/brochure/16-of-44.webp',
    tags: ['Extempore', 'Public Speaking', 'Improv']
  },
  {
    id: 'multiverse-conclave',
    name: 'Multiverse Conclave — Drama & Mono-Acting',
    category: 'Cultural',
    club: 'Literature Club',
    date: '23rd April 2026',
    rawDate: '2026-04-23',
    venue: 'Amphitheatre',
    prize: '₹5,000 Cash Prize',
    description: 'Theatrical monologues exploring multiverse characters, literature adaptations, and emotional range.',
    registerLink: 'https://forms.gle/cuHQVWQPioBD6k6w5',
    bannerImg: 'https://sa-fet.github.io/Jain-Events-Portal/infinity-2026/assets/brochure/19-of-44.webp',
    tags: ['Drama', 'Acting', 'Theater']
  },
  {
    id: 'solo-street-battle',
    name: 'Solo Street Dance Battle',
    category: 'Cultural',
    club: 'Dance Club',
    date: '29th April 2026',
    rawDate: '2026-04-29',
    venue: 'Courtyard Arena',
    prize: '₹5,000 Cash Prize',
    description: '1-on-1 freestyle street dance battles: Popping, Locking, Krump, Breaking, and All-Styles.',
    registerLink: 'https://forms.gle/vGrbXP86wsbiz5MZ6',
    bannerImg: 'https://sa-fet.github.io/Jain-Events-Portal/infinity-2026/assets/brochure/13-of-44.webp',
    tags: ['Street Dance', 'Freestyle', 'Breakdance']
  },

  // --- TECHNICAL COMPETITIONS (INFINITY 2026) ---
  {
    id: 'grid-gambit',
    name: 'GRID GAMBIT — Algorithmic Challenge',
    category: 'Technical',
    club: 'AI-DevOps & Cyber Physical Systems (CPS)',
    date: '28th April 2026',
    rawDate: '2026-04-28',
    venue: 'Advanced AI & Supercomputing Lab (221B)',
    prize: 'Cash Prize + Cloud Credits',
    description: 'Competitive coding, distributed grid computing, and CI/CD automation pipeline sprint.',
    registerLink: 'https://forms.gle/JnAjWFS9mE2eZxkNA',
    bannerImg: 'https://sa-fet.github.io/Jain-Events-Portal/infinity-2026/assets/brochure/31-of-44.webp',
    tags: ['DevOps', 'Algorithms', 'AI', 'Cloud']
  },
  {
    id: 'bid-byte',
    name: 'BID & BYTE — Algorithmic Tech Auction',
    category: 'Technical',
    club: 'Crypto Collab CE & Turing Club',
    date: '27th April 2026',
    rawDate: '2026-04-27',
    venue: 'CS Studio 104',
    prize: 'Cash Prize & Swag',
    description: 'Auction-based system design competition where teams bid on hardware specs and build optimal software architectures.',
    registerLink: 'https://forms.gle/jwsazFWvLLPoyqHX9',
    bannerImg: 'https://sa-fet.github.io/Jain-Events-Portal/infinity-2026/assets/brochure/29-of-44.webp',
    tags: ['Crypto', 'System Design', 'Auction', 'Turing']
  },
  {
    id: 'uav-design-comp',
    name: 'UAV & Autonomous Drone Design Challenge',
    category: 'Technical',
    club: 'Aerospace Engineering Team',
    date: '27th April 2026',
    rawDate: '2026-04-27',
    venue: 'Aerodynamics Sandbox & Drone Field',
    prize: 'Cash Prize + Prototyping Grant',
    description: 'Autonomous flight path optimization, drone obstacle avoidance, payload capacity tests, and telemetry telemetry.',
    registerLink: 'https://forms.gle/eTWLkGocm3aZtYxw6',
    bannerImg: 'https://sa-fet.github.io/Jain-Events-Portal/infinity-2026/assets/brochure/36-of-44.webp',
    tags: ['Drones', 'Aerospace', 'Autonomous Flight', 'Robotics']
  },
  {
    id: 'among-us-foss',
    name: 'AMONG US — Code Impostor Hunt & Bug Bounty',
    category: 'Technical',
    club: 'FOSS Club & Data AI Club',
    date: '27th April 2026',
    rawDate: '2026-04-27',
    venue: 'NVIDIA AI Lab',
    prize: 'Cash Prize & GitHub Merch',
    description: 'Hunt stealth security vulnerabilities and planted backdoors in open-source code repositories within timed rounds.',
    registerLink: 'https://forms.gle/AfnowyLmzuAR4XX59',
    bannerImg: 'https://sa-fet.github.io/Jain-Events-Portal/infinity-2026/assets/brochure/30-of-44.webp',
    tags: ['Cybersecurity', 'Bug Bounty', 'FOSS', 'Data AI']
  },
  {
    id: 'operation-red-trophy',
    name: 'OPERATION RED TROPHY — Capture The Flag (CTF)',
    category: 'Technical',
    club: 'Salus Club, Neuron Club & Cognito Club',
    date: '28th April 2026',
    rawDate: '2026-04-28',
    venue: 'Cyber Defense Sandbox',
    prize: 'Cash Prize + Certification',
    description: 'Offensive and defensive cybersecurity CTF: Reverse engineering, binary exploitation, web pentesting, and cryptography.',
    registerLink: 'https://forms.gle/wXSWL32CWE9Vtnrt6',
    bannerImg: 'https://sa-fet.github.io/Jain-Events-Portal/infinity-2026/assets/brochure/27-of-44.webp',
    tags: ['CTF', 'Ethical Hacking', 'Cyber Security', 'Pentesting']
  },

  // --- INDUCTION & ORIENTATION PROGRAM EVENTS (FOR NEW STUDENTS) ---
  {
    id: 'orientation-induction-main',
    name: 'Student Induction & Orientation 2026',
    category: 'Induction',
    club: 'FET Academic Senate & Student Council',
    date: '18th – 20th August 2026',
    rawDate: '2026-08-18',
    venue: 'Main Auditorium & Engineering Blocks',
    description: 'Official academic orientation, dean addresses, departmental laboratory orientations, faculty mentor introductions, and curriculum briefing.',
    tags: ['Orientation', 'Freshers', 'Campus Tour', 'Dean Address']
  },
  {
    id: 'play-perform-auditions',
    name: 'Play & Perform — Club Auditions & Sports Selections',
    category: 'Induction',
    club: 'Cultural & Sports Councils',
    date: '21st – 24th August 2026',
    rawDate: '2026-08-21',
    venue: 'Olympic Sports Complex & Cultural Arenas',
    description: 'Annual tryouts and selections for newly admitted students to join official university sports squads (Cricket, Basketball, Swimming) and cultural teams (Symphony, Dance, Fashion, Dramatics, Coding).',
    tags: ['Auditions', 'Clubs', 'Sports Selection', 'Sprint Complex']
  },
  {
    id: 'lateral-induction-bridge',
    name: 'Lateral Entry Induction & Bridge Modules',
    category: 'Induction',
    club: 'Department of Computer Science & Engineering',
    date: '22nd – 24th August 2026',
    rawDate: '2026-08-22',
    venue: 'Seminar Hall 111, Kanakapura Campus',
    description: 'Specialized transition briefing for diploma holders entering 3rd semester. Covers bridge credit waivers, course mapping, semester 3 timetable synchronization, and placement roadmap.',
    tags: ['Lateral Entry', 'Bridge Courses', 'Sem 3', 'AIML-A']
  }
];

export function getEventsByCategory(category: string): TimelineEvent[] {
  if (category === 'All') return FET_TIMELINE_EVENTS;
  return FET_TIMELINE_EVENTS.filter((e) => e.category === category);
}
