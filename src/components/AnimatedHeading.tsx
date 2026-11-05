import React, { useState, useEffect } from 'react';

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  text,
  className = '',
  style = {},
}) => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 200); // starts after 200ms initial delay

    return () => clearTimeout(timer);
  }, []);

  const lines = text.split('\n');
  const charDelay = 30; // 30ms

  return (
    <h1
      className={className}
      style={{
        letterSpacing: '-0.04em',
        ...style,
      }}
    >
      {lines.map((line, lineIndex) => {
        // Line length of the first line (or current line if lineIndex === 0)
        const lineLength = lines[0]?.length || 0;
        return (
          <span key={lineIndex} className="block">
            {line.split('').map((char, charIndex) => {
              const delay =
                lineIndex * lineLength * charDelay + charIndex * charDelay;
              const displayChar = char === ' ' ? '\u00A0' : char;

              return (
                <span
                  key={charIndex}
                  className="inline-block transition-all ease-out"
                  style={{
                    opacity: isAnimated ? 1 : 0,
                    transform: isAnimated
                      ? 'translateX(0px)'
                      : 'translateX(-18px)',
                    transitionProperty: 'opacity, transform',
                    transitionDuration: '500ms',
                    transitionDelay: `${delay}ms`,
                  }}
                >
                  {displayChar}
                </span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
};
