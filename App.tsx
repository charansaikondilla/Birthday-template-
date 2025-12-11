import { useState } from 'react';
import NumberScroller from './NumberScroller';
import BirthdayTimeBomb from './BirthdayTimeBomb';
import BirthdayCake from './BirthdayCake';

function App() {
  const [currentPage, setCurrentPage] = useState<'timebomb' | 'scroller' | 'cake'>('timebomb');
  const [activeNumber, setActiveNumber] = useState(1);
  const [isMobileView, setIsMobileView] = useState(false);

  const handleNumberChange = (num: number) => {
    setActiveNumber(num);
    
    // When user reaches number 38, show the cake page
    if (num === 38) {
      setTimeout(() => {
        setCurrentPage('cake');
      }, 1000);
    }
  };

  const toggleView = () => {
    setIsMobileView(!isMobileView);
  };

  const handleTimeBombComplete = () => {
    setCurrentPage('scroller');
  };

  // Show time bomb first
  if (currentPage === 'timebomb') {
    return <BirthdayTimeBomb onComplete={handleTimeBombComplete} />;
  }

  // Show birthday cake after scrolling completes
  if (currentPage === 'cake') {
    return <BirthdayCake />;
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-900">
      {/* Fixed Header - Shows Current Number */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-slate-800/80 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <h1 className="text-lg sm:text-2xl font-bold text-cyan-400">Birthday Countdown</h1>
            <span className="text-xs sm:text-sm text-slate-400 hidden sm:inline">Scroll to celebrate!</span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* View Toggle Button */}
            <button
              onClick={toggleView}
              className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center gap-2"
              title={isMobileView ? "Switch to Desktop View" : "Switch to Mobile View"}
            >
              {isMobileView ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" strokeWidth="2"/>
                    <line x1="8" y1="21" x2="16" y2="21" strokeWidth="2"/>
                    <line x1="12" y1="17" x2="12" y2="21" strokeWidth="2"/>
                  </svg>
                  <span className="hidden sm:inline">Desktop</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" strokeWidth="2"/>
                    <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span className="hidden sm:inline">Mobile</span>
                </>
              )}
            </button>
            <span className="text-xs sm:text-sm text-slate-400">Current:</span>
            <div className="bg-cyan-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-bold text-lg sm:text-xl min-w-[50px] sm:min-w-[60px] text-center">
              {activeNumber}
            </div>
            <span className="text-xs sm:text-sm text-slate-400">/ 38</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="fixed top-[60px] sm:top-[73px] left-0 right-0 z-50 h-1 bg-slate-700">
        <div 
          className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all duration-300"
          style={{ width: `${(activeNumber / 38) * 100}%` }}
        />
      </div>

      {/* Main Scroller Component with View Toggle */}
      <div className={`transition-all duration-300 ${isMobileView ? 'max-w-[375px] mx-auto border-x-4 border-slate-700' : 'w-full'}`}>
        <NumberScroller 
          activeNumber={activeNumber} 
          onNumberChange={handleNumberChange}
          isMobileView={isMobileView}
        />
      </div>

      {/* Fixed Footer - Instructions */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-800/80 backdrop-blur-sm border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-3 text-center">
          <p className="text-sm text-slate-400">
            🎉 Scroll down to count from 1 to 38 • Follow the glowing path! 🎉
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
