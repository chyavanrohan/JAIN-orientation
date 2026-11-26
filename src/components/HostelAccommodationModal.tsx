import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  Bed, 
  Utensils, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  ChevronRight,
  Maximize2,
  DollarSign,
  Droplet,
  Send
} from 'lucide-react';
import {
  HOSTEL_PHOTOS,
  HOSTEL_FACILITY_SYMBOLS,
  OFFICIAL_SET_HOSTEL_URL,
  type HostelPhotoItem,
} from '../data/hostelFacilitiesData';

interface HostelAccommodationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOrientation?: () => void;
}

export const HostelAccommodationModal: React.FC<HostelAccommodationModalProps> = ({
  isOpen,
  onClose,
  onOpenOrientation
}) => {
  const [activeTab, setActiveTab] = useState<'photos' | 'fees' | 'dining' | 'amenities' | 'contact'>('photos');
  const [selectedPhoto, setSelectedPhoto] = useState<HostelPhotoItem | null>(null);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: 'Boys',
    roomPreference: 'Double Sharing (Attached Washroom)',
  });

  if (!isOpen) return null;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-2.5 sm:p-5 md:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-zinc-950 border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-8 text-white shadow-2xl max-h-[94vh] sm:max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-400/15 border border-amber-400/30 text-amber-400">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                  JAIN SET Hostel Accommodation
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold uppercase">
                  On-Campus Living
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Official Information & Facilities — JAIN Global Campus, Kanakapura Road
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={OFFICIAL_SET_HOSTEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs text-gray-200 border border-white/15 transition-all"
            >
              <span>Official SET Hostel Page</span>
              <ExternalLink className="w-3 h-3 text-amber-400" />
            </a>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-colors cursor-pointer border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 py-3 overflow-x-auto border-b border-white/10 shrink-0 no-scrollbar">
          {[
            { id: 'photos', label: 'Hostel Gallery & Living', icon: Bed },
            { id: 'fees', label: 'Fee Structure 2026–27', icon: DollarSign },
            { id: 'dining', label: 'Food & Dining (Sodexo)', icon: Utensils },
            { id: 'amenities', label: 'Amenities & Safety', icon: ShieldCheck },
            { id: 'contact', label: 'Helpline & Enquiries', icon: Phone },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-amber-400 text-black shadow-md'
                    : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-6 pr-1">
          
          {/* TAB 1: PHOTOS & LIVING SPACES */}
          {activeTab === 'photos' && (
            <div className="space-y-5">
              {/* Official Why our Hostels Message from jainuniversity.ac.in */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-amber-400 font-bold text-xs uppercase tracking-wider font-mono">
                    Why our Hostels?
                  </span>
                  <span className="text-[11px] text-gray-400">Hostel Management Division</span>
                </div>
                <p className="text-xs text-gray-200 leading-relaxed">
                  JAIN (Deemed-to-be University) Hostels - a home away from home, offers both on campus (JAIN Global Campus) and off campus accommodations (in different locations in Bengaluru) for the admitted students. The residential arrangements are separate for boys and girls. University accommodations are managed by the Hostel Management Division. The facilities we provide are guided strictly by the sense of comfort and quality life for our students.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <div className="text-[11px] text-gray-400">Accommodations</div>
                    <div className="text-xs font-bold text-white">On Campus & Off Campus</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <Bed className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <div className="text-[11px] text-gray-400">Suites & Rooms</div>
                    <div className="text-xs font-bold text-white">En-Suite Bathrooms • Furnished</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-sky-400 shrink-0" />
                  <div>
                    <div className="text-[11px] text-gray-400">Safety & Security</div>
                    <div className="text-xs font-bold text-white">24x7 Trained Staff & Hotlines</div>
                  </div>
                </div>
              </div>

              {/* Photo Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {HOSTEL_PHOTOS.map((photo, idx) => (
                  <div
                    key={idx}
                    className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-amber-400/40 transition-all cursor-pointer flex flex-col justify-between"
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <div className="relative h-44 w-full overflow-hidden bg-zinc-900">
                      <img
                        src={photo.url}
                        alt={photo.title}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.dataset.fallbackTried !== '1' && photo.remoteImage) {
                            target.dataset.fallbackTried = '1';
                            target.src = photo.remoteImage;
                          }
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-mono text-amber-300 font-bold uppercase">
                        {photo.category}
                      </span>
                      <div className="absolute bottom-2.5 right-2.5 p-1.5 rounded-full bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors mb-1">
                          {photo.title}
                        </h4>
                        <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                          {photo.desc}
                        </p>
                      </div>
                      <div className="mt-3 text-[11px] font-semibold text-amber-400 flex items-center gap-1">
                        <span>Click to expand high-res photo</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: FEE STRUCTURE */}
          {activeTab === 'fees' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-200 text-xs flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Official Fee Schedule (Academic Year 2026–27):</span>
                  <span> Fees include 4-meal daily dining by Sodexo, electricity, 24/7 hot water, high-speed Wi-Fi, laundry facilities, housekeeping, and medical insurance.</span>
                </div>
              </div>

              {/* Fee Table */}
              <div className="overflow-x-auto border border-white/15 rounded-2xl bg-black/50">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-900 border-b border-white/15 text-gray-400 uppercase text-[10px] font-mono">
                    <tr>
                      <th className="py-3.5 px-4">Campus & Accommodation Type</th>
                      <th className="py-3.5 px-4">Gender</th>
                      <th className="py-3.5 px-4">Occupancy</th>
                      <th className="py-3.5 px-4">Washroom</th>
                      <th className="py-3.5 px-4 text-right">Annual Fee (2026–27)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-gray-200">
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-white">JAIN SET Global Campus (On-Campus)</td>
                      <td className="py-3.5 px-4 text-emerald-400 font-bold">Girls</td>
                      <td className="py-3.5 px-4">Triple Sharing</td>
                      <td className="py-3.5 px-4">Attached En-suite</td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-amber-300">₹1,90,000 /-</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-white">JAIN SET Global Campus (On-Campus)</td>
                      <td className="py-3.5 px-4 text-sky-400 font-bold">Boys</td>
                      <td className="py-3.5 px-4">Double Sharing</td>
                      <td className="py-3.5 px-4">Attached En-suite</td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-amber-300">₹2,25,000 /-</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-white">JAIN SET Global Campus (On-Campus)</td>
                      <td className="py-3.5 px-4 text-sky-400 font-bold">Boys</td>
                      <td className="py-3.5 px-4">Triple Sharing</td>
                      <td className="py-3.5 px-4">Attached En-suite</td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-amber-300">₹1,90,000 /-</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-white">JAIN Approved Off-Campus Residences</td>
                      <td className="py-3.5 px-4 text-sky-400 font-bold">Boys</td>
                      <td className="py-3.5 px-4">Double Sharing</td>
                      <td className="py-3.5 px-4">Attached En-suite</td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-amber-300">₹1,85,000 /-</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Policy & Deposits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Refundable Caution Deposit
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    A refundable caution deposit of <strong className="text-white font-mono">₹10,000/-</strong> is payable at the time of admission. This deposit is fully refunded at the conclusion of tenancy, subject to room handover inspection.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-sky-400" />
                    Flexible EMI Financing
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Students and parents can avail flexible zero-interest monthly EMI payment options through approved university education loan partners (LiquiLoans / Eduvanz).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FOOD & DINING */}
          {activeTab === 'dining' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="relative h-64 rounded-2xl overflow-hidden border border-white/15">
                  <img
                    src="/hostel/hostel-04.jpg"
                    alt="Hostel Food at JAIN University"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold uppercase font-mono">
                      Hostel Food & Dining
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">Delicious, Balanced & Healthy Platters</h3>
                  </div>
                </div>

                <div className="space-y-3.5 text-xs text-gray-300">
                  <h3 className="text-lg font-bold text-white">Daily Dining Service</h3>
                  <p className="leading-relaxed">
                    Our kitchen staff constantly rolls out delicious and healthy food for a variety of platters. The dining package includes breakfast, lunch, evening snacks, and dinner. Cleanliness and variety in dishes are among the other elements that JAIN (Deemed-to-be University) accommodations are known for.
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="font-bold text-amber-300">🌅 Breakfast</div>
                      <div className="text-[11px] text-gray-400 mt-0.5">South & North Indian dishes, milk, tea, coffee, and seasonal fruits.</div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="font-bold text-emerald-300">☀️ Wholesome Lunch</div>
                      <div className="text-[11px] text-gray-400 mt-0.5">Roti, rice varieties, two subzis, dal, sambar, rasam, curd, and fresh salad.</div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="font-bold text-sky-300">☕ Evening Snacks</div>
                      <div className="text-[11px] text-gray-400 mt-0.5">Hot snacks, savouries, tea, and filter coffee.</div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="font-bold text-purple-300">🌙 Nutritious Dinner</div>
                      <div className="text-[11px] text-gray-400 mt-0.5">Warm chapatis, curry, rice varieties, desserts & festival feasts.</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Reverse Osmosis (RO) purified drinking water stations and dispensers on every floor.</span>
                </div>
                <span className="text-emerald-400 font-bold shrink-0">100% Pure Veg Campus</span>
              </div>
            </div>
          )}

          {/* TAB 4: AMENITIES & SAFETY */}
          {activeTab === 'amenities' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {HOSTEL_FACILITY_SYMBOLS.map((sym) => (
                  <div
                    key={sym.id}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center gap-3"
                  >
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center p-2.5 shadow-md shrink-0">
                      <img
                        src={sym.iconPath}
                        alt={sym.title}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.dataset.fallbackTried !== '1' && sym.remoteIcon) {
                            target.dataset.fallbackTried = '1';
                            target.src = sym.remoteIcon;
                          }
                        }}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="text-[11px] font-medium text-amber-300/90 mb-0.5">{sym.category}</div>
                      <h4 className="text-sm font-bold text-white mb-1">{sym.title}</h4>
                      <p className="text-xs text-gray-300 leading-relaxed">{sym.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CONTACT & ENQUIRY */}
          {activeTab === 'contact' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Information */}
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3.5">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Phone className="w-4 h-4 text-amber-400" />
                    Hostel & Admissions Contacts
                  </h3>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span>General Helplines: <strong className="text-white">080 - 69279444</strong></span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-300">
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span>Hostel & Admissions: <strong className="text-white">+91 9606045274 / 8046501767</strong></span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-300">
                      <Mail className="w-3.5 h-3.5 text-amber-400" />
                      <span>Admissions Email: <strong className="text-white">admissions@jainuniversity.ac.in</strong></span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-300">
                      <Mail className="w-3.5 h-3.5 text-amber-400" />
                      <span>International Desk: <strong className="text-white">admissions.intl@jainuniversity.ac.in</strong></span>
                    </div>

                    <div className="flex items-start gap-2 text-gray-300 pt-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-white">Campus Location:</div>
                        <span>JAIN Global Campus, Jakkasandra Post, Kanakapura Road, Ramanagara District — 562112</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-gray-300 pt-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-white">University Headquarters:</div>
                        <span>#44/4, District Fund Road, Jayanagar 9th Block, Bengaluru, Karnataka — 560069</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-black/50 border border-white/10 text-xs text-gray-300 space-y-1.5">
                  <div className="font-semibold text-white">Hostel Management Division Desk:</div>
                  <p>Monday to Saturday: 09:30 AM – 05:30 PM</p>
                  <p className="text-[11px] text-gray-400">Trained security staff and emergency hotlines operate 24 hours a day, 7 days a week.</p>
                </div>
              </div>

              {/* Instant Room Reservation / Enquiry Form */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/15">
                {!bookingSubmitted ? (
                  <form onSubmit={handleBookingSubmit} className="space-y-3">
                    <h3 className="text-base font-bold text-white mb-2">Request Hostel Room Booking</h3>
                    
                    <div>
                      <label className="block text-[11px] text-gray-300 mb-1">Student Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Enter full name"
                        value={bookingData.name}
                        onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                        className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-gray-300 mb-1">Mobile Number</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={bookingData.phone}
                          onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                          className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-gray-300 mb-1">Gender Block</label>
                        <select
                          value={bookingData.gender}
                          onChange={(e) => setBookingData({ ...bookingData, gender: e.target.value })}
                          className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        >
                          <option value="Boys">Boys Hostel Block</option>
                          <option value="Girls">Girls Hostel Block</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-gray-300 mb-1">Room Sharing Preference</label>
                      <select
                        value={bookingData.roomPreference}
                        onChange={(e) => setBookingData({ ...bookingData, roomPreference: e.target.value })}
                        className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value="Double Sharing (Attached Washroom)">Double Sharing (Attached Washroom) — ₹2,25,000/yr</option>
                        <option value="Triple Sharing (Attached Washroom)">Triple Sharing (Attached Washroom) — ₹1,90,000/yr</option>
                        <option value="Off-Campus Double Sharing">Off-Campus Double Sharing — ₹1,85,000/yr</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-amber-400 text-black font-extrabold text-xs hover:bg-amber-300 transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-md mt-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Hostel Reservation Request</span>
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-8 space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                    <h3 className="text-lg font-bold text-white">Hostel Request Received!</h3>
                    <p className="text-xs text-gray-300 max-w-sm mx-auto">
                      Thank you, <span className="font-semibold text-white">{bookingData.name}</span>. The Hostel Management Division has recorded your room preference ({bookingData.roomPreference}). A coordinator will reach out at {bookingData.phone}.
                    </p>
                    <button
                      type="button"
                      onClick={() => setBookingSubmitted(false)}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-gray-400">
            JAIN (Deemed-to-be University) • Faculty of Engineering & Technology
          </div>

          <div className="flex items-center gap-2">
            {onOpenOrientation && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenOrientation();
                }}
                className="px-4 py-2 rounded-full bg-white text-black text-xs font-bold hover:bg-gray-100 transition-all cursor-pointer shadow-md"
              >
                Orientation Registration
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white text-xs font-medium transition-all cursor-pointer border border-white/15"
            >
              Close
            </button>
          </div>
        </div>

      </div>

      {/* Lightbox Modal for Full-Screen Photo */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-fadeIn">
          <div className="relative max-w-4xl w-full bg-zinc-950 border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 hover:bg-white hover:text-black text-white transition-colors cursor-pointer border border-white/20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative max-h-[70vh] w-full overflow-hidden bg-black flex items-center justify-center">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[70vh] object-contain"
              />
            </div>

            <div className="p-5 border-t border-white/10 bg-zinc-900/80">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-mono font-bold uppercase">
                {selectedPhoto.category}
              </span>
              <h3 className="text-lg font-bold text-white mt-1.5">{selectedPhoto.title}</h3>
              <p className="text-xs text-gray-300 mt-1 leading-relaxed">{selectedPhoto.desc}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
