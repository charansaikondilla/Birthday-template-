import { useState, useEffect } from 'react';

interface BirthdayTimeBombProps {
  onComplete: () => void;
}

export default function BirthdayTimeBomb({ onComplete }: BirthdayTimeBombProps) {
  const [countdown, setCountdown] = useState(3);
  const [isExploding, setIsExploding] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsExploding(true);
      setTimeout(() => setShowMessage(true), 500);
    }
  }, [countdown]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 flex items-center justify-center overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-20 animate-float"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6">
        {!showMessage ? (
          <>
            {/* Time Bomb Animation */}
            <div className="mb-8 sm:mb-12 relative">
              <div
                className={`w-32 h-32 sm:w-48 sm:h-48 mx-auto relative transition-all duration-500 ${
                  isExploding ? 'scale-150 opacity-0' : 'scale-100'
                }`}
              >
                {/* Bomb Body */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full shadow-2xl animate-pulse-slow">
                  <div className="absolute inset-4 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full" />
                </div>

                {/* Fuse */}
                <div className="absolute -top-8 sm:-top-12 left-1/2 transform -translate-x-1/2 w-2 h-8 sm:h-12 bg-gradient-to-t from-orange-600 to-yellow-400 rounded-t-full animate-flicker">
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-400 rounded-full animate-ping" />
                </div>

                {/* Countdown Number */}
                {countdown > 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl sm:text-8xl font-bold text-white animate-bounce-slow drop-shadow-2xl">
                      {countdown}
                    </span>
                  </div>
                )}

                {/* Sparkles */}
                {countdown > 0 && (
                  <>
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-3 h-3 bg-yellow-400 rounded-full animate-sparkle"
                        style={{
                          top: `${50 + 40 * Math.cos((i * Math.PI * 2) / 8)}%`,
                          left: `${50 + 40 * Math.sin((i * Math.PI * 2) / 8)}%`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </>
                )}
              </div>

              {/* Explosion Effect */}
              {isExploding && (
                <div className="absolute inset-0 flex items-center justify-center">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-4 h-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full animate-explode"
                      style={{
                        animationDelay: `${i * 0.05}s`,
                        transform: `rotate(${i * 18}deg) translateY(-100px)`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Countdown Text */}
            {countdown > 0 && (
              <div className="space-y-2 sm:space-y-4">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white animate-pulse-slow drop-shadow-2xl">
                  Get Ready...
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-pink-200 animate-fade-in">
                  Something special is coming! 🎉
                </p>
              </div>
            )}
          </>
        ) : (
          /* Birthday Message */
          <div className="animate-scale-in space-y-6 sm:space-y-8">
            {/* Confetti Effect */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(100)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 sm:w-3 sm:h-3 animate-confetti"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: '-10%',
                    backgroundColor: ['#FFD700', '#FF69B4', '#00CED1', '#FF4500', '#9370DB'][
                      Math.floor(Math.random() * 5)
                    ],
                    animationDelay: `${Math.random() * 0.5}s`,
                    animationDuration: `${Math.random() * 2 + 2}s`,
                  }}
                />
              ))}
            </div>

            {/* Birthday Cake Emoji */}
            <div className="text-8xl sm:text-9xl animate-bounce-slow">
              🎂
            </div>

            {/* Main Message */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 animate-gradient drop-shadow-2xl">
                Happy Birthday
              </h1>
              <h2 className="text-6xl sm:text-8xl md:text-9xl font-bold text-white animate-pulse-slow drop-shadow-2xl">
                Amma! 💝
              </h2>
            </div>

            {/* Decorative Hearts */}
            <div className="flex justify-center gap-3 sm:gap-6 text-4xl sm:text-6xl animate-fade-in">
              <span className="animate-bounce" style={{ animationDelay: '0s' }}>❤️</span>
              <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>💖</span>
              <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>💕</span>
            </div>

            {/* Journey Button */}
            <button
              onClick={onComplete}
              className="mt-8 sm:mt-12 group relative inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white px-8 sm:px-12 py-4 sm:py-6 rounded-full text-xl sm:text-2xl font-bold shadow-2xl hover:shadow-pink-500/50 transform hover:scale-110 transition-all duration-300 animate-pulse-button"
            >
              <span className="relative z-10">Check Your Journey</span>
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 group-hover:translate-x-2 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              
              {/* Button Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 opacity-50 blur-xl group-hover:opacity-75 transition-opacity duration-300" />
            </button>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl text-pink-200 animate-fade-in mt-4 sm:mt-6">
              Scroll through 38 beautiful years of memories! 🎈
            </p>
          </div>
        )}
      </div>

      {/* Custom Animations CSS */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        
        @keyframes explode {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0) translateY(-200px); }
        }
        
        @keyframes scale-in {
          0% { opacity: 0; transform: scale(0.5); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes pulse-button {
          0%, 100% { box-shadow: 0 0 20px rgba(236, 72, 153, 0.5); }
          50% { box-shadow: 0 0 40px rgba(236, 72, 153, 0.8), 0 0 60px rgba(168, 85, 247, 0.6); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-float { animation: float ease-in-out infinite; }
        .animate-flicker { animation: flicker 0.5s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-sparkle { animation: sparkle 1s ease-in-out infinite; }
        .animate-explode { animation: explode 1s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.8s ease-out; }
        .animate-confetti { animation: confetti linear forwards; }
        .animate-gradient { 
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-pulse-button { animation: pulse-button 2s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 1s ease-in; }
      `}</style>
    </div>
  );
}
