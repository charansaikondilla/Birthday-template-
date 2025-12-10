import { useRef, useEffect, useState, FC } from 'react';

const NUMBERS = Array.from({ length: 22 }, (_, i) => i + 1);
const TOTAL_NUMBERS = 22;

// Add image URLs here for each number
const IMAGE_PLACEHOLDERS: Record<number, string> = {
  1: 'https://picsum.photos/seed/1/400/400',
  2: 'https://picsum.photos/seed/2/400/400',
  3: 'https://picsum.photos/seed/3/400/400',
  4: 'https://picsum.photos/seed/4/400/400',
  5: 'https://picsum.photos/seed/5/400/400',
  6: 'https://picsum.photos/seed/6/400/400',
  7: 'https://picsum.photos/seed/7/400/400',
  8: 'https://picsum.photos/seed/8/400/400',
  9: 'https://picsum.photos/seed/9/400/400',
  10: 'https://picsum.photos/seed/10/400/400',
  11: 'https://picsum.photos/seed/11/400/400',
  12: 'https://picsum.photos/seed/12/400/400',
  13: 'https://picsum.photos/seed/13/400/400',
  14: 'https://picsum.photos/seed/14/400/400',
  15: 'https://picsum.photos/seed/15/400/400',
  16: 'https://picsum.photos/seed/16/400/400',
  17: 'https://picsum.photos/seed/17/400/400',
  18: 'https://picsum.photos/seed/18/400/400',
  19: 'https://picsum.photos/seed/19/400/400',
  20: 'https://picsum.photos/seed/20/400/400',
  21: 'https://picsum.photos/seed/21/400/400',
  22: 'https://picsum.photos/seed/22/400/400',
};

// Add text notes for each number - Birthday Journey from Year 1 to Year 22
const NUMBER_NOTES: Record<number, { title: string; description: string; quote: string }> = {
  1: {
    title: 'Year One - The First Birthday',
    description: 'Your very first birthday! The beginning of an incredible journey filled with wonder and discovery. From those first steps to the first words, this year marked the foundation of a lifetime of amazing memories. Every giggle, every milestone, celebrated with love.',
    quote: '"The day you were born, the world became a brighter place."'
  },
  2: {
    title: 'Year Two - Terrible Twos & Terrific Times',
    description: 'Two years of joy! Learning to run, exploring everything with curious hands, and speaking in full sentences. This year brought personality, independence, and endless energy. From building blocks to making friends, every day was an adventure in growing up.',
    quote: '"Two years of love, laughter, and little footsteps."'
  },
  3: {
    title: 'Year Three - Preschool Adventures',
    description: 'Three years of wonderful memories! Starting preschool, making new friends, and discovering imagination through play. This year brought creativity, storytelling, and the magic of learning. From art projects to playground fun, childhood blossomed beautifully.',
    quote: '"Three years of magic, three years of growth."'
  },
  4: {
    title: 'Year Four - Growing Strong',
    description: 'Four incredible years! Mastering new skills, asking endless questions, and developing a unique personality. This year celebrated curiosity, confidence, and creativity. From riding bikes to reading books, independence grew stronger each day.',
    quote: '"Four years of sunshine, smiles, and dreams."'
  },
  5: {
    title: 'Year Five - Starting School',
    description: 'Five amazing years! Beginning elementary school, learning to read and write, making lifelong friends. This milestone year marked the transition from toddler to big kid. From lunch boxes to homework, a new chapter of learning began.',
    quote: '"Five years of love, learning, and laughter."'
  },
  6: {
    title: 'Year Six - Elementary Excellence',
    description: 'Six years of growth! Developing reading skills, discovering favorite subjects, and building friendships. This year brought academic achievements, extracurricular activities, and growing independence. From science projects to sports teams, talents emerged.',
    quote: '"Six years of discovery and determination."'
  },
  7: {
    title: 'Year Seven - Lucky Number',
    description: 'Seven wonderful years! Reading chapter books, solving math problems, and exploring hobbies. This lucky year celebrated intellectual growth, social development, and personal interests. From art classes to music lessons, passions began to shine.',
    quote: '"Seven years of fortune, fun, and friendship."'
  },
  8: {
    title: 'Year Eight - Infinite Possibilities',
    description: 'Eight years of achievements! Mastering multiplication, writing stories, and developing critical thinking. This year marked increased responsibility, deeper friendships, and emerging talents. From school projects to family adventures, confidence soared.',
    quote: '"Eight years of endless potential and promise."'
  },
  9: {
    title: 'Year Nine - Almost Double Digits',
    description: 'Nine amazing years! Preparing for the teen years ahead, developing stronger opinions, and building character. This year celebrated maturity, independence, and self-discovery. From complex projects to meaningful conversations, wisdom grew.',
    quote: '"Nine years of growth, nine years of grace."'
  },
  10: {
    title: 'Year Ten - A Full Decade!',
    description: 'Ten incredible years! Reaching double digits, celebrating a full decade of memories. This milestone marked the transition from childhood to pre-teen years. From birthday parties to family traditions, ten years of love and laughter celebrated.',
    quote: '"A decade of joy, a lifetime of memories ahead."'
  },
  11: {
    title: 'Year Eleven - Pre-Teen Years',
    description: 'Eleven years of wonderful moments! Entering middle school, navigating new challenges, and discovering identity. This year brought physical changes, emotional growth, and social awareness. From new subjects to changing interests, transformation began.',
    quote: '"Eleven years strong, ready for anything."'
  },
  12: {
    title: 'Year Twelve - Tween Milestones',
    description: 'Twelve years of beautiful memories! Developing independence, forming deeper friendships, and exploring passions. This year celebrated academic achievements, personal growth, and emerging maturity. From school dances to team sports, confidence blossomed.',
    quote: '"Twelve years of becoming who you\'re meant to be."'
  },
  13: {
    title: 'Year Thirteen - Officially A Teenager!',
    description: 'Thirteen years and officially a teen! This monumental birthday marked the beginning of teenage years filled with new experiences, responsibilities, and freedoms. From studying harder to socializing more, this year opened doors to a new chapter of life.',
    quote: '"Thirteen years young, a lifetime of adventure ahead."'
  },
  14: {
    title: 'Year Fourteen - Teen Spirit Rising',
    description: 'Fourteen years of life lessons! Navigating high school challenges, developing personal values, and building lasting friendships. This year brought academic pressures, social dynamics, and self-discovery. From exams to extracurriculars, resilience grew stronger.',
    quote: '"Fourteen years of finding your voice and vision."'
  },
  15: {
    title: 'Year Fifteen - Quinceañera Dreams',
    description: 'Fifteen years of cherished moments! A milestone birthday celebrating the transition from childhood to young adulthood. This special year brought driver\'s permits, deeper relationships, and clearer goals. From formal celebrations to casual hangouts, maturity shined.',
    quote: '"Fifteen years of grace, fifteen years of growth."'
  },
  16: {
    title: 'Year Sixteen - Sweet Sixteen!',
    description: 'Sixteen incredible years! The golden birthday everyone dreams about. Getting a driver\'s license, gaining more independence, and making important life decisions. This year celebrated freedom, responsibility, and the excitement of near-adulthood. From road trips to college prep, the future beckoned.',
    quote: '"Sweet sixteen and never been more alive!"'
  },
  17: {
    title: 'Year Seventeen - Senior Year Approaching',
    description: 'Seventeen years of amazing memories! Preparing for graduation, applying to colleges, and planning for the future. This year brought bittersweet moments, lasting friendships, and important choices. From prom to final exams, childhood\'s end approached.',
    quote: '"Seventeen years of building the foundation for tomorrow."'
  },
  18: {
    title: 'Year Eighteen - Legal Adulthood!',
    description: 'Eighteen years and officially an adult! Graduating high school, voting in elections, and making independent decisions. This monumental birthday marked true independence, new responsibilities, and exciting opportunities. From college acceptance to career planning, adulthood began.',
    quote: '"Eighteen years of growth, a lifetime of possibilities."'
  },
  19: {
    title: 'Year Nineteen - College Life',
    description: 'Nineteen years of life experiences! Navigating college, living independently, and discovering career passions. This year brought academic challenges, personal growth, and lifelong friendships. From dorm rooms to internships, the real world beckoned.',
    quote: '"Nineteen years of learning who you truly are."'
  },
  20: {
    title: 'Year Twenty - Two Decades Strong!',
    description: 'Twenty incredible years! Completing two full decades of life, love, and learning. This milestone birthday celebrated achievements, growth, and the journey ahead. From childhood memories to adult aspirations, twenty years of beautiful moments honored.',
    quote: '"Twenty years of life, twenty years of love."'
  },
  21: {
    title: 'Year Twenty-One - Full Independence',
    description: 'Twenty-one years and fully independent! The final coming-of-age milestone bringing complete legal adulthood. This year celebrated freedom, responsibility, and the power to make all life decisions. From career launches to life adventures, everything became possible.',
    quote: '"Twenty-one years young, the world is yours."'
  },
  22: {
    title: 'Year Twenty-Two - Finding Your Path',
    description: 'Twenty-two years of incredible journey! Establishing career paths, building meaningful relationships, and defining personal values. This year marked the transition from student to professional, from dependent to independent. From first jobs to new homes, adult life flourished beautifully.',
    quote: '"Twenty-two years of becoming your best self."'
  },
};

interface NumberScrollerProps {
  activeNumber: number;
  onNumberChange: (num: number) => void;
  isMobileView?: boolean;
}

const NumberScroller: FC<NumberScrollerProps> = ({ activeNumber, onNumberChange, isMobileView = false }) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const pageRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [pathData, setPathData] = useState('');
  const [pathLength, setPathLength] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);
  const [carPosition, setCarPosition] = useState({ x: 0, y: 0, rotation: 0 });
  const [visiblePathLength, setVisiblePathLength] = useState(0);
  const [carFlipped, setCarFlipped] = useState(false);

  const getHorizontalOffset = (number: number) => {
    if (!contentRef.current) return 0;
    const containerWidth = window.innerWidth;
    const isOdd = number % 2 === 1;
    const targetPosition = isOdd ? 0 : -(containerWidth * 0.15);
    return targetPosition;
  };

  useEffect(() => {
    if (!rootRef.current) return;

    const pageHeight = window.innerHeight;
    const containerWidth = window.innerWidth;
    const paddingX = isMobileView ? 60 : 120;

    let d = '';
    const startX = paddingX;
    const startY = pageHeight / 2;
    d += 'M ' + startX + ' ' + startY;

    for (let i = 1; i < NUMBERS.length; i++) {
      const currentY = (i * pageHeight) + (pageHeight / 2);
      const prevY = ((i - 1) * pageHeight) + (pageHeight / 2);

      const controlPointY1 = prevY + pageHeight / 2.5;
      const controlPointY2 = currentY - pageHeight / 2.5;

      if ((i + 1) % 2 === 0) {
        const startXPos = paddingX;
        const endX = containerWidth - paddingX;
        d += ' C ' + (startXPos + containerWidth / 4) + ', ' + controlPointY1 + ', ' + (endX - containerWidth / 4) + ', ' + controlPointY2 + ', ' + endX + ' ' + currentY;
      } else {
        const startXPos = containerWidth - paddingX;
        const endX = paddingX;
        d += ' C ' + (startXPos - containerWidth / 4) + ', ' + controlPointY1 + ', ' + (endX + containerWidth / 4) + ', ' + controlPointY2 + ', ' + endX + ' ' + currentY;
      }
    }
    setPathData(d);
  }, [isMobileView]);

  useEffect(() => {
    if (pathRef.current && pathData) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);
    }
  }, [pathData]);

  // Update car position along the path - stop BEFORE images/numbers
  useEffect(() => {
    if (pathRef.current && pathLength > 0) {
      const progress = (activeNumber - 1) / (TOTAL_NUMBERS - 1);
      const distance = pathLength * progress;

      try {
        // Calculate stopping distance based on screen size
        // Car stops well before the image to avoid overlap
        const stopDistance = isMobileView ? 200 : 300;
        const carDistance = Math.max(0, distance - stopDistance);

        const point = pathRef.current.getPointAtLength(carDistance);
        const nextPoint = pathRef.current.getPointAtLength(Math.min(carDistance + 20, pathLength));

        // Calculate rotation angle based on path direction
        let angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);

        // Determine if car should be flipped (going left)
        const isGoingLeft = angle > 90 || angle < -90;

        // Adjust angle for left-side movement: fine-tune to match backside on line
        if (isGoingLeft) {
          angle = angle + 180;  // Rotate 180° to reverse direction, backside on line
        }

        setCarFlipped(isGoingLeft);

        setCarPosition({
          x: point.x,
          y: point.y,
          rotation: angle
        });

        // Set visible path length to car position (line ends at car)
        setVisiblePathLength(carDistance);
      } catch (error) {
        console.error('Path calculation error:', error);
      }
    }
  }, [activeNumber, pathLength, isMobileView]);

  const strokeDashoffset = pathLength - visiblePathLength;

  useEffect(() => {
    if (contentRef.current) {
      const offset = getHorizontalOffset(activeNumber);
      contentRef.current.style.transform = 'translateX(' + offset + 'px)';
    }
  }, [activeNumber]);

  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const num = parseInt(entry.target.getAttribute('data-number') || '0', 10);
          if (num) {
            onNumberChange(num);
          }
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      root: rootRef.current,
      threshold: 0.5,
    });

    const refs = pageRefs.current;
    refs.forEach((node) => {
      observerRef.current?.observe(node);
    });

    return () => {
      observerRef.current?.disconnect();
      refs.forEach(node => observerRef.current?.unobserve(node));
    };
  }, [onNumberChange]);

  return (
    <div
      ref={rootRef}
      className="relative h-screen w-screen overflow-y-auto snap-y snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overflow-x-hidden bg-black"
    >
      {/* Optimized Starry Night Sky - Reduced elements for performance */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Small stars - reduced from 150 to 80 */}
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={`star1-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: '1.5px',
              height: '1.5px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.6 + 0.3,
              animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}

        {/* Medium stars - reduced from 80 to 40 */}
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={`star2-${i}`}
            className="absolute rounded-full bg-blue-100"
            style={{
              width: '2px',
              height: '2px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.7 + 0.2,
              animation: `twinkle ${Math.random() * 4 + 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              boxShadow: '0 0 3px rgba(147, 197, 253, 0.5)',
            }}
          />
        ))}

        {/* Large bright stars - reduced from 40 to 20 */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`star3-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: '3px',
              height: '3px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.8 + 0.2,
              animation: `twinkle ${Math.random() * 5 + 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              boxShadow: '0 0 6px rgba(255, 255, 255, 0.6)',
            }}
          />
        ))}

        {/* Shooting stars - reduced from 5 to 3 */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={`shooting-${i}`}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{
              top: Math.random() * 40 + 10 + '%',
              left: Math.random() * 80 + '%',
              boxShadow: '0 0 4px 2px rgba(255,255,255,0.8)',
              animation: `shoot ${Math.random() * 3 + 3}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`,
              opacity: 0,
            }}
          />
        ))}

        {/* Subtle nebula glows - simplified */}
        <div
          className="absolute w-72 h-72 rounded-full opacity-10"
          style={{
            top: '15%',
            right: '20%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)',
            filter: 'blur(40px)',
            animation: 'pulse 10s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        @keyframes shoot {
          0% { 
            transform: translateX(0) translateY(0); 
            opacity: 1;
          }
          100% { 
            transform: translateX(-200px) translateY(200px); 
            opacity: 0;
          }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.08; }
          50% { opacity: 0.15; }
        }
      `}</style>

      <div
        ref={contentRef}
        className="relative w-full transition-transform duration-700 ease-out"
        style={{ willChange: 'transform' }}
      >
        {/* SVG Path Line - Behind everything */}
        <svg width="100%" height={(NUMBERS.length * 100) + '%'} className="absolute top-0 left-0 pointer-events-none z-0">
          <path
            ref={pathRef}
            d={pathData}
            stroke="url(#gradient)"
            strokeWidth={isMobileView ? "16" : "24"}
            strokeLinecap="round"
            fill="none"
            style={{
              strokeDasharray: pathLength,
              strokeDashoffset: strokeDashoffset,
              transition: 'stroke-dashoffset 0.3s linear',
            }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#22d3ee', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        </svg>

        {/* SVG Car Layer - In front of everything */}
        <svg width="100%" height={(NUMBERS.length * 100) + '%'} className="absolute top-0 left-0 pointer-events-none z-30">
          {/* Animated Car Icon - Premium Side View Design */}
          <g
            transform={'translate(' + carPosition.x + ',' + carPosition.y + ') rotate(' + carPosition.rotation + ')'}
            style={{
              transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {/* Car positioned in front of line - bidirectional design */}
            <g transform={'translate(-60, -35) scale(' + (isMobileView ? '1.8' : '2.5') + ')'}>
              {/* Enhanced shadow with blur */}
              <ellipse cx="30" cy="35" rx="28" ry="6" fill="rgba(0,0,0,0.4)" filter="url(#shadowBlur)" />

              {/* MAIN CAR BODY - Bidirectional Sports Car Side Profile */}

              {/* Lower body base */}
              <path
                d="M 10 26 L 8 28 L 8 30 L 52 30 L 52 28 L 50 26 Z"
                fill="url(#carBodyGradient)"
                stroke="#0f172a"
                strokeWidth="1.5"
              />

              {/* Main body curve - aerodynamic design */}
              <path
                d="M 10 26 L 15 18 L 20 15 L 25 14 L 35 14 L 42 16 L 48 20 L 50 26 Z"
                fill="url(#carTopGradient)"
                stroke="#0f172a"
                strokeWidth="2"
                filter="url(#carShadow)"
              />

              {/* Front Hood section (RIGHT SIDE) - Always front when going right */}
              <path
                d="M 42 16 L 48 20 L 50 26 L 52 26 L 54 22 L 53 18 L 50 16 Z"
                fill={carFlipped ? 'url(#hoodGradient)' : 'url(#hoodGradient)'}
                stroke="#1e293b"
                strokeWidth="1.5"
              />

              {/* Rear Hood section (LEFT SIDE) - Always front when going left */}
              <path
                d="M 10 26 L 8 26 L 6 22 L 7 18 L 10 16 L 15 18 Z"
                fill={carFlipped ? 'url(#hoodGradient)' : 'url(#hoodGradient)'}
                stroke="#1e293b"
                strokeWidth="1.5"
              />

              {/* Roof/Cabin - centered */}
              <path
                d="M 20 15 L 25 12 L 35 12 L 38 14 L 38 20 L 20 20 Z"
                fill="#1e3a8a"
                stroke="#1e40af"
                strokeWidth="1.5"
              />

              {/* Front windshield */}
              <path
                d="M 35 12 L 38 14 L 38 20 L 35 20 Z"
                fill="rgba(147, 197, 253, 0.5)"
                stroke="#3b82f6"
                strokeWidth="1"
              />

              {/* Rear windshield */}
              <path
                d="M 20 15 L 20 20 L 23 20 L 25 12 Z"
                fill="rgba(147, 197, 253, 0.5)"
                stroke="#3b82f6"
                strokeWidth="1"
              />

              {/* Side windows */}
              <path
                d="M 26 12 L 33 12 L 33 19 L 26 19 Z"
                fill="rgba(147, 197, 253, 0.4)"
                stroke="#60a5fa"
                strokeWidth="1"
              />

              {/* Side door lines */}
              <line x1="20" y1="20" x2="38" y2="20" stroke="#475569" strokeWidth="1" />
              <line x1="22" y1="23" x2="36" y2="23" stroke="#475569" strokeWidth="0.8" />

              {/* WHEELS - Centered */}

              {/* Front RIGHT wheel */}
              <g>
                <circle cx="43" cy="30" r="7" fill="#0f172a" stroke="#334155" strokeWidth="2.5" />
                <circle cx="43" cy="30" r="5.5" fill="#1e293b" />
                <circle cx="43" cy="30" r="4" fill="#374151" />
                <line x1="43" y1="26" x2="43" y2="34" stroke="#64748b" strokeWidth="1" />
                <line x1="39" y1="30" x2="47" y2="30" stroke="#64748b" strokeWidth="1" />
                <line x1="40" y1="27" x2="46" y2="33" stroke="#64748b" strokeWidth="0.8" />
                <line x1="40" y1="33" x2="46" y2="27" stroke="#64748b" strokeWidth="0.8" />
                <circle cx="43" cy="30" r="2" fill="#94a3b8" />
                <circle cx="43" cy="30" r="1" fill="#cbd5e1" />
              </g>

              {/* Rear LEFT wheel */}
              <g>
                <circle cx="17" cy="30" r="7" fill="#0f172a" stroke="#334155" strokeWidth="2.5" />
                <circle cx="17" cy="30" r="5.5" fill="#1e293b" />
                <circle cx="17" cy="30" r="4" fill="#374151" />
                <line x1="17" y1="26" x2="17" y2="34" stroke="#64748b" strokeWidth="1" />
                <line x1="13" y1="30" x2="21" y2="30" stroke="#64748b" strokeWidth="1" />
                <line x1="14" y1="27" x2="20" y2="33" stroke="#64748b" strokeWidth="0.8" />
                <line x1="14" y1="33" x2="20" y2="27" stroke="#64748b" strokeWidth="0.8" />
                <circle cx="17" cy="30" r="2" fill="#94a3b8" />
                <circle cx="17" cy="30" r="1" fill="#cbd5e1" />
              </g>

              {/* FRONT LIGHTS - RIGHT SIDE (when going right) */}
              {!carFlipped && (
                <>
                  <ellipse cx="52" cy="20" rx="3" ry="4" fill="#fbbf24" opacity="0.95" filter="url(#glow)">
                    <animate attributeName="opacity" values="0.95;1;0.95" dur="0.8s" repeatCount="indefinite" />
                  </ellipse>
                  <ellipse cx="52" cy="26" rx="2.5" ry="3" fill="#fef3c7" opacity="0.9">
                    <animate attributeName="opacity" values="0.9;1;0.9" dur="0.8s" repeatCount="indefinite" />
                  </ellipse>
                  <path d="M 54 20 L 65 18 L 65 22 Z" fill="rgba(251, 191, 36, 0.3)" opacity="0.7" />

                  {/* Rear lights - LEFT SIDE */}
                  <circle cx="9" cy="20" r="2.5" fill="#ef4444" opacity="0.85" />
                  <circle cx="9" cy="25" r="2" fill="#dc2626" opacity="0.8" />
                </>
              )}

              {/* FRONT LIGHTS - LEFT SIDE (when going left) */}
              {carFlipped && (
                <>
                  <ellipse cx="8" cy="20" rx="3" ry="4" fill="#fbbf24" opacity="0.95" filter="url(#glow)">
                    <animate attributeName="opacity" values="0.95;1;0.95" dur="0.8s" repeatCount="indefinite" />
                  </ellipse>
                  <ellipse cx="8" cy="26" rx="2.5" ry="3" fill="#fef3c7" opacity="0.9">
                    <animate attributeName="opacity" values="0.9;1;0.9" dur="0.8s" repeatCount="indefinite" />
                  </ellipse>
                  <path d="M 6 20 L -5 18 L -5 22 Z" fill="rgba(251, 191, 36, 0.3)" opacity="0.7" />

                  {/* Rear lights - RIGHT SIDE */}
                  <circle cx="51" cy="20" r="2.5" fill="#ef4444" opacity="0.85" />
                  <circle cx="51" cy="25" r="2" fill="#dc2626" opacity="0.8" />
                </>
              )}

              {/* Side mirrors */}
              <rect x="38" y="16" width="2" height="3" rx="1" fill="#475569" />
              <rect x="40" y="16.5" width="3" height="2" rx="0.5" fill="#64748b" />
              <rect x="17" y="16" width="2" height="3" rx="1" fill="#475569" />
              <rect x="14" y="16.5" width="3" height="2" rx="0.5" fill="#64748b" />

              {/* Spoilers on both ends */}
              <rect x="8" y="12" width="3" height="2" rx="0.5" fill="#1e293b" />
              <rect x="7" y="10" width="5" height="2" rx="1" fill="#2563eb" stroke="#1e40af" strokeWidth="0.5" />
              <rect x="49" y="12" width="3" height="2" rx="0.5" fill="#1e293b" />
              <rect x="48" y="10" width="5" height="2" rx="1" fill="#2563eb" stroke="#1e40af" strokeWidth="0.5" />

              {/* Bumpers on both ends */}
              <path d="M 50 26 L 52 26 L 54 27 L 54 29 L 52 30 L 50 30 Z" fill="#334155" stroke="#1e293b" strokeWidth="1" />
              <path d="M 10 26 L 8 26 L 6 27 L 6 29 L 8 30 L 10 30 Z" fill="#334155" stroke="#1e293b" strokeWidth="1" />

              {/* Air intake grilles */}
              <rect x="48" y="27" width="3" height="2" fill="#0f172a" stroke="#475569" strokeWidth="0.5" />
              <rect x="9" y="27" width="3" height="2" fill="#0f172a" stroke="#475569" strokeWidth="0.5" />

              {/* Exhaust pipes on both ends */}
              <ellipse cx="10" cy="29" rx="2" ry="1.5" fill="#374151" stroke="#1f2937" strokeWidth="1" />
              <ellipse cx="50" cy="29" rx="2" ry="1.5" fill="#374151" stroke="#1f2937" strokeWidth="1" />

              {/* Dynamic speed lines - positioned based on direction */}
              <g opacity="0.8">
                {!carFlipped ? (
                  <>
                    <line x1="-8" y1="14" x2="5" y2="14" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round">
                      <animate attributeName="x1" values="-8;-12;-8" dur="0.4s" repeatCount="indefinite" />
                    </line>
                    <line x1="-12" y1="20" x2="3" y2="20" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round">
                      <animate attributeName="x1" values="-12;-18;-12" dur="0.4s" repeatCount="indefinite" />
                    </line>
                    <line x1="-10" y1="26" x2="4" y2="26" stroke="#06b6d4" strokeWidth="3.5" strokeLinecap="round">
                      <animate attributeName="x1" values="-10;-15;-10" dur="0.4s" repeatCount="indefinite" />
                    </line>
                  </>
                ) : (
                  <>
                    <line x1="68" y1="14" x2="55" y2="14" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round">
                      <animate attributeName="x1" values="68;72;68" dur="0.4s" repeatCount="indefinite" />
                    </line>
                    <line x1="72" y1="20" x2="57" y2="20" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round">
                      <animate attributeName="x1" values="72;78;72" dur="0.4s" repeatCount="indefinite" />
                    </line>
                    <line x1="70" y1="26" x2="56" y2="26" stroke="#06b6d4" strokeWidth="3.5" strokeLinecap="round">
                      <animate attributeName="x1" values="70;75;70" dur="0.4s" repeatCount="indefinite" />
                    </line>
                  </>
                )}
              </g>
            </g>

            {/* Premium glowing aura - layered effect */}
            <circle cx="0" cy="0" r="80" fill="rgba(34, 211, 238, 0.12)">
              <animate attributeName="r" values="80;90;80" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.12;0.2;0.12" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="0" cy="0" r="60" fill="rgba(59, 130, 246, 0.15)">
              <animate attributeName="r" values="60;70;60" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.15;0.25;0.15" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="0" cy="0" r="40" fill="rgba(96, 165, 250, 0.2)">
              <animate attributeName="r" values="40;50;40" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>

          <defs>
            {/* Gradient definitions */}
            <linearGradient id="carBodyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#1e3a8a', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
            </linearGradient>

            <linearGradient id="carTopGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#1e40af', stopOpacity: 1 }} />
            </linearGradient>

            <linearGradient id="hoodGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#1d4ed8', stopOpacity: 1 }} />
            </linearGradient>

            {/* Filter effects */}
            <filter id="carShadow">
              <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.6" />
            </filter>

            <filter id="shadowBlur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
            </filter>

            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>

        {NUMBERS.map((number) => {
          const isActive = activeNumber === number;
          const isOdd = number % 2 === 1;
          const imageUrl = IMAGE_PLACEHOLDERS[number] || 'https://via.placeholder.com/150';
          const noteData = NUMBER_NOTES[number] || { title: 'Special Year', description: 'Amazing memories', quote: '"Unforgettable moments"' };

          return (
            <div
              key={number}
              ref={(node) => {
                if (node) pageRefs.current.set(number, node);
                else pageRefs.current.delete(number);
              }}
              data-number={number}
              className={'h-screen w-full snap-center flex items-center ' + (isMobileView ? 'px-8' : 'px-20') + ' relative z-10 ' + (isOdd ? 'justify-start' : 'justify-end')}
            >
              <div className={'flex items-center ' + (isMobileView ? 'gap-4 flex-col' : 'gap-8') + ' ' + (isOdd ? (isMobileView ? '' : 'flex-row') : (isMobileView ? '' : 'flex-row-reverse'))}>

                {/* Image placeholder */}
                <div
                  className={'rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 relative ' + (isActive ? 'scale-110' : 'scale-100')}
                  style={{
                    width: isMobileView ? '120px' : '180px',
                    height: isMobileView ? '120px' : '180px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  }}
                >
                  <img
                    src={imageUrl}
                    alt={'Image ' + number}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>

                {/* Number with bounce and glow */}
                <div className={'text-center relative ' + (isMobileView ? 'order-first' : '')}>
                  <h2
                    className={'font-bold transition-all duration-300 ' + (isMobileView ? 'text-7xl' : 'text-9xl')}
                    style={{
                      color: isActive ? '#22d3ee' : '#64748b',
                      textShadow: isActive
                        ? '0 0 20px rgba(34, 211, 238, 0.8), 0 0 40px rgba(34, 211, 238, 0.6), 0 0 60px rgba(34, 211, 238, 0.4)'
                        : 'none',
                      animation: isActive ? 'bounce 1s ease-in-out infinite' : 'none',
                      transform: isActive ? 'scale(1.1)' : 'scale(1)'
                    }}
                  >
                    {number}
                  </h2>

                  {/* Glowing ring effect */}
                  {isActive && (
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, transparent 70%)',
                        animation: 'pulse 2s ease-in-out infinite',
                        filter: 'blur(20px)',
                        zIndex: -1
                      }}
                    />
                  )}
                </div>

                {/* Enhanced Text Note Box - Large Aesthetic Design */}
                <div
                  className={'transition-all duration-500 rounded-2xl backdrop-blur-md border ' + (isMobileView ? 'w-full max-w-sm p-5' : 'w-96 p-6') + ' ' + (isActive ? 'scale-105 shadow-2xl' : 'scale-100 shadow-xl')}
                  style={{
                    background: isActive
                      ? 'linear-gradient(135deg, rgba(34, 211, 238, 0.2) 0%, rgba(59, 130, 246, 0.2) 50%, rgba(147, 51, 234, 0.2) 100%)'
                      : 'linear-gradient(135deg, rgba(30, 41, 59, 0.4) 0%, rgba(51, 65, 85, 0.3) 100%)',
                    borderColor: isActive ? '#22d3ee' : 'rgba(148, 163, 184, 0.3)',
                    boxShadow: isActive
                      ? '0 20px 60px rgba(34, 211, 238, 0.4), 0 0 40px rgba(59, 130, 246, 0.3)'
                      : '0 10px 40px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  {/* Decorative header with icon */}
                  <div className="flex items-center gap-4 mb-4 pb-4 border-b" style={{
                    borderColor: isActive ? 'rgba(34, 211, 238, 0.3)' : 'rgba(148, 163, 184, 0.2)'
                  }}>
                    <div
                      className={'rounded-xl flex items-center justify-center transition-all duration-300 ' + (isMobileView ? 'w-12 h-12' : 'w-14 h-14')}
                      style={{
                        background: isActive
                          ? 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 50%, #9333ea 100%)'
                          : 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
                        boxShadow: isActive ? '0 8px 24px rgba(34, 211, 238, 0.5)' : 'none'
                      }}
                    >
                      <svg
                        width={isMobileView ? "24" : "28"}
                        height={isMobileView ? "24" : "28"}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                        <line x1="7" y1="7" x2="7.01" y2="7" />
                      </svg>
                    </div>

                    <h3
                      className={'font-bold transition-colors duration-300 ' + (isMobileView ? 'text-xl' : 'text-2xl')}
                      style={{
                        color: isActive ? '#22d3ee' : '#e2e8f0',
                        textShadow: isActive ? '0 0 20px rgba(34, 211, 238, 0.5)' : 'none'
                      }}
                    >
                      {noteData.title}
                    </h3>
                  </div>

                  {/* Main description text */}
                  <div className="space-y-4">
                    <p
                      className={'leading-relaxed transition-colors duration-300 ' + (isMobileView ? 'text-sm' : 'text-base')}
                      style={{
                        color: isActive ? '#cbd5e1' : '#94a3b8',
                        lineHeight: '1.8'
                      }}
                    >
                      {noteData.description}
                    </p>

                    {/* Decorative quote section */}
                    <div
                      className={'relative rounded-lg p-4 mt-4 ' + (isMobileView ? 'text-xs' : 'text-sm')}
                      style={{
                        background: isActive
                          ? 'linear-gradient(135deg, rgba(34, 211, 238, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)'
                          : 'rgba(15, 23, 42, 0.4)',
                        borderLeft: '4px solid ' + (isActive ? '#22d3ee' : '#64748b')
                      }}
                    >
                      {/* Quote icon */}
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill={isActive ? '#22d3ee' : '#64748b'}
                        className="absolute -top-2 -left-2 opacity-50"
                      >
                        <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                      </svg>

                      <p
                        className="italic font-medium pl-4"
                        style={{
                          color: isActive ? '#a5f3fc' : '#cbd5e1'
                        }}
                      >
                        {noteData.quote}
                      </p>
                    </div>

                    {/* Decorative bottom accent */}
                    <div className="flex items-center gap-2 pt-3">
                      <div
                        className="h-1 flex-1 rounded-full transition-all duration-500"
                        style={{
                          background: isActive
                            ? 'linear-gradient(90deg, #22d3ee 0%, #3b82f6 50%, #9333ea 100%)'
                            : 'linear-gradient(90deg, #64748b 0%, #475569 100%)',
                          boxShadow: isActive ? '0 0 10px rgba(34, 211, 238, 0.5)' : 'none'
                        }}
                      />
                      <div
                        className={'rounded-full transition-all duration-500 ' + (isMobileView ? 'w-2 h-2' : 'w-3 h-3')}
                        style={{
                          background: isActive ? '#22d3ee' : '#64748b',
                          boxShadow: isActive ? '0 0 10px rgba(34, 211, 238, 0.8)' : 'none'
                        }}
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0) scale(1.1);
          }
          50% {
            transform: translateY(-20px) scale(1.15);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        
        @keyframes carPulse {
          0%, 100% {
            r: 50;
            opacity: 0.15;
          }
          50% {
            r: 70;
            opacity: 0.25;
          }
        }
      `}</style>
    </div>
  );
};

export default NumberScroller;
