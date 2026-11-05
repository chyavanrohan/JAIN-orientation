import React, { useState, useEffect } from 'react';

interface FadeInProps {
  children: React.ReactNode;
  delay: number; // in milliseconds
  duration?: number; // in milliseconds, defaults to 1000
  className?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay,
  duration = 1000,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-opacity ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
};
