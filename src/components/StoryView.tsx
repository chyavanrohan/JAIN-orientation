import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  Building2, 
  Trophy, 
  Compass, 
  BookOpen, 
  Sparkles, 
  MapPin, 
  ExternalLink,
  Users,
  Award,
  Cpu,
  Globe2,
  ChevronRight,
  Layers,
  Eye,
  Search,
  Quote,
  TrendingUp,
  CheckCircle2,
  Briefcase,
  Zap,
  ArrowUpRight,
  Camera,
  X,
  Maximize2,
  Image as ImageIcon,
  Bed,
  DollarSign,
  Utensils,
  HeartPulse,
  Phone,
  Mail,
  Clock,
  Calendar
} from 'lucide-react';
import { LithosSpotlightHero } from './LithosSpotlightHero';
import { JainLogo } from './JainLogo';
import { LiveCampusWidget } from './LiveCampusWidget';

interface StoryViewProps {
  onBackToHome: () => void;
  onOpenOrientation: () => void;
  onOpenHostel?: () => void;
  onOpenTimetable?: () => void;
}

interface RecruiterPartner {
  id: string;
  name: string;
  category: 'Tech & AI' | 'Core & Automotive' | 'Consulting & Finance' | 'Global IT';
  roles: string;
  package: string;
  highlight: string;
  brandColor: string;
  logo: React.ReactNode;
}

const RECRUITERS: RecruiterPartner[] = [
  {
    id: 'google',
    name: 'Google',
    category: 'Tech & AI',
    roles: 'Software Engineer • AI Research • Cloud Architect',
    package: '₹85.08 LPA Top Tier',
    highlight: 'Global R&D and Cloud Intelligence Centers',
    brandColor: 'border-blue-500/40 hover:bg-blue-950/20',
    logo: (
      <svg className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
      </svg>
    )
  },
  {
    id: 'amazon',
    name: 'Amazon',
    category: 'Tech & AI',
    roles: 'AWS SDE • Distributed Systems • Machine Learning',
    package: '₹45+ LPA',
    highlight: 'Direct AWS & Kindle Core Engineering Hiring',
    brandColor: 'border-amber-500/40 hover:bg-amber-950/20',
    logo: (
      <svg className="w-12 h-10 text-[#FF9900] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.82 9.57c-1.35 0-2.86.32-3.82 1.02-.32.23-.39.46-.18.73.18.23.4.4.7.19.82-.55 1.95-.82 3.12-.82 1.83 0 2.58.78 2.58 2.18v.45c-.8.15-2.07.38-3.32.61-2.07.38-3.8.96-3.8 2.87 0 1.5 1.15 2.45 2.72 2.45 1.48 0 2.58-.59 3.4-1.63h.14v1.31c0 .24.18.38.4.38h1.83c.23 0 .39-.14.39-.38v-6.38c0-2.22-1.48-3.18-4.26-3.18zm1.09 5.89c0 .87-.68 1.47-1.66 1.47-.84 0-1.35-.43-1.35-1.07 0-.75.63-1.12 1.83-1.33.45-.08.82-.17 1.18-.28v1.21zm1.02 1.63c-2.83 2.08-6.93 3.19-10.43 3.19-4.91 0-9.28-1.81-12.61-4.83-.26-.24-.03-.57.29-.38 4.02 2.37 8.94 3.79 14.03 3.79 3.1 0 6.41-.58 9.42-1.8.46-.18.84.28.3.61zm1.96-1.41c.37-.47 1.21-1.09 1.68-1.52.12-.11.23-.01.17.13-.39 1.01-1.03 2.45-1.31 3.14-.06.15-.22.18-.33.06-.82-.87-2.38-1.31-3.23-1.47-.14-.03-.12-.23.03-.23.95.03 2.22.38 2.99.89z" />
      </svg>
    )
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    category: 'Tech & AI',
    roles: 'Azure Cloud • Security • Applied AI Engineer',
    package: '₹51.5 LPA',
    highlight: 'IDC Campus Hiring & Tech Challenge Winners',
    brandColor: 'border-blue-400/40 hover:bg-sky-950/20',
    logo: (
      <div className="grid grid-cols-2 gap-1 w-9 h-9 transition-transform duration-300 group-hover:scale-110">
        <div className="bg-[#F25022] rounded-xs" />
        <div className="bg-[#7FBA00] rounded-xs" />
        <div className="bg-[#00A4EF] rounded-xs" />
        <div className="bg-[#FFB900] rounded-xs" />
      </div>
    )
  },
  {
    id: 'texas-instruments',
    name: 'Texas Instruments',
    category: 'Core & Automotive',
    roles: 'VLSI Engineer • Hardware Design • Microcontrollers',
    package: '₹38 LPA',
    highlight: 'Premier Hardware & Semiconductor R&D Recruiter',
    brandColor: 'border-red-500/40 hover:bg-red-950/20',
    logo: (
      <svg className="w-12 h-8 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 80 30">
        <rect width="80" height="30" rx="5" fill="#CC0000" />
        <text x="40" y="21" textAnchor="middle" fill="#FFFFFF" fontWeight="900" fontSize="16" letterSpacing="1" fontFamily="sans-serif">TI</text>
      </svg>
    )
  },
  {
    id: 'mercedes',
    name: 'Mercedes-Benz',
    category: 'Core & Automotive',
    roles: 'EV Powertrain • Autonomous Driving • Telematics',
    package: '₹28 LPA',
    highlight: 'R&D Research Center India (MBRDI) Partner',
    brandColor: 'border-slate-300/40 hover:bg-slate-800/30',
    logo: (
      <svg className="w-10 h-10 text-white transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2v10M12 12l-8.66 5M12 12l8.66 5" />
      </svg>
    )
  },
  {
    id: 'bosch',
    name: 'Bosch',
    category: 'Core & Automotive',
    roles: 'Embedded Systems • Robotics • Smart Mobility',
    package: '₹22 LPA',
    highlight: 'Bosch Center of Excellence on Campus',
    brandColor: 'border-red-500/40 hover:bg-red-950/20',
    logo: (
      <svg className="w-20 h-8 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 100 35">
        <rect width="100" height="35" rx="5" fill="#EA1B2D" />
        <text x="50" y="23" textAnchor="middle" fill="#FFFFFF" fontWeight="900" fontSize="16" letterSpacing="1" fontFamily="sans-serif">BOSCH</text>
      </svg>
    )
  },
  {
    id: 'deloitte',
    name: 'Deloitte',
    category: 'Consulting & Finance',
    roles: 'Technology Consulting • Cybersecurity • Risk Advisory',
    package: '₹18 LPA',
    highlight: 'Annual Campus Recruitment Drive Leader',
    brandColor: 'border-lime-500/40 hover:bg-lime-950/20',
    logo: (
      <svg className="w-24 h-8 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 120 30">
        <text x="0" y="22" fill="#FFFFFF" fontWeight="800" fontSize="20" fontFamily="'Plus Jakarta Sans', sans-serif">Deloitte.</text>
        <circle cx="84" cy="20" r="3" fill="#86BC25" />
      </svg>
    )
  },
  {
    id: 'ibm',
    name: 'IBM',
    category: 'Global IT',
    roles: 'Quantum Computing • Mainframe • AI Solutions',
    package: '₹24 LPA',
    highlight: 'IBM Software Lab & Industry Collaborator',
    brandColor: 'border-blue-600/40 hover:bg-blue-900/30',
    logo: (
      <svg className="w-16 h-8 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 80 30">
        <rect width="80" height="30" rx="5" fill="#052FAD" />
        <text x="40" y="21" textAnchor="middle" fill="#FFFFFF" fontWeight="900" fontSize="16" letterSpacing="2" fontFamily="sans-serif">IBM</text>
      </svg>
    )
  },
  {
    id: 'accenture',
    name: 'Accenture',
    category: 'Global IT',
    roles: 'Full Stack Engineer • Cloud Transformation • DevOps',
    package: '₹16 LPA',
    highlight: 'High-Volume Hiring with Fast Track Promotions',
    brandColor: 'border-purple-500/40 hover:bg-purple-950/20',
    logo: (
      <svg className="w-24 h-8 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 120 30">
        <text x="0" y="22" fill="#A100FF" fontWeight="800" fontSize="20" fontFamily="'Plus Jakarta Sans', sans-serif">accenture</text>
        <path d="M102 8l8 6-8 6" stroke="#A100FF" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: 'infosys',
    name: 'Infosys',
    category: 'Global IT',
    roles: 'Specialist Programmer • Digital Specialist Engineer',
    package: '₹15 LPA',
    highlight: 'Campus Placement Excellence Award Winner',
    brandColor: 'border-cyan-500/40 hover:bg-cyan-950/20',
    logo: (
      <svg className="w-20 h-8 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 100 30">
        <rect width="100" height="30" rx="5" fill="#007CC3" />
        <text x="50" y="21" textAnchor="middle" fill="#FFFFFF" fontWeight="800" fontSize="16" fontFamily="sans-serif">Infosys</text>
      </svg>
    )
  },
  {
    id: 'tcs',
    name: 'TCS',
    category: 'Global IT',
    roles: 'TCS Innovator • Digital Cadre • R&D Engineer',
    package: '₹14 LPA',
    highlight: 'Longest Standing Corporate Training Partner',
    brandColor: 'border-indigo-500/40 hover:bg-indigo-950/20',
    logo: (
      <svg className="w-16 h-8 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 80 30">
        <rect width="80" height="30" rx="5" fill="#1C3F94" />
        <text x="40" y="21" textAnchor="middle" fill="#FFFFFF" fontWeight="900" fontSize="16" letterSpacing="2" fontFamily="sans-serif">TCS</text>
      </svg>
    )
  },
  {
    id: 'wipro',
    name: 'Wipro',
    category: 'Global IT',
    roles: 'Turbo Engineer • Cyber Security • Enterprise Systems',
    package: '₹14 LPA',
    highlight: 'Wipro Earthian & Innovation Challenge Partner',
    brandColor: 'border-emerald-400/40 hover:bg-emerald-950/20',
    logo: (
      <svg className="w-20 h-8 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 100 30">
        <rect width="100" height="30" rx="5" fill="#004A8F" />
        <text x="50" y="21" textAnchor="middle" fill="#FFFFFF" fontWeight="800" fontSize="16" fontFamily="sans-serif">wipro</text>
      </svg>
    )
  },
  {
    id: 'cognizant',
    name: 'Cognizant',
    category: 'Global IT',
    roles: 'GenC Next • AI & Analytics • Cloud Engineer',
    package: '₹15 LPA',
    highlight: 'Exclusive Hackathon & Pre-placement Offers',
    brandColor: 'border-teal-500/40 hover:bg-teal-950/20',
    logo: (
      <svg className="w-24 h-8 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 120 30">
        <rect width="120" height="30" rx="5" fill="#0033A0" />
        <text x="60" y="21" textAnchor="middle" fill="#FFFFFF" fontWeight="800" fontSize="15" fontFamily="sans-serif">Cognizant</text>
      </svg>
    )
  },
  {
    id: 'pwc',
    name: 'PwC',
    category: 'Consulting & Finance',
    roles: 'Technology Consulting • Data Analytics • Cloud Advisory',
    package: '₹17.5 LPA',
    highlight: 'Strategic FinTech & Digital Advisory Hiring',
    brandColor: 'border-orange-500/40 hover:bg-orange-950/20',
    logo: (
      <svg className="w-16 h-8 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 80 30">
        <rect width="80" height="30" rx="5" fill="#D04A02" />
        <text x="40" y="21" textAnchor="middle" fill="#FFFFFF" fontWeight="900" fontSize="18" fontFamily="sans-serif">pwc</text>
      </svg>
    )
  },
  {
    id: 'goldman-sachs',
    name: 'Goldman Sachs',
    category: 'Consulting & Finance',
    roles: 'Quantitative Strategist • FinTech Software Engineering',
    package: '₹34 LPA',
    highlight: 'High Impact Financial Tech Engineering Hiring',
    brandColor: 'border-sky-500/40 hover:bg-sky-950/20',
    logo: (
      <svg className="w-24 h-10 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 120 40">
        <rect width="120" height="40" rx="5" fill="#7399C6" />
        <text x="60" y="18" textAnchor="middle" fill="#FFFFFF" fontWeight="800" fontSize="11" fontFamily="sans-serif">Goldman</text>
        <text x="60" y="32" textAnchor="middle" fill="#FFFFFF" fontWeight="800" fontSize="11" fontFamily="sans-serif">Sachs</text>
      </svg>
    )
  },
  {
    id: 'lnt',
    name: 'L&T Tech Services',
    category: 'Core & Automotive',
    roles: 'Smart Cities • Aero Structures • Mechatronics',
    package: '₹20 LPA',
    highlight: 'Engineering Design & Embedded Systems Leader',
    brandColor: 'border-yellow-500/40 hover:bg-yellow-950/20',
    logo: (
      <svg className="w-16 h-8 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 80 30">
        <rect width="80" height="30" rx="5" fill="#00529B" />
        <text x="40" y="21" textAnchor="middle" fill="#FFFFFF" fontWeight="900" fontSize="16" fontFamily="sans-serif">L&T</text>
      </svg>
    )
  }
];

export const StoryView: React.FC<StoryViewProps> = ({ 
  onBackToHome, 
  onOpenOrientation,
  onOpenHostel,
  onOpenTimetable
}) => {
  const [viewMode, setViewMode] = useState<'lithos' | 'campus'>('campus');
  const [activeSection, setActiveSection] = useState<'overview' | 'academics' | 'facilities' | 'hostels' | 'gallery' | 'placements' | 'life'>('overview');
  
  // Recruiter Search & Filter state
  const [recruiterFilter, setRecruiterFilter] = useState<string>('All');
  const [recruiterSearch, setRecruiterSearch] = useState<string>('');
  const [selectedRecruiter, setSelectedRecruiter] = useState<RecruiterPartner | null>(null);

  // Gallery & Lightbox state
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<{
    url: string;
    title: string;
    category: string;
    desc: string;
  } | null>(null);
  const [galleryFilter, setGalleryFilter] = useState<string>('All');

  const filteredRecruiters = RECRUITERS.filter((r) => {
    const matchesCategory = recruiterFilter === 'All' || r.category === recruiterFilter;
    const matchesSearch = r.name.toLowerCase().includes(recruiterSearch.toLowerCase()) ||
                          r.roles.toLowerCase().includes(recruiterSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const programs = [
    { name: 'Computer Science & Engineering', tag: 'Core', desc: 'Focus on cloud computing, full-stack, software engineering, and distributed systems.' },
    { name: 'AI & Machine Learning', tag: 'Specialization', desc: 'Neural networks, deep learning, computer vision, and generative AI systems.' },
    { name: 'Data Science', tag: 'Specialization', desc: 'Big data analytics, predictive modeling, statistical learning, and business intelligence.' },
    { name: 'Cyber Security', tag: 'Specialization', desc: 'Ethical hacking, network security, cryptography, and cloud infrastructure security.' },
    { name: 'Aerospace Engineering', tag: 'Core', desc: 'Aerodynamics, propulsion systems, avionics, and space technology exploration.' },
    { name: 'Robotics & Automation', tag: 'Interdisciplinary', desc: 'Mechatronics, industrial automation, autonomous mobile robots, and AI control.' },
    { name: 'Electronics & Communication', tag: 'Core', desc: 'VLSI design, embedded systems, IoT architecture, and 5G/6G wireless communications.' },
    { name: 'Mechanical Engineering', tag: 'Core', desc: 'CAD/CAM, smart manufacturing, renewable energy systems, and thermal engineering.' },
    { name: 'Civil Engineering', tag: 'Core', desc: 'Structural design, sustainable urban infrastructure, and smart city technologies.' },
  ];

  const highlights = [
    { icon: Award, label: 'Accreditation', value: 'NAAC A++ Grade' },
    { icon: Building2, label: 'Campus Area', value: '300+ Acres Global Campus' },
    { icon: Trophy, label: 'Highest Package', value: '₹85.08 LPA' },
    { icon: Users, label: 'Placement Rate', value: '95%+ Consecutive' },
    { icon: Globe2, label: 'Global Tie-ups', value: '50+ International Universities' },
  ];

  const campusPhotos = [
    {
      title: 'JU SET Main Academic Facade',
      category: 'Campus Architecture',
      url: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop',
      desc: '300+ Acre eco-friendly Kanakapura Global Campus building surrounded by lush lawns and tropical foliage.'
    },
    {
      title: 'NVIDIA AI & High Performance Computing Lab',
      category: 'Advanced Labs',
      url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop',
      desc: 'State-of-the-art AI supercomputing node for machine learning, deep neural network training, and computer vision.'
    },
    {
      title: 'JU Incubation Centre (JU-CEIEE)',
      category: 'Incubation & Startups',
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
      desc: 'Dedicated startup accelerator and innovation workspace providing seed capital and mentorship to student founders.'
    },
    {
      title: 'Sprint Olympic Sports Complex & Aquatics',
      category: 'Sports Arena',
      url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop',
      desc: 'World-class sports infrastructure featuring multi-sport courts, indoor arena, gymnasium, and athletic tracks.'
    },
    {
      title: 'Central Knowledge Hub & Digital Library',
      category: 'Academic Facilities',
      url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop',
      desc: 'Multi-tiered quiet study zone and digital repository connected to IEEE Xplore, ScienceDirect, and global journals.'
    },
    {
      title: 'Computer Science & Software Studio',
      category: 'Advanced Labs',
      url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop',
      desc: 'High-speed fiber-networked workstations for full-stack software development, DevOps, and cloud engineering.'
    },
    {
      title: 'Kanakapura Global Campus Residential Towers (JU Hostels)',
      category: 'Student Housing',
      url: 'https://www.jainuniversity.ac.in/jain/theme/assets/images/contact/JGI-hostel2.jpg',
      desc: 'Official on-campus residential halls at JAIN Global Campus with separate blocks for boys and girls and 24/7 security.'
    },
    {
      title: 'Residential Suites & Furnished Student Rooms',
      category: 'Student Housing',
      url: 'https://www.jainuniversity.ac.in/jain/theme/assets/images/contact/hostel-01.jpg',
      desc: 'Bedrooms with en-suite bathrooms, well-ventilated and spacious, furnished with cot, bed, storage cupboards, study tables and chairs.'
    },
    {
      title: 'Hostel Dining & Healthy Meal Platters',
      category: 'Campus Dining',
      url: 'https://www.jainuniversity.ac.in/jain/theme/assets/images/contact/hostel-04.jpg',
      desc: 'Delicious and healthy food for a variety of platters: breakfast, lunch, evening snacks, and dinner with cleanliness and variety.'
    },
    {
      title: 'Housekeeping & Care Services in Hostels',
      category: 'Student Housing',
      url: 'https://www.jainuniversity.ac.in/jain/theme/assets/images/contact/housekeeping.jpg',
      desc: 'Designated housekeeping staff for each hall of residence ensuring daily cleanliness, hygiene, and comfort.'
    },
    {
      title: 'Smart Tech Amphitheatre Auditorium',
      category: 'Campus Architecture',
      url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop',
      desc: 'Acoustically tuned venue hosting global tech summits, guest lectures, cultural fests, and hackathons.'
    }
  ];

  const filteredPhotos = campusPhotos.filter((p) => {
    return galleryFilter === 'All' || p.category === galleryFilter;
  });

  const facilities = [
    { 
      title: 'JU Incubation Centre (JU-CEIEE)', 
      desc: 'State-of-the-art incubation hub providing seed funding, mentorship, and prototyping labs for student entrepreneurs.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
      category: 'Incubation'
    },
    { 
      title: 'Sprint Sports Complex', 
      desc: 'World-class sporting facilities featuring an Olympic-grade running track, swimming pool, basketball courts, and indoor sports arena.',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop',
      category: 'Sports'
    },
    { 
      title: 'Advanced AI & Supercomputing Labs', 
      desc: 'Specialized research centers equipped with NVIDIA GPUs, Aerodynamics Wind Tunnels, VLSI testing, and Nano-tech labs.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop',
      category: 'Research'
    },
    { 
      title: 'Central Knowledge Hub', 
      desc: 'Extensive multi-story digital library with direct subscription to IEEE, Springer, ScienceDirect, and global research databases.',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop',
      category: 'Library'
    },
    { 
      title: 'On-Campus Residential Hostels (JU-FET)', 
      desc: 'Over 2,400+ students across 15 hostel blocks with attached washrooms, Sodexo 4-meal daily dining, ₹3 Lakh medical insurance, 24/7 ambulance, wardens (1:100), and fiber Wi-Fi.',
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=800&auto=format&fit=crop',
      category: 'Housing'
    },
    { 
      title: 'Sodexo Central Dining Hall', 
      desc: 'Multi-cuisine pure vegetarian dining with four daily meals (breakfast, lunch, evening snacks, dinner) operated by Sodexo.',
      image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?q=80&w=800&auto=format&fit=crop',
      category: 'Dining'
    },
    { 
      title: 'Innovation & Drone Sandbox', 
      desc: '3D printing facilities, CNC machinery, autonomous drone flight testing zones, and IoT sensor sandbox environments.',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop',
      category: 'Innovation'
    },
  ];

  const scrollToDetails = () => {
    const el = document.getElementById('campus-story-details');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full min-h-screen bg-black text-white relative animate-fadeIn selection:bg-white selection:text-black">
      {/* 1. Top Spotlight Hero Section */}
      <LithosSpotlightHero
        onBackToHome={onBackToHome}
        onSwitchToCampusStory={scrollToDetails}
        onOpenOrientation={onOpenOrientation}
      />

      {/* 2. Seamless Campus Story Details Section */}
      <div id="campus-story-details" className="relative z-20 w-full bg-gradient-to-b from-black via-zinc-950 to-black text-white pt-2 pb-24">
        {/* Top subtle radial glow for smooth visual transition */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 bg-radial from-amber-500/10 via-white/5 to-transparent blur-3xl pointer-events-none -z-10" />

        {/* Sticky Secondary Navigation Header for Campus Sections */}
        <header className="sticky top-0 z-40 px-6 md:px-12 py-3.5 flex items-center justify-between bg-black/90 border-b border-white/15 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onBackToHome}
              className="text-left select-none hover:opacity-90 transition-opacity cursor-pointer bg-transparent border-0 p-0"
            >
              <JainLogo size="sm" />
            </button>
            <button
              type="button"
              onClick={onBackToHome}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-gray-200 transition-all cursor-pointer border border-white/10"
            >
              ← Back to Home
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            {onOpenTimetable && (
              <button
                type="button"
                onClick={onOpenTimetable}
                className="bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/40 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5 font-grotesk tracking-wide"
              >
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>All Timetables</span>
              </button>
            )}
            <button
              type="button"
              onClick={onOpenOrientation}
              className="bg-white text-black hover:bg-gray-100 px-4 py-1.5 rounded-full text-xs font-extrabold transition-all shadow-md hover:scale-[1.02] active:scale-98 cursor-pointer font-grotesk uppercase tracking-wider"
            >
              Orientation Prog
            </button>
          </div>
        </header>

        {/* Live Real-Time Campus Weather, IST Clock & Ambient Soundscape Widget */}
        <div className="mb-8 rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
          <LiveCampusWidget />
        </div>

        <div className="px-6 md:px-12 lg:px-16 pt-2 max-w-7xl mx-auto">
          {/* Editorial Header Banner */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="liquid-glass rounded-3xl p-8 md:p-12 mb-10 border border-white/20 bg-gradient-to-br from-black/90 via-black/80 to-black/95 shadow-2xl"
          >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="inline-flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-full text-xs md:text-sm font-bold backdrop-blur-md border border-white/20 font-grotesk tracking-wider uppercase text-gray-200">
            <Sparkles className="w-4 h-4 text-white animate-pulse" />
            <span>School of Engineering and Technology (SET)</span>
          </div>

          <a
            href="https://set.jainuniversity.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs md:text-sm text-gray-300 hover:text-white transition-colors underline-offset-4 hover:underline font-medium"
          >
            <span>Visit Official Portal</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Official JAIN (Deemed-to-be University) Logo */}
        <div className="mb-6">
          <JainLogo size="xl" />
        </div>

        <p className="text-lg md:text-2xl font-light text-gray-300 max-w-4xl mb-8 leading-relaxed">
          Kanakapura Road 300+ Acre Global Campus — <em className="font-playfair italic font-medium text-white">Shaping visionary engineers, technological pioneers, and global industry leaders.</em>
        </p>

        {/* Editorial Quote Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="p-5 md:p-6 rounded-2xl bg-white/5 border border-white/15 mb-8 flex gap-4 items-start relative overflow-hidden"
        >
          <Quote className="w-8 h-8 text-white/30 shrink-0 mt-1" />
          <div>
            <p className="text-sm md:text-base font-playfair italic text-gray-200 leading-relaxed">
              "Engineering at JAIN SET is not merely an academic discipline — it is a transformative launchpad where curiosity meets cutting-edge industry research, hands-on incubation, and global ethics."
            </p>
            <p className="text-xs text-gray-400 font-grotesk tracking-wider uppercase mt-2 font-semibold">
              — Academic Senate • JAIN (Deemed-to-be University)
            </p>
          </div>
        </motion.div>

        {/* Highlight Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 pt-6 border-t border-white/15"
        >
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex flex-col">
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-1 font-grotesk tracking-wider uppercase font-semibold">
                  <Icon className="w-3.5 h-3.5 text-white" />
                  <span>{item.label}</span>
                </div>
                <span className="text-base md:text-lg font-black text-white font-grotesk tracking-tight">{item.value}</span>
              </div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Sub Navigation Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-wrap items-center gap-2 mb-10 border-b border-white/15 pb-4"
      >
        {[
          { id: 'overview', label: 'Overview & Ethos', icon: Compass },
          { id: 'academics', label: 'Academic Programs', icon: GraduationCap },
          { id: 'facilities', label: 'Campus & Infrastructure', icon: Building2 },
          { id: 'hostels', label: 'Hostel Accommodation', icon: Bed },
          { id: 'gallery', label: 'Photo Gallery & Media', icon: Camera },
          { id: 'placements', label: 'Placements & Recruiters', icon: Trophy },
          { id: 'life', label: 'Campus Life & Innovation', icon: BookOpen },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer font-grotesk tracking-wide ${
                isActive
                  ? 'bg-white text-black font-extrabold shadow-lg scale-[1.02]'
                  : 'liquid-glass text-gray-300 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </motion.div>

      {/* Content Sections */}
      {activeSection === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
              className="liquid-glass rounded-3xl p-8 md:p-10 border border-white/15"
            >
              <span className="text-xs font-bold font-grotesk text-gray-400 uppercase tracking-widest block mb-2">Campus Profile</span>
              <h2 className="text-3xl md:text-4xl font-playfair italic font-bold mb-6 text-white leading-tight">
                About SET Kanakapura Global Campus
              </h2>

              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-5 font-normal">
                The School of Engineering and Technology (SET) at JAIN (Deemed-to-be University) is situated on a sprawling 300+ acre lush green Global Campus along Kanakapura Road, Bengaluru. Designed to foster intellectual curiosity and industry relevance, SET integrates cutting-edge engineering curriculum with hands-on research and entrepreneurial incubation.
              </p>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8">
                Accredited with <strong className="text-white font-semibold">NAAC A++ Grade</strong> and recognized globally for academic rigor, SET provides an environment where technology meets vision. Students work alongside renowned faculty, engage with industry mentors, and turn high-impact ideas into real-world applications.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-6 border-t border-white/10">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                  <div className="flex items-center gap-2 text-white font-bold mb-2">
                    <Zap className="w-4 h-4 text-white" />
                    <span className="font-grotesk tracking-wide uppercase text-sm">Empowering Visionaries</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Interdisciplinary learning model combining technical expertise, human values, and leadership training.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                  <div className="flex items-center gap-2 text-white font-bold mb-2">
                    <Cpu className="w-4 h-4 text-white" />
                    <span className="font-grotesk tracking-wide uppercase text-sm">Industry 4.0 Ready</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Curriculum aligned with global tech benchmarks in AI, Robotics, Cyber Security, VLSI, and Aerospace.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Campus Location Details */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="liquid-glass rounded-3xl p-8 border border-white/15"
            >
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-amber-400" />
                <h2 className="text-2xl font-playfair italic font-bold text-white">Campus Location & Landmarks</h2>
              </div>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-5">
                JAIN Global Campus, 45th km, NH-209, Jakkasandra Post, Kanakapura Taluk, Ramanagara District, Bengaluru, Karnataka - 562112.
              </p>

              {/* Key Campus Landmarks */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs">
                  <span className="font-bold text-white block mb-0.5">🏛️ Engineering Block</span>
                  <span className="text-gray-400 text-[11px]">CS, AI/ML, Aerospace & Robotics Labs</span>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs">
                  <span className="font-bold text-white block mb-0.5">⚽ Olympic Sports Complex</span>
                  <span className="text-gray-400 text-[11px]">Cricket Stadium, Pools & Courts</span>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs">
                  <span className="font-bold text-white block mb-0.5">🚀 JU Incubation Center</span>
                  <span className="text-gray-400 text-[11px]">50+ Nurtured Tech Startups</span>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs">
                  <span className="font-bold text-white block mb-0.5">🏡 On-Campus Residencies</span>
                  <span className="text-gray-400 text-[11px]">Eco-Friendly Student Hostels</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2 border-t border-white/10">
                <a
                  href="https://maps.google.com/?q=Jain+University+Kanakapura+Campus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-black hover:bg-gray-200 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all border border-white/20 font-grotesk tracking-wider uppercase shadow-md cursor-pointer"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Open Location in Google Maps</span>
                </a>
                <a
                  href="https://maps.google.com/?q=12.6858,77.4939&t=k&z=17"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-amber-400/10 text-amber-300 hover:bg-amber-400/20 px-5 py-2.5 rounded-xl text-xs font-bold transition-all border border-amber-400/30 font-grotesk tracking-wider uppercase cursor-pointer"
                >
                  <Globe2 className="w-4 h-4 text-amber-400" />
                  <span>Direct Satellite View</span>
                </a>
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="liquid-glass rounded-3xl p-6 md:p-8 border border-white/15"
            >
              <h3 className="text-xl font-playfair italic font-bold mb-5 text-white">Quick Admissions & Orientation</h3>
              <div className="space-y-3.5">
                <button
                  type="button"
                  onClick={onOpenOrientation}
                  className="w-full bg-white text-black py-3.5 px-5 rounded-xl font-extrabold text-xs uppercase tracking-wider font-grotesk hover:bg-gray-200 transition-all flex items-center justify-between cursor-pointer shadow-lg"
                >
                  <span>Orientation Schedule</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onBackToHome}
                  className="w-full liquid-glass text-white py-3.5 px-5 rounded-xl font-extrabold text-xs uppercase tracking-wider font-grotesk hover:bg-white/10 transition-all flex items-center justify-between border border-white/20 cursor-pointer"
                >
                  <span>Back to Video Hero</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="liquid-glass rounded-3xl p-6 md:p-8 border border-white/15"
            >
              <h3 className="text-xl font-playfair italic font-bold mb-4 text-white">Why Choose JAIN SET?</h3>
              <ul className="space-y-3 text-xs md:text-sm text-gray-300 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <span><strong className="text-white">NAAC A++ accreditation</strong> with top NIRF ranking tier.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <span><strong className="text-white">300+ acre eco-friendly campus</strong> with Olympic sports complex.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <span><strong className="text-white">Active JU Incubation Center</strong> with over 50+ nurtured startups.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <span><strong className="text-white">Global University tie-ups</strong> across USA, Europe, and Asia.</span>
                </li>
              </ul>
            </motion.div>

            {/* Live Campus Satellite View Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="liquid-glass rounded-3xl p-6 md:p-8 border border-white/15 overflow-hidden space-y-4 shadow-2xl relative"
            >
              <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <Globe2 className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg md:text-xl font-playfair italic font-bold text-white">
                    Campus Satellite View
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider text-emerald-300 font-grotesk">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Live Satellite
                </span>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed">
                300+ Acre JAIN Global Campus Aerial Imagery (NH-209 Kanakapura Road, Bengaluru).
              </p>

              {/* Interactive Satellite Embed Container */}
              <div className="relative w-full h-64 md:h-72 rounded-2xl overflow-hidden border border-white/20 bg-black group shadow-inner">
                <iframe
                  title="JAIN SET Campus Satellite Map"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'contrast(1.08) brightness(0.95)' }}
                  loading="lazy"
                  allowFullScreen
                  src="https://maps.google.com/maps?q=Jain+Deemed-to-be+University+Faculty+of+Engineering+and+Technology+Kanakapura+Road+Bengaluru&t=k&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full object-cover"
                />

                {/* Satellite Lens Overlay Details */}
                <div className="absolute top-2.5 left-2.5 z-10 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20 text-[10px] font-mono text-amber-300 flex items-center gap-1.5 shadow-md">
                  <Compass className="w-3 h-3 text-amber-400" />
                  <span>12.6858° N, 77.4939° E</span>
                </div>

                <div className="absolute bottom-2.5 right-2.5 z-10 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-[10px] font-extrabold text-white flex items-center gap-1.5 shadow-lg">
                  <Layers className="w-3.5 h-3.5 text-blue-400" />
                  <span>Kanakapura Global Campus</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-grotesk">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Interactive High-Res Imagery</span>
                </div>

                <a
                  href="https://maps.google.com/?q=12.6858,77.4939&t=k&z=17"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 hover:text-amber-200 transition-colors"
                >
                  <span>Full Satellite</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {activeSection === 'academics' && (
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="liquid-glass rounded-3xl p-8 md:p-10 border border-white/15"
          >
            <span className="text-xs font-bold font-grotesk text-gray-400 uppercase tracking-widest block mb-2">Curriculum Excellence</span>
            <h2 className="text-3xl md:text-4xl font-playfair italic font-bold text-white mb-3">Academic Engineering Programs</h2>
            <p className="text-gray-300 text-base max-w-3xl mb-8">
              Offering industry-designed B.Tech, M.Tech, and Ph.D. engineering degrees with practical learning frameworks and research publication tracks.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {programs.map((prog, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.45, delay: (idx % 6) * 0.08 }}
                  className="liquid-glass p-6 rounded-2xl border border-white/10 hover:border-white/30 transition-all group"
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-white/10 text-white border border-white/15 font-grotesk uppercase tracking-wider">
                      {prog.tag}
                    </span>
                    <Cpu className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gray-100">{prog.name}</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">{prog.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {activeSection === 'facilities' && (
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="liquid-glass rounded-3xl p-8 md:p-10 border border-white/15"
          >
            <span className="text-xs font-bold font-grotesk text-gray-400 uppercase tracking-widest block mb-2">Infrastructure & Labs</span>
            <h2 className="text-3xl md:text-4xl font-playfair italic font-bold text-white mb-3">World-Class Campus Ecosystem</h2>
            <p className="text-gray-300 text-base max-w-3xl mb-8">
              Designed to support immersive academic learning, research experimentation, and healthy campus living across 300+ acres.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {facilities.map((fac, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.45, delay: (idx % 6) * 0.08 }}
                  className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-white/30 transition-all group flex flex-col justify-between"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-zinc-900">
                    <img 
                      src={fac.image} 
                      alt={fac.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-amber-300 border border-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {fac.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedGalleryImage({ url: fac.image, title: fac.title, category: fac.category, desc: fac.desc })}
                      className="absolute bottom-3 right-3 p-2 rounded-full bg-black/80 text-white hover:bg-white hover:text-black border border-white/20 transition-all cursor-pointer opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
                      title="Expand High-Res Photo"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-200 transition-colors">{fac.title}</h3>
                      <p className="text-xs text-gray-300 leading-relaxed mb-4">{fac.desc}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedGalleryImage({ url: fac.image, title: fac.title, category: fac.category, desc: fac.desc })}
                      className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/15 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                      <span>View Full Image & Details</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Live Lab & Supercomputing Telemetry Monitor */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block font-bold">● System Telemetry Online</span>
                  <h3 className="text-xl font-playfair italic font-bold text-white">Live High-Performance Lab Clusters</h3>
                </div>
                <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-full text-xs font-bold text-emerald-300">
                  <Zap className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>All 80+ Specialized Labs Active</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-black/60 border border-white/15">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white font-grotesk">NVIDIA AI GPU Supercluster</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                  <div className="text-2xl font-mono font-bold text-emerald-400 mb-1">98.2% <span className="text-xs text-gray-400 font-normal">Capacity</span></div>
                  <p className="text-[11px] text-gray-400">Deep Learning & LLM Fine-Tuning Jobs Active</p>
                </div>

                <div className="p-4 rounded-2xl bg-black/60 border border-white/15">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white font-grotesk">Supersonic Wind Tunnel</span>
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  </div>
                  <div className="text-2xl font-mono font-bold text-cyan-400 mb-1">Mach 2.2 <span className="text-xs text-gray-400 font-normal">Flow</span></div>
                  <p className="text-[11px] text-gray-400">Aerospace Airfoil Aerodynamic Testing</p>
                </div>

                <div className="p-4 rounded-2xl bg-black/60 border border-white/15">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white font-grotesk">Autonomous Drone Sandbox</span>
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  </div>
                  <div className="text-2xl font-mono font-bold text-amber-400 mb-1">24 Active <span className="text-xs text-gray-400 font-normal">Rigs</span></div>
                  <p className="text-[11px] text-gray-400">Obstacle Avoidance Flight Simulations</p>
                </div>

                <div className="p-4 rounded-2xl bg-black/60 border border-white/15">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white font-grotesk">Texas Instruments VLSI Lab</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="text-2xl font-mono font-bold text-white mb-1">45nm <span className="text-xs text-emerald-400 font-normal">Wafer Design</span></div>
                  <p className="text-[11px] text-gray-400">Micro-controller & Embedded System Prototyping</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* HOSTEL ACCOMMODATION SECTION */}
      {activeSection === 'hostels' && (
        <div className="space-y-8 animate-fadeIn">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="liquid-glass rounded-3xl p-6 md:p-10 border border-white/15 space-y-8"
          >
            {/* Section Header */}
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/15 pb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-mono font-bold uppercase">
                    Official Residential Division
                  </span>
                  <span className="text-xs text-gray-400 font-mono">Academic Year 2026–27</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-playfair italic font-bold text-white mb-2">
                  Hostel Accommodation & Campus Living
                </h2>
                <p className="text-gray-300 text-sm max-w-2xl leading-relaxed">
                  JAIN SET Global Campus (Kanakapura Road) offers modern residential hostels for over 2,400+ students across 15 blocks with attached washrooms, Sodexo 4-meal daily dining, ₹3 Lakh medical insurance, and 24/7 wardens.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://www.jainuniversity.ac.in/contact/hostel-accomodation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-gray-200 hover:text-white transition-all flex items-center gap-1.5"
                >
                  <span>Official University Page</span>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                </a>

                {onOpenHostel && (
                  <button
                    type="button"
                    onClick={onOpenHostel}
                    className="px-5 py-2 rounded-xl bg-amber-400 text-black font-extrabold text-xs hover:bg-amber-300 transition-all cursor-pointer flex items-center gap-1.5 shadow-lg"
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Open Hostel Portal & Room Booking</span>
                  </button>
                )}
              </div>
            </div>

            {/* 4 Pillars Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[11px] text-gray-400 font-mono uppercase mb-1">Capacity</div>
                <div className="text-xl md:text-2xl font-bold text-white font-grotesk">2,400+ Students</div>
                <div className="text-[11px] text-emerald-400 mt-1">15 Dedicated Blocks</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[11px] text-gray-400 font-mono uppercase mb-1">Dining Partner</div>
                <div className="text-xl md:text-2xl font-bold text-white font-grotesk">Sodexo Catering</div>
                <div className="text-[11px] text-amber-300 mt-1">4 Meals • 100% Pure Veg</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[11px] text-gray-400 font-mono uppercase mb-1">Health Coverage</div>
                <div className="text-xl md:text-2xl font-bold text-white font-grotesk">₹3,00,000 / Student</div>
                <div className="text-[11px] text-red-400 mt-1">24/7 Dedicated Ambulance</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[11px] text-gray-400 font-mono uppercase mb-1">Pastoral Care</div>
                <div className="text-xl md:text-2xl font-bold text-white font-grotesk">1 : 100 Wardens</div>
                <div className="text-[11px] text-sky-400 mt-1">24/7 Manned Surveillance</div>
              </div>
            </div>

            {/* Official Fee Structure Table (2026–27) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-amber-400" />
                    Official Hostel Fee Structure (2026–27 Academic Year)
                  </h3>
                  <p className="text-xs text-gray-400">Faculty of Engineering & Technology (SET) — JAIN Global Campus Kanakapura</p>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full hidden sm:inline-block">
                  All-Inclusive Package
                </span>
              </div>

              <div className="overflow-x-auto border border-white/15 rounded-2xl bg-black/50">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-900 border-b border-white/15 text-gray-400 uppercase text-[10px] font-mono">
                    <tr>
                      <th className="py-3 px-4">Campus & Accommodation Type</th>
                      <th className="py-3 px-4">Gender</th>
                      <th className="py-3 px-4">Sharing Mode</th>
                      <th className="py-3 px-4">Washroom Facility</th>
                      <th className="py-3 px-4 text-right">Annual Fee (2026–27)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-gray-200">
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 font-semibold text-white">SET Global Campus (Kanakapura Road)</td>
                      <td className="py-3 px-4 text-emerald-400 font-bold">Girls Hostel</td>
                      <td className="py-3 px-4">Triple Sharing</td>
                      <td className="py-3 px-4">Attached En-Suite</td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-amber-300">₹1,90,000 /-</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 font-semibold text-white">SET Global Campus (Kanakapura Road)</td>
                      <td className="py-3 px-4 text-sky-400 font-bold">Boys Hostel</td>
                      <td className="py-3 px-4">Double Sharing</td>
                      <td className="py-3 px-4">Attached En-Suite</td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-amber-300">₹2,25,000 /-</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 font-semibold text-white">SET Global Campus (Kanakapura Road)</td>
                      <td className="py-3 px-4 text-sky-400 font-bold">Boys Hostel</td>
                      <td className="py-3 px-4">Triple Sharing</td>
                      <td className="py-3 px-4">Attached En-Suite</td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-amber-300">₹1,90,000 /-</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 font-semibold text-white">JAIN Approved Off-Campus Housing</td>
                      <td className="py-3 px-4 text-sky-400 font-bold">Boys Hostel</td>
                      <td className="py-3 px-4">Double Sharing</td>
                      <td className="py-3 px-4">Attached En-Suite</td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-amber-300">₹1,85,000 /-</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white">Refundable Caution Deposit:</span>
                    <span className="text-gray-300"> ₹10,000/- deposit refundable at completion of stay upon room inspection.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white">0% Interest EMI Available:</span>
                    <span className="text-gray-300"> Flexible monthly fee payments through LiquiLoans and university banking partners.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Official Photo Gallery */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Bed className="w-5 h-5 text-amber-400" />
                    Residential Facilities Photo Tour
                  </h3>
                  <p className="text-xs text-gray-400">Verified photography from JAIN Global Campus Kanakapura</p>
                </div>
                <span className="text-xs text-gray-400">Click photo to expand full-screen</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  {
                    title: 'Global Campus Residential Towers',
                    category: 'Exterior Architecture',
                    url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=1200&auto=format&fit=crop',
                    desc: '15 On-campus residential blocks housing 2,400+ students with 24/7 security, wardens, ambulance, and solar hot water.'
                  },
                  {
                    title: 'Student Suite (Double & Triple Sharing)',
                    category: 'Bedrooms',
                    url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1200&auto=format&fit=crop',
                    desc: 'Spacious well-ventilated rooms with attached washrooms, individual study desks, wardrobes, and private balcony.'
                  },
                  {
                    title: 'Sodexo Central Dining Hall',
                    category: 'Dining & Food Services',
                    url: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?q=80&w=1200&auto=format&fit=crop',
                    desc: 'Nutritious 4-meal daily catering managed by Sodexo: breakfast, lunch, evening snacks, and dinner with 100% pure vegetarian cuisine.'
                  },
                  {
                    title: 'Indoor Recreation & Games Lounge',
                    category: 'Recreation',
                    url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop',
                    desc: 'Recreation center with international-size snooker tables, table tennis, foosball, carrom, and board games.'
                  },
                  {
                    title: 'Resident Fitness Center & Gym',
                    category: 'Fitness & Health',
                    url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop',
                    desc: 'Equipped with modern cardio and weight training machines, open daily for resident students.'
                  },
                  {
                    title: 'Quiet Study & Digital Reading Hub',
                    category: 'Study Spaces',
                    url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1200&auto=format&fit=crop',
                    desc: 'Silent air-conditioned study lounges equipped with high-speed fiber Wi-Fi and digital research access.'
                  }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedGalleryImage({ url: item.url, title: item.title, category: item.category, desc: item.desc })}
                    className="group rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-amber-400/50 transition-all cursor-pointer"
                  >
                    <div className="relative h-44 w-full overflow-hidden bg-zinc-900">
                      <img
                        src={item.url}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-mono text-amber-300 font-bold uppercase">
                        {item.category}
                      </span>
                      <div className="absolute bottom-2.5 right-2.5 p-1.5 rounded-full bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Helpline & Contacts */}
            <div className="p-6 rounded-2xl bg-zinc-900/90 border border-white/15 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-400/20 text-amber-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Hostel Helplines & Room Allocation Desk</h4>
                    <p className="text-xs text-gray-400">Hostel Management Division — JAIN (Deemed-to-be University)</p>
                  </div>
                </div>

                {onOpenHostel && (
                  <button
                    type="button"
                    onClick={onOpenHostel}
                    className="px-4 py-2 rounded-xl bg-amber-400 text-black text-xs font-bold hover:bg-amber-300 transition-colors cursor-pointer"
                  >
                    Submit Room Request Online
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-white/10 text-xs text-gray-300">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono text-gray-400 block font-bold">Admission Coordinator</span>
                  <a href="tel:+918792915677" className="font-bold text-white hover:text-amber-300 transition-colors">+91 87929 15677</a>
                  <p className="text-[11px] text-gray-400">Sachin Patil (Mojo Campus / JU)</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono text-gray-400 block font-bold">Campus Board Telephone</span>
                  <a href="tel:+918069279444" className="font-bold text-white hover:text-amber-300 transition-colors">+91 80 6927 9444</a>
                  <p className="text-[11px] text-gray-400">Mobile: +91 7337618222 / 9222</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono text-gray-400 block font-bold">Official Campus Address</span>
                  <p className="text-white font-medium">JAIN Global Campus, Jakkasandra Post, Kanakapura Taluk, Ramanagara - 562112</p>
                  <a href="mailto:sachin.patil@mojocampus.com" className="text-amber-300 hover:underline">sachin.patil@mojocampus.com</a>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      )}

      {/* PHOTO GALLERY SECTION */}
      {activeSection === 'gallery' && (
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="liquid-glass rounded-3xl p-8 md:p-10 border border-white/15"
          >
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold font-grotesk text-gray-400 uppercase tracking-widest block mb-1">High-Definition Visual Tour</span>
                <h2 className="text-3xl md:text-4xl font-playfair italic font-bold text-white">
                  JAIN SET Campus Photo Gallery
                </h2>
                <p className="text-gray-300 text-sm max-w-2xl mt-1">
                  Explore high-definition imagery of our 300+ acre Kanakapura Global Campus, research facilities, incubation hubs, and student life.
                </p>
              </div>

              {/* Gallery Filters */}
              <div className="flex flex-wrap items-center gap-2">
                {['All', 'Campus Architecture', 'Advanced Labs', 'Incubation & Startups', 'Sports Arena', 'Academic Facilities', 'Student Housing'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setGalleryFilter(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer font-grotesk ${
                      galleryFilter === cat
                        ? 'bg-amber-400 text-black font-extrabold shadow-md scale-105'
                        : 'bg-white/5 hover:bg-white/15 text-gray-300 border border-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Photo Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredPhotos.map((photo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  onClick={() => setSelectedGalleryImage(photo)}
                  className="group relative rounded-2xl overflow-hidden border border-white/15 bg-zinc-950 aspect-[4/3] cursor-pointer shadow-xl hover:border-amber-400/50 transition-all"
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                  
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-[9px] font-bold text-amber-300 uppercase tracking-widest">
                    {photo.category}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-sm font-bold text-white leading-tight mb-1 group-hover:text-amber-200 transition-colors">
                      {photo.title}
                    </h3>
                    <p className="text-[11px] text-gray-300 line-clamp-2 leading-relaxed">
                      {photo.desc}
                    </p>
                  </div>

                  <div className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5 text-white" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* PLACEMENTS SECTION WITH INTERACTIVE LOGOS & TYPOGRAPHY */}
      {activeSection === 'placements' && (
        <div className="space-y-8">
          {/* Top Stats Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="liquid-glass rounded-3xl p-8 md:p-10 border border-white/15 bg-gradient-to-r from-black/80 via-black/90 to-black"
          >
            <div className="flex flex-wrap items-start justify-between gap-6 mb-8">
              <div>
                <span className="text-xs font-bold font-grotesk text-gray-400 uppercase tracking-widest block mb-1">Career Outcomes</span>
                <h2 className="text-3xl md:text-5xl font-playfair italic font-bold text-white mb-2">
                  Placements & Global Recruiters
                </h2>
                <p className="text-gray-300 text-sm md:text-base max-w-2xl">
                  Strong industry linkages, dedicated training cells, and mock interview drives ensure 95%+ placement rate annually.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-2xl border border-white/20 text-xs text-white font-grotesk uppercase tracking-wider font-bold">
                <TrendingUp className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>350+ Recruiting Companies Annually</span>
              </div>
            </div>

            {/* Key Placement Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { val: '₹85.08 LPA', title: 'Highest Package Achieved', sub: 'International & AI Tech Roles', color: 'text-emerald-400' },
                { val: '95%+', title: 'Consecutive Placement Rate', sub: 'Across Core & Specialization Streams', color: 'text-gray-400' },
                { val: '₹12.5 LPA', title: 'Top Tier Average Package', sub: 'CSE, AI, Robotics & ECE Graduates', color: 'text-gray-400' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="p-6 rounded-2xl bg-white/5 border border-white/15 text-center relative overflow-hidden group"
                >
                  <div className="text-4xl md:text-5xl font-black font-grotesk text-white mb-1 tracking-tight group-hover:scale-105 transition-transform">
                    {stat.val}
                  </div>
                  <div className="text-xs text-gray-400 font-grotesk uppercase tracking-widest font-semibold">{stat.title}</div>
                  <span className={`text-[10px] ${stat.color} font-medium block mt-1`}>{stat.sub}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recruiting Companies Grid & Search Filter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="liquid-glass rounded-3xl p-8 md:p-10 border border-white/15"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
              <div>
                <h3 className="text-2xl md:text-3xl font-playfair italic font-bold text-white mb-1 flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-white" />
                  <span>Top Hiring Partners</span>
                </h3>
                <p className="text-xs text-gray-400">
                  Select any recruiter to view placement packages, hiring statistics, and roles.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search recruiter or role..."
                  value={recruiterSearch}
                  onChange={(e) => setRecruiterSearch(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              {['All', 'Tech & AI', 'Core & Automotive', 'Consulting & Finance', 'Global IT'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setRecruiterFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-extrabold uppercase font-grotesk tracking-wider transition-all cursor-pointer ${
                    recruiterFilter === cat
                      ? 'bg-white text-black shadow-md scale-105'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Interactive Logo Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredRecruiters.map((recruiter, idx) => (
                <motion.div
                  key={recruiter.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.4, delay: (idx % 8) * 0.05 }}
                  onClick={() => setSelectedRecruiter(recruiter)}
                  className={`group relative rounded-2xl p-6 bg-white/5 border border-white/10 ${recruiter.brandColor} transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl cursor-pointer flex flex-col items-center justify-center text-center min-h-[170px] overflow-hidden`}
                >
                  {/* Subtle top indicator */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4 text-gray-300" />
                  </div>

                  {/* Company Logo Icon / Mark */}
                  <div className="mb-3 flex items-center justify-center h-12">
                    {recruiter.logo}
                  </div>

                  {/* Company Name */}
                  <h4 className="text-base font-bold text-white mb-1 tracking-tight group-hover:text-white">
                    {recruiter.name}
                  </h4>

                  {/* Category Pill */}
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-gray-300 font-grotesk font-semibold uppercase tracking-wider mb-2">
                    {recruiter.category}
                  </span>

                  {/* Hover Popup Tooltip/Highlight Box */}
                  <div className="mt-2 text-[11px] font-bold text-gray-200 bg-white/10 px-2.5 py-1 rounded-lg border border-white/15 opacity-90 group-hover:opacity-100 group-hover:bg-white/20 transition-all">
                    {recruiter.package}
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredRecruiters.length === 0 && (
              <div className="py-12 text-center text-gray-400 text-sm">
                No recruiter matching "{recruiterSearch}". Try clearing search or selecting a different category.
              </div>
            )}
          </motion.div>
        </div>
      )}

      {activeSection === 'life' && (
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="liquid-glass rounded-3xl p-8 md:p-10 border border-white/15"
          >
            <span className="text-xs font-bold font-grotesk text-gray-400 uppercase tracking-widest block mb-2">Student Ecosystem</span>
            <h2 className="text-3xl md:text-4xl font-playfair italic font-bold text-white mb-3">Campus Life, Culture & Clubs</h2>
            <p className="text-gray-300 text-base max-w-3xl mb-8">
              A vibrant student community with active tech chapters, national hackathons, sports championships, and cultural festivals.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <h3 className="text-lg font-bold text-white mb-2">Technical Chapters & Student Societies</h3>
                <p className="text-xs md:text-sm text-gray-300 leading-relaxed mb-4">
                  IEEE Student Branch, ACM Student Chapter, Developer Student Club (DSC), SAE India Racing Team, and Robotics Club regularly host national hackathons and workshop bootcamps.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['IEEE', 'ACM', 'Google DSC', 'SAE Racing', 'Robotics Guild'].map((club, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg bg-white/10 text-xs font-grotesk font-bold text-white border border-white/15">
                      ✓ {club}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <h3 className="text-lg font-bold text-white mb-2">Cultural & Sports Festivals</h3>
                <p className="text-xs md:text-sm text-gray-300 leading-relaxed mb-4">
                  Annual flagship events including "FETE" bringing together inter-college talent in music, drama, robotics, esports, and athletics on the 300+ acre campus.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['FETE Cultural Fest', 'Olympic Sports Arena', 'Hack-a-Thon 24', 'TechSymposium'].map((fest, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg bg-white/10 text-xs font-grotesk font-bold text-white border border-white/15">
                      ✓ {fest}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Photo Lightbox Gallery Modal Popup */}
      {selectedGalleryImage && (
        <div className="fixed inset-0 z-[140] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 animate-fadeIn">
          <div className="bg-zinc-950 border border-white/20 rounded-3xl max-w-4xl w-full overflow-hidden relative shadow-2xl text-white flex flex-col max-h-[90vh]">
            <div className="relative h-[55vh] w-full bg-black flex items-center justify-center overflow-hidden">
              <img
                src={selectedGalleryImage.url}
                alt={selectedGalleryImage.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedGalleryImage(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/80 hover:bg-white hover:text-black border border-white/20 text-white flex items-center justify-center font-bold cursor-pointer transition-all shadow-xl"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-xs font-bold text-amber-300 uppercase tracking-wider">
                {selectedGalleryImage.category}
              </div>
            </div>

            <div className="p-6 md:p-8 flex-1 overflow-y-auto">
              <h3 className="text-2xl md:text-3xl font-playfair italic font-bold text-white mb-2">
                {selectedGalleryImage.title}
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
                {selectedGalleryImage.desc}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs text-gray-400 font-grotesk">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>JAIN SET Kanakapura Global Campus, Bengaluru</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedGalleryImage(null)}
                  className="px-6 py-2.5 rounded-xl bg-white text-black font-extrabold text-xs uppercase tracking-wider hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  Close Viewer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Selected Recruiter Modal Popup */}
      {selectedRecruiter && (
        <div className="fixed inset-0 z-[130] bg-black/80 backdrop-blur-md flex items-center justify-center p-6 animate-fadeIn">
          <div className="bg-gray-950 border border-white/20 rounded-3xl p-8 max-w-md w-full relative shadow-2xl text-white">
            <button
              type="button"
              onClick={() => setSelectedRecruiter(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 flex items-center justify-center text-sm font-bold cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-center gap-4 mb-5">
              <div className="p-3 rounded-2xl bg-white/10 border border-white/20">
                {selectedRecruiter.logo}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{selectedRecruiter.name}</h3>
                <span className="text-xs font-grotesk text-gray-400 uppercase tracking-widest font-semibold">
                  {selectedRecruiter.category}
                </span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] font-grotesk text-gray-400 uppercase tracking-wider block mb-1 font-semibold">Compensation Tier</span>
                <span className="text-lg font-black text-white font-grotesk">{selectedRecruiter.package}</span>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] font-grotesk text-gray-400 uppercase tracking-wider block mb-1 font-semibold">Primary Engineering Roles</span>
                <p className="text-xs text-gray-200 font-medium leading-relaxed">{selectedRecruiter.roles}</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] font-grotesk text-gray-400 uppercase tracking-wider block mb-1 font-semibold">Partnership Highlight</span>
                <p className="text-xs text-gray-300 leading-relaxed">{selectedRecruiter.highlight}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedRecruiter(null)}
              className="w-full bg-white text-black font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider font-grotesk hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
      </div>
      </div>
    </div>
  );
};
