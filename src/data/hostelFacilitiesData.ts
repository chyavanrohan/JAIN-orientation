export interface HostelPhotoItem {
  title: string;
  category: string;
  url: string;
  remoteImage: string;
  desc: string;
}

export type HostelSymbolCategory =
  | 'Living & Care'
  | 'Utilities & Safety'
  | 'Dining & Sodexo'
  | 'Recreation & Community';

export interface HostelFacilitySymbol {
  id: string;
  title: string;
  category: HostelSymbolCategory;
  iconPath: string;
  remoteIcon: string;
  desc: string;
}

export const OFFICIAL_SET_HOSTEL_URL =
  'https://set.jainuniversity.ac.in/hostel-facility-in-best-colleges-in-bangalore';

export const HOSTEL_PHOTOS: HostelPhotoItem[] = [
  {
    title: 'JAIN SET Global Campus Hostel Complex',
    category: 'Campus Living',
    url: '/hostel/hostel_main_05-06-2024.jpg',
    remoteImage:
      'https://set.jainuniversity.ac.in/assets/images/hostel_pics/hostel_main_05-06-2024.jpg',
    desc: 'Official on-campus residential buildings at JAIN (Deemed-to-be University) SET Global Campus housing 2,400+ students across dedicated boys and girls blocks.',
  },
  {
    title: 'Global Campus Residential Towers',
    category: 'Residential Blocks',
    url: '/hostel/JGI-hostel2.jpg',
    remoteImage:
      'https://www.jainuniversity.ac.in/jain/theme/assets/images/contact/JGI-hostel2.jpg',
    desc: 'JAIN (Deemed-to-be University) Hostels managed by the Hostel Management Division for comfort, safety, and academic focus.',
  },
  {
    title: 'Residential Suites & En-Suite Bedrooms',
    category: 'Bedrooms & Suites',
    url: '/hostel/hostel-01.jpg',
    remoteImage:
      'https://www.jainuniversity.ac.in/jain/theme/assets/images/contact/hostel-01.jpg',
    desc: 'Well-ventilated, spacious bedrooms with attached en-suite bathrooms, ample lighting, cots, storage cupboards, study tables, and chairs.',
  },
  {
    title: 'Hostel Campus Grounds & Environment',
    category: 'Hostel Campus',
    url: '/hostel/hostel-02.jpg',
    remoteImage:
      'https://www.jainuniversity.ac.in/jain/theme/assets/images/contact/hostel-02.jpg',
    desc: 'Green, well-maintained residential campus surroundings at Jakkasandra Post, Kanakapura Road.',
  },
  {
    title: 'Daily Housekeeping & Hygiene Services',
    category: 'Housekeeping & Care',
    url: '/hostel/housekeeping.jpg',
    remoteImage:
      'https://www.jainuniversity.ac.in/jain/theme/assets/images/contact/housekeeping.jpg',
    desc: 'Designated housekeeping team for every hall of residence providing daily room and washroom cleaning.',
  },
  {
    title: 'Hostel Dining & Sodexo Food Halls',
    category: 'Dining & Food',
    url: '/hostel/hostel-04.jpg',
    remoteImage:
      'https://www.jainuniversity.ac.in/jain/theme/assets/images/contact/hostel-04.jpg',
    desc: 'Sodexo-operated central dining serving breakfast, lunch, evening snacks, and dinner with diverse menus and festival meals.',
  },
  {
    title: '24/7 Trained Security & Surveillance',
    category: 'Security & Safety',
    url: '/hostel/hostel-05.jpg',
    remoteImage:
      'https://www.jainuniversity.ac.in/jain/theme/assets/images/contact/hostel-05.jpg',
    desc: '24x7 manned security surveillance, CCTV monitoring, fire-safety compliance, and emergency hotline support.',
  },
  {
    title: 'Furnished Student Accommodations',
    category: 'Student Suites',
    url: '/hostel/JGI-hostel.jpg',
    remoteImage:
      'https://www.jainuniversity.ac.in/jain/theme/assets/images/contact/JGI-hostel.jpg',
    desc: 'Single, double, and triple sharing accommodations equipped with personal study desks, wardrobes, and ergonomic seating.',
  },
];

export const HOSTEL_FACILITY_SYMBOLS: HostelFacilitySymbol[] = [
  {
    id: 'dedicated-wardens',
    title: 'Dedicated Wardens',
    category: 'Living & Care',
    iconPath: '/hostel/icons/Dedicated-Wardens.png',
    remoteIcon: 'https://set.jainuniversity.ac.in/assets/images/hostel/icons/Dedicated-Wardens.png',
    desc: 'Trained wardens with complete background verification for every 100 students.',
  },
  {
    id: 'room-options',
    title: 'Room Options',
    category: 'Living & Care',
    iconPath: '/hostel/icons/Rooms.png',
    remoteIcon: 'https://set.jainuniversity.ac.in/assets/images/hostel/icons/Rooms.png',
    desc: 'Spacious rooms with attached washrooms; single, double, and triple occupancy available.',
  },
  {
    id: 'modern-infrastructure',
    title: 'Modern Infrastructure',
    category: 'Living & Care',
    iconPath: '/hostel/icons/Modern-Infrastructure.png',
    remoteIcon: 'https://set.jainuniversity.ac.in/assets/images/hostel/icons/Modern-Infrastructure.png',
    desc: 'State-of-the-art infrastructure with dedicated storage and study tables.',
  },
  {
    id: 'housekeeping',
    title: 'Housekeeping',
    category: 'Living & Care',
    iconPath: '/hostel/icons/Housekeeping.png',
    remoteIcon: 'https://set.jainuniversity.ac.in/assets/images/hostel/icons/Housekeeping.png',
    desc: 'Daily room and washroom cleaning services by trained housekeepers.',
  },
  {
    id: 'basic-amenities',
    title: 'Basic Amenities',
    category: 'Living & Care',
    iconPath: '/hostel/icons/Basic-Amenities.png',
    remoteIcon: 'https://set.jainuniversity.ac.in/assets/images/hostel/icons/Basic-Amenities.png',
    desc: 'Welcome kit, mattress, bedsheet, pillow, and pillow cover.',
  },
  {
    id: 'convenience',
    title: 'Convenience (Mojo App)',
    category: 'Living & Care',
    iconPath: '/hostel/icons/Convenience.png',
    remoteIcon: 'https://set.jainuniversity.ac.in/assets/images/hostel/icons/Convenience.png',
    desc: 'Mojo App for gate passes and other residential services.',
  },
  {
    id: 'internet',
    title: 'Internet',
    category: 'Utilities & Safety',
    iconPath: '/hostel/icons/Internet.png',
    remoteIcon: 'https://set.jainuniversity.ac.in/assets/images/hostel/icons/Internet.png',
    desc: 'High-speed Wi-Fi available 24/7.',
  },
  {
    id: 'water-facilities',
    title: 'Water Facilities',
    category: 'Utilities & Safety',
    iconPath: '/hostel/icons/Water.png',
    remoteIcon: 'https://set.jainuniversity.ac.in/assets/images/hostel/icons/Water.png',
    desc: 'RO purified drinking water, hot and cold dispensers on each floor, and 24x7 hot water.',
  },
  {
    id: 'laundry',
    title: 'Laundry',
    category: 'Utilities & Safety',
    iconPath: '/hostel/icons/Laundry.png',
    remoteIcon: 'https://set.jainuniversity.ac.in/assets/images/hostel/icons/Laundry.png',
    desc: 'In-house laundry with modern washing machines and dryers.',
  },
  {
    id: 'parking',
    title: 'Parking',
    category: 'Utilities & Safety',
    iconPath: '/hostel/icons/Parking.png',
    remoteIcon: 'https://set.jainuniversity.ac.in/assets/images/hostel/icons/Parking.png',
    desc: 'Two and four-wheeler parking available.',
  },
  {
    id: 'security',
    title: 'Security',
    category: 'Utilities & Safety',
    iconPath: '/hostel/icons/Security.png',
    remoteIcon: 'https://set.jainuniversity.ac.in/assets/images/hostel/icons/Security.png',
    desc: '24x7 manned surveillance with CCTV and fire safety compliant hostels.',
  },
  {
    id: 'shuttle-service',
    title: 'Shuttle Service',
    category: 'Utilities & Safety',
    iconPath: '/hostel/icons/Shuttle-Service.png',
    remoteIcon: 'https://set.jainuniversity.ac.in/assets/images/hostel/icons/Shuttle-Service.png',
    desc: 'Exclusive shuttle service from the hostel to the university campus.',
  },
  {
    id: 'health-services',
    title: 'Health Services',
    category: 'Utilities & Safety',
    iconPath: '/hostel/icons/Health-Services.png',
    remoteIcon: 'https://set.jainuniversity.ac.in/assets/images/hostel/icons/Health-Services.png',
    desc: 'Medical insurance up to INR 3,00,000, dedicated ambulance and nurse, first-aid facility, and doctor on call 24/7.',
  },
  {
    id: 'dining-services',
    title: 'Dining Services',
    category: 'Dining & Sodexo',
    iconPath: '/hostel/icons/Dining-Services.png',
    remoteIcon: 'https://set.jainuniversity.ac.in/assets/images/hostel/icons/Dining-Services.png',
    desc: 'Meals provided by Sodexo, including breakfast, lunch, evening snacks, and dinner with special menus on festivals.',
  },
  {
    id: 'central-kitchen',
    title: 'Central Kitchen',
    category: 'Dining & Sodexo',
    iconPath: '/hostel/icons/Central-Kitchen.png',
    remoteIcon: 'https://set.jainuniversity.ac.in/assets/images/hostel/icons/Central-Kitchen.png',
    desc: 'Operated by Sodexo, ensuring high standards of taste, freshness, and presentation.',
  },
  {
    id: 'quality-assurance',
    title: 'Quality Assurance',
    category: 'Dining & Sodexo',
    iconPath: '/hostel/icons/Quality-Assurance.png',
    remoteIcon: 'https://set.jainuniversity.ac.in/assets/images/hostel/icons/Quality-Assurance.png',
    desc: 'Adherence to industry best practices and top food-grade certification.',
  },
  {
    id: 'diverse-menu',
    title: 'Diverse Menu',
    category: 'Dining & Sodexo',
    iconPath: '/hostel/icons/Diverse-Menu.png',
    remoteIcon: 'https://set.jainuniversity.ac.in/assets/images/hostel/icons/Diverse-Menu.png',
    desc: 'Meals designed to cater to students from all regions with special festival menus.',
  },
  {
    id: 'recreational-facilities',
    title: 'Recreational Facilities',
    category: 'Recreation & Community',
    iconPath: '/hostel/icons/board-games.png',
    remoteIcon: 'https://set.jainuniversity.ac.in/assets/images/hostel/icons/board-games.png',
    desc: 'Indoor games like snooker, table tennis, foosball, chess, carrom, and board games.',
  },
  {
    id: 'library-study-room',
    title: 'Library and Study Room',
    category: 'Recreation & Community',
    iconPath: '/hostel/icons/Library-and-Study-Room.png',
    remoteIcon: 'https://set.jainuniversity.ac.in/assets/images/hostel/icons/Library-and-Study-Room.png',
    desc: 'Exclusive access to dedicated library and quiet study spaces for hostel residents.',
  },
  {
    id: 'outdoor-activities',
    title: 'Outdoor Activities',
    category: 'Recreation & Community',
    iconPath: '/hostel/icons/Outdoor.png',
    remoteIcon: 'https://set.jainuniversity.ac.in/assets/images/hostel/icons/Outdoor.png',
    desc: 'Facilities for basketball, volleyball, and badminton.',
  },
  {
    id: 'gym',
    title: 'Gym',
    category: 'Recreation & Community',
    iconPath: '/hostel/icons/Gym.png',
    remoteIcon: 'https://set.jainuniversity.ac.in/assets/images/hostel/icons/Gym.png',
    desc: 'Gymnasium and workout space equipped for daily fitness.',
  },
  {
    id: 'student-engagement',
    title: 'Student Engagement',
    category: 'Recreation & Community',
    iconPath: '/hostel/icons/Student-Engagement.png',
    remoteIcon: 'https://set.jainuniversity.ac.in/assets/images/hostel/icons/Student-Engagement.png',
    desc: 'Cultural and sports activities, festival celebrations, and monthly birthday events.',
  },
  {
    id: 'events-emi',
    title: 'Events & Zero-Cost EMI',
    category: 'Recreation & Community',
    iconPath: '/hostel/icons/Events.png',
    remoteIcon: 'https://set.jainuniversity.ac.in/assets/images/hostel/icons/Events.png',
    desc: 'Periodic engagement events and no-cost EMI options through LiquiLoans.',
  },
];
