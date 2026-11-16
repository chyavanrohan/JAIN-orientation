import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Users, 
  GraduationCap, 
  ExternalLink, 
  Award, 
  Sparkles, 
  BookOpen, 
  X, 
  Building2, 
  CheckCircle2, 
  ArrowUpRight,
  UserCheck,
  ChevronRight,
  Filter,
  Link2,
  Check
} from 'lucide-react';
import cseFacultyList from '../data/cseFacultyData.json';

export interface FacultyProfileLink {
  label: string;
  url: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  category: 'Leadership & HOD' | 'Professor' | 'Associate Professor' | 'Assistant Professor' | string;
  qualification: string;
  image: string;
  remoteImage?: string;
  bio: string;
  detailsLink: string;
  profileLinks?: FacultyProfileLink[];
  department: string;
  school: string;
  university: string;
}

const FacultyCardImage: React.FC<{ member: FacultyMember }> = ({ member }) => {
  const [currentSrc, setCurrentSrc] = useState(member.image);
  const [hasError, setHasError] = useState(false);

  // Initials for avatar fallback
  const initials = useMemo(() => {
    const parts = member.name
      .replace(/Dr\.|Prof\.|Mr\.|Ms\.|Mrs\./gi, '')
      .trim()
      .split(/\s+/);
    return parts.map(p => p[0]).filter(Boolean).slice(0, 2).join('').toUpperCase() || 'JU';
  }, [member.name]);

  const handleError = () => {
    // If local path failed, try remote university URL
    if (member.remoteImage && currentSrc !== member.remoteImage) {
      setCurrentSrc(member.remoteImage);
    } else {
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-950 text-gray-300 p-3 text-center">
        <UserCheck className="w-10 h-10 text-amber-400/70 mb-2" />
        <span className="text-sm font-mono font-black text-white tracking-widest">{initials}</span>
        <span className="text-[10px] text-gray-400 font-grotesk mt-1 truncate max-w-full px-2">{member.designation}</span>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={member.name}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={handleError}
      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
    />
  );
};

export const FacultySection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Cast faculty data
  const facultyData = cseFacultyList as FacultyMember[];

  // Helper to open/close professor modal while syncing URL (?faculty=<id>)
  const openFacultyProfile = useCallback((member: FacultyMember) => {
    setSelectedFaculty(member);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('faculty', member.id);
      window.history.replaceState(null, '', url.toString());
    } catch {
      // Ignore history errors in restricted sandboxes
    }
  }, []);

  const closeFacultyProfile = useCallback(() => {
    setSelectedFaculty(null);
    setCopiedId(null);
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('faculty');
      if (url.hash.startsWith('#faculty=')) {
        url.hash = '';
      }
      window.history.replaceState(null, '', url.toString());
    } catch {
      // Ignore history errors
    }
  }, []);

  const copyDirectLink = useCallback((member: FacultyMember) => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('faculty', member.id);
      navigator.clipboard?.writeText(url.toString());
      setCopiedId(member.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback
    }
  }, []);

  // Read URL ?faculty=<id> or #faculty=<id> on load and popstate
  useEffect(() => {
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      let target = params.get('faculty');
      if (!target && window.location.hash.startsWith('#faculty=')) {
        target = decodeURIComponent(window.location.hash.replace('#faculty=', ''));
      }
      if (!target) return;

      const normalized = target.toLowerCase().trim();
      const match = facultyData.find(
        (m) =>
          m.id.toLowerCase() === normalized ||
          m.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === normalized ||
          m.name.toLowerCase() === normalized
      );

      if (match) {
        setSelectedFaculty(match);
        setTimeout(() => {
          const cardEl = document.getElementById(`faculty-card-${match.id}`);
          cardEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 200);
      }
    };

    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);
    window.addEventListener('hashchange', syncFromUrl);
    return () => {
      window.removeEventListener('popstate', syncFromUrl);
      window.removeEventListener('hashchange', syncFromUrl);
    };
  }, [facultyData]);

  // Counts for categories
  const counts = useMemo(() => {
    return {
      all: facultyData.length,
      leadership: facultyData.filter(f => f.category === 'Leadership & HOD').length,
      professors: facultyData.filter(f => f.category === 'Professor').length,
      associate: facultyData.filter(f => f.category === 'Associate Professor').length,
      assistant: facultyData.filter(f => f.category === 'Assistant Professor').length,
    };
  }, [facultyData]);

  // Filtered faculty
  const filteredFaculty = useMemo(() => {
    return facultyData.filter((member) => {
      const matchesCategory = 
        selectedCategory === 'All' || 
        member.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        member.name.toLowerCase().includes(q) ||
        member.designation.toLowerCase().includes(q) ||
        member.bio.toLowerCase().includes(q) ||
        member.qualification.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [facultyData, selectedCategory, searchQuery]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Leadership & HOD':
        return 'bg-amber-400/20 text-amber-300 border-amber-400/40';
      case 'Professor':
        return 'bg-emerald-400/20 text-emerald-300 border-emerald-400/40';
      case 'Associate Professor':
        return 'bg-sky-400/20 text-sky-300 border-sky-400/40';
      case 'Assistant Professor':
        return 'bg-purple-400/20 text-purple-300 border-purple-400/40';
      default:
        return 'bg-white/10 text-gray-200 border-white/20';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className="liquid-glass rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border border-white/20 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/10 text-white border border-white/15 text-xs font-bold font-grotesk uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>Academic Faculty Directory</span>
          </div>

          <a
            href="https://set.jainuniversity.ac.in/academics/computer-science-engineering/faculty"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 hover:bg-amber-400/25 text-xs font-bold transition-all shadow-sm active:scale-95"
          >
            <span>Official Portal Link</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-playfair italic font-bold text-white mb-3">
          Department of Computer Science & Engineering
        </h2>
        
        <p className="text-gray-300 text-xs sm:text-sm md:text-base max-w-3xl leading-relaxed mb-6">
          Meet the distinguished educators, senior researchers, and innovators shaping tomorrow’s engineering pioneers at the School of Engineering and Technology (SET), JAIN (Deemed-to-be University).
        </p>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-white/15">
          <div className="p-3 rounded-xl bg-black/40 border border-white/10">
            <span className="text-[10px] sm:text-xs text-gray-400 font-grotesk uppercase tracking-wider block">Total Faculty</span>
            <span className="text-lg sm:text-2xl font-black text-white font-grotesk">{counts.all} Mentors</span>
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-white/10">
            <span className="text-[10px] sm:text-xs text-amber-400 font-grotesk uppercase tracking-wider block">Department Head</span>
            <span className="text-sm sm:text-base font-bold text-white font-grotesk truncate block">Dr. Kamlesh Tiwari</span>
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-white/10">
            <span className="text-[10px] sm:text-xs text-emerald-400 font-grotesk uppercase tracking-wider block">Professors</span>
            <span className="text-lg sm:text-2xl font-black text-white font-grotesk">{counts.professors + counts.leadership} Senior</span>
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-white/10">
            <span className="text-[10px] sm:text-xs text-sky-400 font-grotesk uppercase tracking-wider block">Specializations</span>
            <span className="text-xs sm:text-sm font-bold text-white font-grotesk">AI • ML • Cyber • Cloud</span>
          </div>
        </div>
      </motion.div>

      {/* Search and Category Filter Toolbar */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search faculty by name (e.g. Dr. Kamlesh Tiwari), designation, research area..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-950/90 border border-white/20 rounded-2xl pl-11 pr-10 py-3.5 text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors shadow-inner"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Pills - Horizontally Swipeable on Mobile */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
          {[
            { id: 'All', label: 'All Faculty', count: counts.all },
            { id: 'Leadership & HOD', label: 'Leadership & HOD', count: counts.leadership },
            { id: 'Professor', label: 'Professors', count: counts.professors },
            { id: 'Associate Professor', label: 'Associate Professors', count: counts.associate },
            { id: 'Assistant Professor', label: 'Assistant Professors', count: counts.assistant },
          ].map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 active:scale-95 ${
                  isActive
                    ? 'bg-amber-400 text-black shadow-lg font-extrabold scale-[1.02]'
                    : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono ${
                  isActive ? 'bg-black/20 text-black' : 'bg-white/10 text-gray-400'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-xs text-gray-400 px-1 font-grotesk">
        <span>Showing <strong className="text-white">{filteredFaculty.length}</strong> of {facultyData.length} faculty profiles</span>
        {selectedCategory !== 'All' && (
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="text-amber-400 hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Faculty Cards Grid: 1 column on phone, 2 on tablet, 3-4 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredFaculty.map((member, idx) => (
          <motion.div
            key={member.id + idx}
            id={`faculty-card-${member.id}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{ duration: 0.4, delay: (idx % 6) * 0.05 }}
            className="liquid-glass rounded-2xl p-4 sm:p-5 border border-white/15 hover:border-amber-400/50 transition-all flex flex-col justify-between group shadow-xl bg-gradient-to-b from-zinc-900/60 to-black/80"
          >
            <div>
              {/* Photo & Badge Container */}
              <div
                onClick={() => openFacultyProfile(member)}
                className="relative w-full aspect-square sm:aspect-4/3 rounded-xl overflow-hidden bg-zinc-950 border border-white/10 mb-4 group-hover:border-white/20 transition-all cursor-pointer"
              >
                <FacultyCardImage member={member} />

                {/* Category Pill Tag */}
                <div className="absolute top-2.5 left-2.5 z-10">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border backdrop-blur-md font-grotesk ${getCategoryColor(member.category)}`}>
                    {member.category === 'Leadership & HOD' && <Sparkles className="w-2.5 h-2.5 text-amber-400" />}
                    <span>{member.category}</span>
                  </span>
                </div>
              </div>

              {/* Faculty Info */}
              <div className="space-y-1 mb-3">
                <h3
                  onClick={() => openFacultyProfile(member)}
                  className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1 cursor-pointer"
                >
                  {member.name}
                </h3>

                <p className="text-xs text-amber-400 font-semibold line-clamp-1 font-grotesk">
                  {member.designation}
                </p>

                <p className="text-[11px] text-gray-400 flex items-center gap-1 font-mono">
                  <GraduationCap className="w-3.5 h-3.5 text-gray-500" />
                  <span>{member.department}</span>
                </p>
              </div>

              {/* Bio Preview Snippet */}
              {member.bio && (
                <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed mb-4">
                  {member.bio}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-white/10 flex items-center gap-2">
              <button
                type="button"
                onClick={() => openFacultyProfile(member)}
                className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white text-white hover:text-black text-xs font-bold transition-all text-center cursor-pointer shadow-sm active:scale-95 font-grotesk"
              >
                View Details
              </button>

              {member.profileLinks && member.profileLinks.length > 0 && (
                <a
                  href={member.profileLinks[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${member.name} — ${member.profileLinks[0].label} Research Profile`}
                  className="px-2.5 py-2 rounded-xl bg-sky-500/15 hover:bg-sky-500/30 text-sky-300 border border-sky-400/30 text-[11px] font-bold transition-colors cursor-pointer active:scale-95 shrink-0 font-grotesk"
                >
                  {member.profileLinks[0].label}
                </a>
              )}

              <a
                href={member.detailsLink}
                target="_blank"
                rel="noopener noreferrer"
                title={`Jump directly to ${member.name} on Official Jain University Website`}
                aria-label={`Open ${member.name} on Official Jain University Website`}
                className="p-2 rounded-xl bg-amber-400/15 hover:bg-amber-400/30 text-amber-300 border border-amber-400/40 transition-colors cursor-pointer active:scale-95 shrink-0"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredFaculty.length === 0 && (
        <div className="text-center py-16 px-4 bg-zinc-950/60 rounded-3xl border border-white/10 text-gray-400 space-y-3">
          <Users className="w-12 h-12 text-gray-600 mx-auto" />
          <h4 className="text-lg font-bold text-white">No Faculty Members Found</h4>
          <p className="text-xs text-gray-400 max-w-md mx-auto">
            We couldn't find any faculty members matching "{searchQuery}". Try searching for another name, topic or reset filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="px-5 py-2 rounded-xl bg-white text-black font-bold text-xs hover:bg-gray-200 transition-colors cursor-pointer"
          >
            Show All 99 Faculty
          </button>
        </div>
      )}

      {/* In-App Full Faculty Profile Detail Modal */}
      <AnimatePresence>
        {selectedFaculty && (
          <div 
            className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn"
            onClick={closeFacultyProfile}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-zinc-950 border border-white/20 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white shadow-2xl max-h-[92vh] overflow-y-auto flex flex-col"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={closeFacultyProfile}
                className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer z-10 active:scale-95"
                aria-label="Close Profile"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Faculty Header Card */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 pb-6 border-b border-white/15">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-zinc-900 border border-white/20 shrink-0 shadow-lg">
                  <FacultyCardImage member={selectedFaculty} />
                </div>

                <div className="text-center sm:text-left space-y-1.5 flex-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-bold border font-grotesk mb-1" style={{ borderColor: 'rgba(251, 191, 36, 0.4)' }}>
                    <span className="text-amber-400">{selectedFaculty.category}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white font-playfair italic">
                    {selectedFaculty.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-amber-300 font-semibold font-grotesk">
                    {selectedFaculty.designation}
                  </p>

                  <p className="text-xs text-gray-400 font-mono">
                    {selectedFaculty.department} • {selectedFaculty.school}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-white/10 text-white text-[11px] font-mono font-medium">
                      {selectedFaculty.university}
                    </span>
                    {selectedFaculty.profileLinks?.map((plink, i) => (
                      <a
                        key={i}
                        href={plink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-sky-500/20 hover:bg-sky-500/35 text-sky-300 border border-sky-400/30 text-[11px] font-bold font-grotesk transition-colors"
                      >
                        <span>{plink.label}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bio & Academic Profile Body */}
              <div className="py-6 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-grotesk flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  <span>Academic Journey & Biography</span>
                </h4>

                {selectedFaculty.bio ? (
                  <div className="text-xs sm:text-sm text-gray-200 leading-relaxed space-y-3 font-normal whitespace-pre-line bg-white/5 p-4 sm:p-5 rounded-2xl border border-white/10">
                    {selectedFaculty.bio}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 italic bg-white/5 p-4 rounded-xl border border-white/10">
                    Full research publications and detailed profile can be accessed via the official university portal link below.
                  </p>
                )}
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={selectedFaculty.detailsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-amber-400 text-black font-extrabold text-xs hover:bg-amber-300 transition-all shadow-md active:scale-95 cursor-pointer font-grotesk"
                  >
                    <span>Jump to {selectedFaculty.name.split(' ').slice(0, 2).join(' ')} on JAIN Site</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </a>

                  <button
                    type="button"
                    onClick={() => copyDirectLink(selectedFaculty)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-200 border border-white/15 text-xs font-bold transition-all cursor-pointer active:scale-95 font-grotesk"
                    title="Copy direct shareable link to this professor's profile"
                  >
                    {copiedId === selectedFaculty.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300">Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Link2 className="w-3.5 h-3.5" />
                        <span>Copy Direct Link</span>
                      </>
                    )}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={closeFacultyProfile}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-200 text-xs font-bold transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
