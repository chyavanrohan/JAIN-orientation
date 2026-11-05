import React from 'react';

interface JainLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const JainLogo: React.FC<JainLogoProps> = ({ className = '', size = 'md' }) => {
  const isLg = size === 'lg' || size === 'xl';
  const isSm = size === 'sm';

  let emblemSize = 'w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11';
  let titleSize = 'text-xl sm:text-2xl md:text-3xl';
  let barSize = 'h-[2px] sm:h-[2.5px] w-3.5 sm:w-4 md:w-5';
  let subSize = 'text-[7.5px] sm:text-[8.5px] md:text-[10px]';

  if (isLg) {
    emblemSize = size === 'xl' ? 'w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20' : 'w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16';
    titleSize = size === 'xl' ? 'text-3xl sm:text-4xl md:text-6xl lg:text-7xl' : 'text-2xl sm:text-3xl md:text-5xl';
    barSize = 'h-[2.5px] sm:h-[3px] md:h-[4px] w-5 sm:w-6 md:w-8';
    subSize = size === 'xl' ? 'text-[10px] sm:text-xs md:text-sm lg:text-base' : 'text-[9px] sm:text-xs md:text-sm';
  } else if (isSm) {
    emblemSize = 'w-7 h-7 sm:w-8 sm:h-8';
    titleSize = 'text-lg sm:text-xl';
    barSize = 'h-[2px] w-3';
    subSize = 'text-[7px] sm:text-[7.5px]';
  }

  return (
    <div className={`flex items-center gap-2.5 md:gap-4 select-none ${className}`}>
      {/* Circular JGi Emblem */}
      <div className={`relative ${emblemSize} rounded-full bg-white flex items-center justify-center shadow-md shrink-0 p-1`}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* JGi text in bold Navy Blue */}
          <text
            x="8"
            y="68"
            fill="#091E42"
            fontWeight="900"
            fontSize="54"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            letterSpacing="-3"
          >
            JG
          </text>
          <text
            x="70"
            y="68"
            fill="#091E42"
            fontWeight="900"
            fontSize="52"
            fontFamily="'Plus Jakarta Sans', sans-serif"
          >
            i
          </text>
          {/* Yellow dot on i */}
          <circle cx="77" cy="24" r="8.5" fill="#FFC20E" />
        </svg>
      </div>

      {/* JAIN + DEEMED-TO-BE UNIVERSITY Wordmark */}
      <div className="flex flex-col justify-center">
        <span className={`${titleSize} font-black tracking-tight text-white leading-none font-sans drop-shadow-sm`}>
          JAIN
        </span>
        <div className="flex items-center gap-1 mt-1 md:mt-1.5">
          {/* White bar under J */}
          <div className={`${barSize} bg-white rounded-xs shrink-0`} />
          <span className={`${subSize} font-black tracking-widest text-white uppercase leading-none font-sans`}>
            DEEMED-TO-BE UNIVERSITY
          </span>
        </div>
      </div>
    </div>
  );
};

