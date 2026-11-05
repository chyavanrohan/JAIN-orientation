import React, { useState } from 'react';
import { StoryView } from './components/StoryView';
import { OrientationModal } from './components/OrientationModal';
import { AdminPortalModal } from './components/AdminPortalModal';
import { LateralInfoModal } from './components/LateralInfoModal';
import { HostelAccommodationModal } from './components/HostelAccommodationModal';
import { TimetablePortalModal } from './components/TimetablePortalModal';

export default function App() {
  const [isOrientationOpen, setIsOrientationOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLateralInfoOpen, setIsLateralInfoOpen] = useState(false);
  const [lateralModalTab, setLateralModalTab] = useState<'timetable' | 'faculty' | 'eligibility'>('timetable');
  const [isHostelOpen, setIsHostelOpen] = useState(false);
  
  // All Programs & Classes Timetable Portal state (ktiwari.in/webTT/#adjustments)
  const [isTimetableOpen, setIsTimetableOpen] = useState(false);
  const [timetableProgram, setTimetableProgram] = useState('AIML');
  const [timetableSemester, setTimetableSemester] = useState('3');
  const [timetableSection, setTimetableSection] = useState('A');
  const [timetableTab, setTimetableTab] = useState<'batches' | 'adjustments' | 'teachers' | 'rooms'>('batches');

  const openTimetablePortal = (
    program: string = 'AIML',
    semester: string = '3',
    section: string = 'A',
    tab: 'batches' | 'adjustments' | 'teachers' | 'rooms' = 'batches'
  ) => {
    setTimetableProgram(program);
    setTimetableSemester(semester);
    setTimetableSection(section);
    setTimetableTab(tab);
    setIsTimetableOpen(true);
  };

  return (
    <main className="relative w-full min-h-screen overflow-x-hidden text-white bg-black">
      {/* Exclusive Full Story & Campus Home Page */}
      <StoryView
        onBackToHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onOpenOrientation={() => setIsOrientationOpen(true)}
        onOpenHostel={() => setIsHostelOpen(true)}
        onOpenTimetable={() => openTimetablePortal('AIML', '3', 'A', 'batches')}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Orientation Program Modal */}
      <OrientationModal
        isOpen={isOrientationOpen}
        onClose={() => setIsOrientationOpen(false)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        initialCohort="Freshers"
      />

      {/* Admin Student Registration Backend Portal Modal */}
      <AdminPortalModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Lateral Entry Syllabus, Timetable & Credit Exemption Modal */}
      <LateralInfoModal
        isOpen={isLateralInfoOpen}
        onClose={() => setIsLateralInfoOpen(false)}
        initialTab={lateralModalTab}
        onOpenRegister={() => {
          setIsLateralInfoOpen(false);
          setIsOrientationOpen(true);
        }}
        onOpenAllTimetables={() => openTimetablePortal('AIML', '3', 'A', 'batches')}
      />

      {/* JAIN Global Campus Hostel Accommodation Modal */}
      <HostelAccommodationModal
        isOpen={isHostelOpen}
        onClose={() => setIsHostelOpen(false)}
        onOpenOrientation={() => {
          setIsHostelOpen(false);
          setIsOrientationOpen(true);
        }}
      />

      {/* JAIN SET All Programs & Classes Timetable Portal (#adjustments) */}
      <TimetablePortalModal
        isOpen={isTimetableOpen}
        onClose={() => setIsTimetableOpen(false)}
        initialProgram={timetableProgram}
        initialSemester={timetableSemester}
        initialSection={timetableSection}
        initialTab={timetableTab}
      />
    </main>
  );
}




