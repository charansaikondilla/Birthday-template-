import { useState, useEffect, useRef } from 'react';

interface BirthdayCakeProps {
  onGiftReveal?: () => void;
}

const BirthdayCake = ({ onGiftReveal }: BirthdayCakeProps) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);
  const [celebrationActive, setCelebrationActive] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition && candlesLit) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('')
          .toLowerCase();

        // Check for magic phrase: "love you nani"
        if (transcript.includes('love you nani') || 
            transcript.includes('love u nani') ||
            transcript.includes('i love you nani')) {
          setCandlesLit(false);
          setCelebrationActive(true);
          recognition.stop();
          
          // Show gift after 2 seconds
          setTimeout(() => {
            setShowGift(true);
            setCelebrationActive(false);
            if (onGiftReveal) onGiftReveal();
          }, 2000);
        }
      };

      recognition.onerror = (event: any) => {
        console.log('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          alert('Please allow microphone access to blow out the candles with your voice!');
        }
      };

      recognitionRef.current = recognition;
      recognition.start();

      return () => {
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
      };
    }
  }, [candlesLit, onGiftReveal]);

  const handleManualBlow = () => {
    setCandlesLit(false);
    setCelebrationActive(true);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    
    setTimeout(() => {
      setShowGift(true);
      setCelebrationActive(false);
      if (onGiftReveal) onGiftReveal();
    }, 2000);
  };

  const handleGiftClick = () => {
    setGiftOpened(true);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-pink-300 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Celebration Confetti when candles blow out */}
      {celebrationActive && (
        <div className="absolute inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 animate-confetti"
              style={{
                left: '50%',
                top: '30%',
                backgroundColor: ['#ff6b6b', '#4ecdc4', '#ffe66d', '#ff6b9d', '#c44569'][i % 5],
                animationDelay: `${Math.random() * 0.5}s`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            />
          ))}
        </div>
      )}

      <div className="relative h-full flex flex-col items-center justify-center px-4 z-10">
        {/* Title */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mb-4 animate-pulse-slow">
            Happy Birthday
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold text-purple-600 animate-bounce-slow">
            Amma! 🎉
          </h2>
        </div>

        {/* Birthday Cake */}
        <div className="relative mb-8 animate-scale-in">
          <div className="relative">
            {/* Cake Layers */}
            <div className="flex flex-col items-center">
              {/* Top Layer */}
              <div className="w-48 h-16 bg-gradient-to-r from-pink-400 to-pink-300 rounded-t-3xl border-4 border-pink-500 relative shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center space-x-2">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>

              {/* Middle Layer */}
              <div className="w-56 h-20 bg-gradient-to-r from-purple-400 to-purple-300 border-4 border-purple-500 relative shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-around px-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-yellow-300 rounded-full"></div>
                  ))}
                </div>
              </div>

              {/* Bottom Layer */}
              <div className="w-64 h-24 bg-gradient-to-r from-blue-400 to-blue-300 rounded-b-3xl border-4 border-blue-500 relative shadow-2xl">
                <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-2 px-4">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-pink-300 rounded-full"></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Candles */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 flex space-x-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="relative animate-sway" style={{ animationDelay: `${i * 0.2}s` }}>
                  {/* Candle */}
                  <div className="w-3 h-16 bg-gradient-to-b from-yellow-200 to-yellow-400 border-2 border-yellow-500 rounded-t-sm"></div>
                  
                  {/* Flame */}
                  {candlesLit && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                      <div className="relative">
                        <div className="w-4 h-6 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 rounded-full animate-flicker"></div>
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-3 bg-yellow-100 rounded-full animate-glow"></div>
                      </div>
                    </div>
                  )}
                  
                  {/* Smoke after blowing out */}
                  {!candlesLit && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="w-2 h-8 bg-gradient-to-t from-gray-400 to-transparent rounded-full animate-smoke"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Instructions */}
        {candlesLit && (
          <div className="text-center space-y-4 animate-fade-in">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-2xl max-w-md">
              <p className="text-xl font-semibold text-purple-600 mb-2">
                🎤 Say the magic words:
              </p>
              <p className="text-3xl font-bold text-pink-500 mb-4">
                "Love you Nani"
              </p>
              {isListening && (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <p className="text-sm text-gray-600">Listening...</p>
                </div>
              )}
              <button
                onClick={handleManualBlow}
                className="mt-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform shadow-lg"
              >
                Or Click to Blow Candles 🌬️
              </button>
            </div>
          </div>
        )}

        {/* Success Message */}
        {!candlesLit && !showGift && (
          <div className="text-center animate-bounce-in">
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl p-8 shadow-2xl">
              <p className="text-3xl font-bold mb-2">🎊 Yaay! 🎊</p>
              <p className="text-xl">Candles blown out!</p>
              <p className="text-lg mt-2">Preparing your gift...</p>
            </div>
          </div>
        )}

        {/* Gift Box */}
        {showGift && (
          <div className="mt-8 animate-scale-in">
            <div className="relative">
              {!giftOpened ? (
                <button
                  onClick={handleGiftClick}
                  className="relative group cursor-pointer transform hover:scale-105 transition-transform duration-300"
                >
                  {/* Gift Box */}
                  <div className="relative">
                    {/* Bow */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="w-20 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-8 bg-gradient-to-r from-red-600 to-pink-600 rounded-full"></div>
                    </div>
                    
                    {/* Box */}
                    <div className="w-48 h-48 bg-gradient-to-br from-red-400 to-pink-400 rounded-2xl border-4 border-red-500 shadow-2xl relative overflow-hidden">
                      {/* Ribbon Vertical */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-full bg-gradient-to-r from-yellow-400 to-yellow-300"></div>
                      
                      {/* Ribbon Horizontal */}
                      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-8 bg-gradient-to-b from-yellow-400 to-yellow-300"></div>
                      
                      {/* Sparkles */}
                      <div className="absolute inset-0 animate-sparkle">
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-2 h-2 bg-white rounded-full"
                            style={{
                              left: `${20 + (i % 3) * 30}%`,
                              top: `${20 + Math.floor(i / 3) * 30}%`,
                              animationDelay: `${i * 0.3}s`
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Click instruction */}
                  <div className="mt-4 text-center">
                    <p className="text-xl font-bold text-purple-600 animate-bounce">
                      Click to open your gift! 🎁
                    </p>
                  </div>
                </button>
              ) : (
                <div className="text-center animate-bounce-in">
                  <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-3xl p-10 shadow-2xl max-w-lg">
                    <div className="text-6xl mb-4">💝</div>
                    <h3 className="text-4xl font-bold mb-4">Your Special Gift!</h3>
                    <p className="text-2xl mb-4">A Journey Through 38 Beautiful Years</p>
                    <div className="space-y-2 text-lg">
                      <p>✨ Filled with memories</p>
                      <p>💕 Overflowing with love</p>
                      <p>🌟 Celebrating YOU!</p>
                    </div>
                    <div className="mt-6">
                      <div className="inline-block bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-xl animate-pulse-slow">
                        Made with Love ❤️
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-30px) translateX(5px);
          }
        }

        @keyframes flicker {
          0%, 100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1) translateY(-2px);
          }
        }

        @keyframes glow {
          0%, 100% {
            opacity: 0.5;
            filter: blur(2px);
          }
          50% {
            opacity: 1;
            filter: blur(4px);
          }
        }

        @keyframes sway {
          0%, 100% {
            transform: rotate(-2deg);
          }
          50% {
            transform: rotate(2deg);
          }
        }

        @keyframes smoke {
          0% {
            opacity: 0.7;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-30px) scale(1.5);
          }
        }

        @keyframes confetti {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) translateY(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) rotate(720deg) translateY(100vh);
            opacity: 0;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-float {
          animation: float infinite ease-in-out;
        }

        .animate-flicker {
          animation: flicker 0.3s infinite;
        }

        .animate-glow {
          animation: glow 0.5s infinite;
        }

        .animate-sway {
          animation: sway 2s infinite ease-in-out;
        }

        .animate-smoke {
          animation: smoke 2s forwards;
        }

        .animate-confetti {
          animation: confetti 3s forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.6s ease-out;
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s infinite ease-in-out;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s infinite ease-in-out;
        }

        .animate-sparkle {
          animation: sparkle 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default BirthdayCake;
