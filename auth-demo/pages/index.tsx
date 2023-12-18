import React, { useState } from 'react';
import WorkingArea from './WorkingArea'; // Make sure to adjust the import path as per your project structure
import LoginPopup from './LoginPopup'; // Import the LoginPopup component

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [showLoginPopup, setShowLoginPopup] = useState<boolean>(false);

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };

  const handleFetchData = async () => {
    // Dummy fetch function
    console.log('Fetching data...');
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header with Login Link */}
      <div className="flex justify-between border-b p-4">
        <h1>This is the header</h1>
        <a href="#" onClick={() => setShowLoginPopup(true)} className="self-center">Login</a>
      </div>

      {/* Body */}
      <div className="flex flex-1">
        {/* Navigation Panel */}
        <div className="w-1/4 border-r p-4">
          {[1, 2, 3].map((tabNumber) => (
            <button
              key={tabNumber}
              className={`block w-full text-left p-2 mb-2 ${activeTab === tabNumber ? 'bg-gray-100' : 'bg-white'}`}
              onClick={() => handleTabClick(tabNumber)}
            >
              Select {tabNumber}
            </button>
          ))}
        </div>
        
        {/* Working Area */}
        <WorkingArea activeTab={activeTab} handleFetchData={handleFetchData} />
      </div>

      {/* Login Popup */}
      <LoginPopup isVisible={showLoginPopup} onClose={() => setShowLoginPopup(false)} />
    </div>
  );
};

export default HomePage;
